import { Projectile } from '../engine/projectile.js';
import manager from './manager.js';

export class ShotgunBullet extends Projectile {
    constructor(position, size, direction) {
        let sprite = (direction.x >= 0) ? 'r' : 'l';
        super(position, size, direction, true, true, 'bullet_' + sprite);
        this.speed = 14;
    }

    travel() {
        this.position.add(this.direction.normalised.scaled(this.speed));
    }

    impact() {
        this.impaced = true;
        delete manager.entities[this.name];
    }
}