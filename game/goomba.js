import { Entity } from '../engine/entity.js';
import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { CollisionManager } from '../engine/collisionManager.js';
import time from '../engine/time.js';
import manager from './manager.js';

export class Goomba extends Entity {
    velocity = Vector.zero;
    acceleration = Vector.zero;
    lastStepTime = 0;
    animationStep = 1;
    grounded = true;
    alive = true;

    constructor(position, size) {
        super(position, size, 3);
        this.speed = 1.5;
    }

    move(goomba, player) {
        if (!this.grounded) {
            if (Math.abs(this.acceleration.y) < manager.airResistance()) this.acceleration.y += manager.worldGravity();
        } else {
            this.acceleration.y = 0;
        }

        this.acceleration.x = (goomba.position.x < player.position.x) ? goomba.speed : -goomba.speed;

        this.velocity.add(this.acceleration);
        goomba.setPreviousPosition(goomba.position);
        goomba.position.add(this.velocity);
        goomba.setCurrentSprite(time.elapsedtime);
        this.velocity = Vector.zero;
        this.grounded = false;
    }

    onCollision(goomba, other) {
        let previous = new Entity(goomba.previousPosition, goomba.size, 3);

        if (CollisionManager.above(goomba, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && this.acceleration.y > 0) {
            goomba.position.y = other.position.y - goomba.size.y;
            this.acceleration.y = 0;
            this.grounded = true;
        }

        if (CollisionManager.left(goomba, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x > 0) {
            goomba.position.x = other.position.x - goomba.size.x;
        }

        if (CollisionManager.right(goomba, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && this.acceleration.x < 0) {
            goomba.position.x = other.position.x + other.size.x;
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
    }

    isAlive() {
        return this.alive;
    }
}