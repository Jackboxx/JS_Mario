import { Weapon } from "../engine/weapon.js";
import { Vector } from "../engine/vector.js";
import { sprites, sounds } from "../engine/data.js";
import manager from './manager.js';
import time from '../engine/time.js';
import { RailgunShot } from "./railgunShot.js";

export class Railgun extends Weapon {
    constructor(position) {
        super(position, new Vector(100, 50), '', 2, 1500);
    }


    update(position, direction) {
        let offset = (direction == 1) ? Vector.zero : Vector.left.scaled(this.size.x / 2);

        this.position = position.added(offset);
        this.setCurrentSprite(direction);
    }

    fire(direction) {
        if (time.elapsedtime - this.lastTimeStep < this.fireRate) return;

        let offset = new Vector(this.size.x * 0.8, -6);

        let projectile = new RailgunShot(this.position.added(offset), new Vector(direction, 0));
        projectile.name = 'railgun_shot_' + manager.currentProjectileID();
        manager.entities[projectile.name] = projectile;
        manager.increaseProcetileID();

        this.lastTimeStep = time.elapsedtime;
        this.ammoCount--;
    }

    setCurrentSprite(direction) {
        let sufix = (direction == 1) ? 'r' : 'l';
        this.sprite.src = sprites['railgun_' + sufix];
    }

    remove() {
        setTimeout(() => {
            delete manager.entities[this.name];
        }, 1500);
    }
}