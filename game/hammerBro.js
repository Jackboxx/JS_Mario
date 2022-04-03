import { Entity } from '../engine/entity.js';
import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { CollisionManager } from '../engine/collisionManager.js';
import { Hammer } from './hammer.js';
import time from '../engine/time.js';
import manager from './manager.js';

export class HammerBro extends Entity {
    velocity = Vector.zero;
    acceleration = Vector.zero;
    speed = 1;

    throwCooldown = 1200;
    timeLastThrown = 0;

    lastTimeStep = 0;
    animationStep = 1;
    grounded = true;

    constructor(position, size) {
        super(position, size, 3);
        this.alive = true;
        this.cost = 2;
        this.name = 'hammer_bro_' + manager.currentEnemyID();
        this.acceleration.x = this.speed * (this.position.x - manager.screenSize.x / 2 > 0) ? -1 : 1;
    }

    move(player) {
        if (!this.onScreen) this.onScreen = (this.position.x > this.size.x && this.position.x < manager.screenSize.x - this.size.x);
        if (!this.grounded) {
            if (Math.abs(this.acceleration.y) < manager.airResistance()) this.acceleration.y += manager.worldGravity();
        }

        let distanceX = this.position.x - player.position.x;
        let direction = (distanceX >= 0) ? 1 : -1;

        if (distanceX < 100 && distanceX > -100) {
            if (this.onScreen) this.throwHammer(direction);
            this.acceleration.x = direction * this.speed;
        } else if (distanceX > 200 || distanceX < -200) {
            this.acceleration.x = direction * -this.speed;
        } else {
            if (this.onScreen) this.throwHammer(direction);
            this.acceleration.x = 0;
        }

        this.velocity.add(this.acceleration);
        this.setPreviousPosition(this.position);
        this.position.add(this.velocity);
        this.setCurrentSprite(time.elapsedtime, this.position.x - player.position.x);
        this.velocity = Vector.zero;
        this.grounded = false;
    }

    onCollision(other) {
        let previous = new Entity(this.previousPosition, this.size, 3);

        if (CollisionManager.above(this, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && this.acceleration.y > 0) {
            this.position.y = other.position.y - this.size.y;
            this.acceleration.y = 0;
            this.grounded = true;
        }

        if (CollisionManager.left(this, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x > 0) {
            this.position.x = other.position.x - this.size.x;
        }

        if (CollisionManager.right(this, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x < 0) {
            this.position.x = other.position.x + other.size.x;
        }
    }

    setCurrentSprite(currentTimeStep, direction) {
        let animation = 'hammer_bro_';
        let dir = (direction > 0) ? 'l' : 'r';

        if (this.previousPosition.x == this.position.x) {
            animation += `throwing_${dir}`;
            this.sprite.src = sprites[animation];
        } else if (currentTimeStep - this.lastTimeStep > 250) {
            this.animationStep++;
            this.lastTimeStep = currentTimeStep;
            if (this.animationStep > 2) this.animationStep = 1;
            animation += `walk_${this.animationStep}_${dir}`;
            this.sprite.src = sprites[animation];
        }
    }

    die() {
        this.alive = false;
        this.sprite.src = sprites['hammer_bro_dead'];
        manager.decreaseEnemyAmount();
        manager.increaseScore();
        setTimeout(() => {
            this.sprite.src = sprites['explosion_1'];
            setTimeout(() => {
                this.sprite.src = sprites['explosion_2'];
                setTimeout(() => {
                    delete manager.entities[this.name];
                }, 150);
            }, 50);
        }, 200);
    }

    throwHammer(direction) {
        if (time.elapsedtime - this.timeLastThrown < this.throwCooldown) return;

        let hammer = new Hammer(new Vector(this.position.x, this.position.y), new Vector(30, 30), direction);
        manager.entities[hammer.name] = hammer;
        manager.increaseProcetileID();
        this.timeLastThrown = time.elapsedtime;
    }
}