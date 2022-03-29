import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { Entity } from '../engine/entity.js';
import { CollisionManager } from '../engine/collisionManager.js';
import manager from './manager.js';
import time from '../engine/time.js';



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

    constructor(position, size) {
        super(position, size, 1, 'mario_idle_r');
    }

    move() {
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

        this.setCurrentSprite(this.velocity.x, time.elapsedtime, this.velocity.length);
        this.velocity = Vector.zero;
        if (!this.moving) this.acceleration.x = 0;

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
        if (!enemy.isAlive()) return;

        let previous = new Entity(this.previousPosition, this.size, 1);

        if (CollisionManager.above(this, enemy) && (CollisionManager.left(previous, enemy) | CollisionManager.right(previous, enemy)) && this.acceleration.y > 0) {
            enemy.die();
            this.stopJump();
            this.acceleration.y = -10;
        } else {
            console.log("YOU DIED");
        }
    }

    jumpFunction(x) {
        return ((4 * this.jumpHeight) / (this.jumpDuration * this.jumpDuration)) * ((x - (this.jumpDuration / 2)) * (x - (this.jumpDuration / 2))) - this.jumpHeight;
    }


    walk(direction) {
        if (direction != this.previousDirection) {
            this.acceleration.x = this.previousDirection * this.accelerationSpeed;
            this.previousDirection = direction;
        }
        if (Math.abs(this.acceleration.x) < this.maxAcceleration) this.acceleration.add(Vector.right.scaled(direction * this.accelerationSpeed));

        this.moving = true;
    }

    jump() {
        if (this.jumping || !this.grounded) return;
        this.startingHeight = this.position.y;
        this.jumping = true;
        this.grounded = false;
    }

    stopJump() {
        this.jumping = false;
        this.jumpTimer = 0;
    }

    setCurrentSprite(direction, currentTimeStep, cycleSpeed) {
        let sufix = (direction >= 0) ? 'r' : 'l';
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
}


export { Player }