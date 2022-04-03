import { Entity } from './entity.js';
import manager from '../game/manager.js';

export class Weapon extends Entity {
    constructor(position, size, sprite, ammoCount, fireRate) {
        super(position, size, 1, sprite);
        this.name = 'weapon';
        this.ammoCount = ammoCount;
        this.fireRate = fireRate;
    }

    fire() {}

    remove() {
        setTimeout(() => {
            delete manager.entities[this.name];
        }, 300)
    }
}