import { sprites, sounds } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { Entity } from '../engine/entity.js';
import { CollisionManager } from '../engine/collisionManager.js';
import manager from './manager.js';
import time from '../engine/time.js';
import { Shotgun } from './shotgun.js';
import { Railgun } from './railgun.js';



class Player extends Entity {
    velocity = Vector.zero;
    acceleration = Vector.zero;

    grounded = false;
    moving = false;
    jumping = false;

    maxAcceleration = 10;
    accelerationSpeed = 0.2;

    jumpDuration = 1000; // in ms
    jumpHeight = 200;
    jumpTimer = 0;
    startingHeight;

    previousStep = 0;
    previousDirection = 0;
    lastStepTime = 0;
    animationStep = 1;

    facingDirection = 1;

    constructor(position, size) {
        super(position, size, 1, 'mario_idle_r');
        this.alive = true;
        this.weapon;
        this.canMove = true;
    }

    move() {
        if (!this.canMove) return;
        if (this.jumping) {
            this.previousStep = this.jumpTimer;
            this.jumpTimer += time.deltaTime;
            this.acceleration.y = this.jumpFunction(this.jumpTimer) - this.jumpFunction(this.previousStep);
        }

        if (!this.grounded && !this.jumping) {
            if (this.acceleration.y < manager.airResistance()) this.acceleration.y += manager.worldGravity();
        } else if (!this.jumping) {
            this.acceleration.y = 0;
        }

        this.velocity.add(this.acceleration);
        this.setPreviousPosition(this.position)
        this.position.add(this.velocity);
        this.handleScreenLeave();
        this.setCurrentSprite(time.elapsedtime, this.velocity.length);
        this.velocity = Vector.zero;
        if (!this.moving) this.acceleration.x = 0;

        if (this.weapon) {
            this.weapon.update(this.position, this.facingDirection)
        }


        this.moving = false;
        this.grounded = false;
    }

    //slightly broken
    onCollision(other) {
        let previous = new Entity(this.previousPosition, this.size, 1);

        if (CollisionManager.above(this, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && this.acceleration.y > 0) {
            this.position.y = other.position.y - this.size.y;
            this.grounded = true;
            this.stopJump();
        }

        if (CollisionManager.below(this, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && this.acceleration.y < 0) {
            this.position.y = other.position.y + other.size.y;
            this.acceleration.y = 0;
            this.stopJump()
        }

        if (CollisionManager.left(this, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x > 0) {
            this.position.x = other.position.x - this.size.x;
            this.acceleration.x = 0;
        }

        if (CollisionManager.right(this, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x < 0) {
            this.position.x = other.position.x + other.size.x;
            this.acceleration.x = 0;
        }
    }

    onEnemyCollision(enemy) {
        if (!enemy.alive) return;

        if (this.position.y + this.size.y < enemy.position.y + enemy.size.y * .5) {
            enemy.die();
            this.stopJump();
            this.acceleration.y = -10;
        } else {
            this.die();
        }
    }

    handleScreenLeave() {
        if (this.position.x < -this.size.x) {
            this.position.x = manager.screenSize.x;
        }
        if (this.position.x > manager.screenSize.x) {
            this.position.x = -this.size.x;
        }
    }

    jumpFunction(x) {
        return ((4 * this.jumpHeight) / (this.jumpDuration * this.jumpDuration)) * ((x - (this.jumpDuration / 2)) * (x - (this.jumpDuration / 2))) - this.jumpHeight;
    }


    walk(direction) {
        this.facingDirection = direction;
        if (direction != this.previousDirection) {
            this.acceleration.x = this.previousDirection * this.accelerationSpeed;
            this.previousDirection = direction;
        }
        if (Math.abs(this.acceleration.x) < this.maxAcceleration) this.acceleration.add(Vector.right.scaled(direction * this.accelerationSpeed));

        this.moving = true;
    }

    jump() {
        if (!this.weapon) this.equipWeapon(new Shotgun(new Vector(this.position.x, this.position.y)));
        if (this.jumping || !this.grounded) return;
        this.startingHeight = this.position.y;
        this.jumping = true;
        this.grounded = false;
        let sfx = new Audio(sounds['mario_jump']);
        sfx.play();
    }

    stopJump() {
        this.jumping = false;
        this.jumpTimer = 0;
    }

    equipWeapon(weapon) {
        this.weapon = weapon;
        manager.entities[weapon.name] = weapon;
    }

    useWeapon() {
        if (!this.weapon) return;
        this.weapon.fire(this.facingDirection);
        if (this.weapon.ammoCount <= 0) {
            this.weapon.remove();
            this.weapon = null;
        }
    }

    setCurrentSprite(currentTimeStep, cycleSpeed) {
        let sufix = (this.facingDirection == 1) ? 'r' : 'l';
        let animation = "mario_";

        if (this.jumping) {
            animation += `jump_${sufix}`;
        } else if (this.moving) {
            if (currentTimeStep - this.lastStepTime > (1000 / cycleSpeed)) {
                this.animationStep++;
                this.lastStepTime = currentTimeStep;
            }
            if (this.animationStep > 3) this.animationStep = 1;
            animation += `run_${sufix}_${this.animationStep}`;
        } else {
            animation += `idle_${sufix}`;
        }
        this.sprite.src = sprites[animation];
    }

    die() {
        this.alive = false;
        this.sprite.src = sprites['mario_death'];
        setTimeout(() => {
            alert("GAME OVER");
            location.reload();
        }, 200);
    }
}


export { Player }