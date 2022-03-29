import { Entity } from '../engine/entity.js';
import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { CollisionManager } from '../engine/collisionManager.js';
import time from '../engine/time.js';

let lastStepTime = 0;
let animationStep = 1;

const gravity = .8;
const maxVerticalAcceleration = 150;




export class Goomba extends Entity {
    acceleration = Vector.zero;
    velocity = Vector.zero;

    grounded = true;

    constructor(position, size) {
        super(position, size, 3);
        this.speed = 1.5;
    }

    move(goomba, player) {
        if (!grounded) {
            if (Math.abs(acceleration.y) < maxVerticalAcceleration) acceleration.y += gravity;
        } else {
            acceleration.y = 0;
        }

        acceleration.x = (goomba.position.x < player.position.x) ? goomba.speed : -goomba.speed;

        velocity.add(acceleration);
        goomba.setPreviousPosition(goomba.position);
        goomba.position.add(velocity);
        goomba.setCurrentSprite(time.elapsedtime);
        velocity = Vector.zero;
        grounded = false;
    }

    onCollision(goomba, other) {
        let previous = new Entity(goomba.previousPosition, goomba.size, 3);

        if (CollisionManager.above(goomba, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && acceleration.y > 0) {
            goomba.position.y = other.position.y - goomba.size.y;
            acceleration.y = 0;
            grounded = true;
        }

        if (CollisionManager.left(goomba, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && acceleration.x > 0) {
            goomba.position.x = other.position.x - goomba.size.x;
        }

        if (CollisionManager.right(goomba, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && acceleration.x < 0) {
            goomba.position.x = other.position.x + other.size.x;
        }
    }

    setCurrentSprite(currentTimeStep) {
        let animation = 'goomba_walk_';

        if (currentTimeStep - lastStepTime > (1000 / 4)) {
            animationStep++;
            lastStepTime = currentTimeStep;
        }

        if (animationStep > 2) animationStep = 1;
        animation += animationStep;
        this.sprite.src = sprites[animation];
    }
}