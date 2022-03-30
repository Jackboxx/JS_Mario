import { Entity } from '../engine/entity.js';
import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { CollisionManager } from '../engine/collisionManager.js';
import time from '../engine/time.js';
import manager from './manager.js';

export class HammerBro extends Entity {
    velocity = Vector.zero;
    acceleration = Vector.zero;
    speed = 1;

    lastStepTime = 0;
    animationStep = 1;
    grounded = true;

    constructor(position, size) {
        super(position, size, 3);
        this.alive = true;
        this.cost = 8;
        this.name = 'hammer_bro_';
        this.acceleration.x = this.speed * (this.position.x - manager.screenSize.x / 2 > 0) ? -1 : 1;
    }

    move(player) {}

    onCollision(other) {}

    setCurrentSprite(currentTimeStep) {}

    die() {
        this.alive = false;
        manager.decreaseEnemyAmount();
    }
}