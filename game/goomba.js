import { Entity } from '../engine/entity.js';
import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { CollisionManager } from '../engine/collisionManager.js';
import time from '../engine/time.js';
import manager from './manager.js';

export class Goomba extends Entity {
    velocity = Vector.zero;
    acceleration = Vector.zero;
    speed = 1.5;

    lastStepTime = 0;
    animationStep = 1;
    grounded = true;

    constructor(position, size) {
        super(position, size, 3);
        this.alive = true;
        this.cost = 2;
        this.name = 'goomba_';
        this.acceleration.x = this.speed * (this.position.x - manager.screenSize.x / 2 > 0) ? -1 : 1;
    }

    move(player) {
        if (!this.grounded) {
            if (Math.abs(this.acceleration.y) < manager.airResistance()) this.acceleration.y += manager.worldGravity();
        } else {
            this.acceleration.y = 0;
        }

        if (!this.onScreen) this.onScreen = (this.position.x > this.size.x && this.position.x < manager.screenSize.x - this.size.x);

        if (player.position.y <= this.position.y) this.acceleration.x = (this.position.x < player.position.x) ? this.speed : -this.speed;
        if (this.onScreen && (this.position.x < 0 | this.position.x + this.size.x > manager.screenSize.x)) {
            this.acceleration.x *= -1;
        }

        this.velocity.add(this.acceleration);
        this.setPreviousPosition(this.position);
        this.position.add(this.velocity);
        this.setCurrentSprite(time.elapsedtime);
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

    setCurrentSprite(currentTimeStep) {
        let animation = 'goomba_walk_';

        if (currentTimeStep - this.lastStepTime > (1000 / 4)) {
            this.animationStep++;
            this.lastStepTime = currentTimeStep;
        }

        if (this.animationStep > 2) this.animationStep = 1;
        animation += this.animationStep;
        this.sprite.src = sprites[animation];
    }

    die() {
        this.alive = false;
        this.sprite.src = sprites['goomba_death'];
        manager.decreaseEnemyAmount();
        setTimeout(() => {
            delete manager.entities[this.name];
        }, 1000);
    }
}