import { Projectile } from "../engine/projectile.js";
import { Vector } from "../engine/vector.js";
import time from '../engine/time.js';
import manager from './manager.js';

export class Hammer extends Projectile {
    constructor(position, size, direction) {
        let sufix = (direction > 0) ? 'l' : 'r';
        super(position, size, direction, false, 'hammer_' + sufix);
        this.name = 'hammer_' + manager.currentProjectileID();
        this.horizontalSpeed = 2;
        this.velocity = Vector.zero
        this.accelleration = Vector.zero;
        this.throwHeight = 120;
        this.throwDuration = 1200;
        this.lastTimeStep = 0;
        this.currentTimeStep = 0;
    }

    travel() {
        this.currentTimeStep += time.deltaTime;
        this.accelleration = new Vector(-this.direction * this.horizontalSpeed, this.throw(this.currentTimeStep) - this.throw(this.lastTimeStep));
        this.velocity.add(this.accelleration);
        this.position.add(this.velocity)
        this.velocity = Vector.zero;
        this.lastTimeStep += time.deltaTime;
        if (this.position.y > manager.screenSize.y) this.impact();
    }

    throw (x) {
        return ((4 * this.throwHeight) / (this.throwDuration * this.throwDuration)) * ((x - (this.throwDuration / 2)) * (x - (this.throwDuration / 2))) - this.throwHeight;
    }
}