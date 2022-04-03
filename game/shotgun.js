import { Weapon } from '../engine/weapon.js';
import { Vector } from '../engine/vector.js';
import { ShotgunBullet } from './shotgunBullet.js';
import { sounds, sprites } from '../engine/data.js';
import time from '../engine/time.js';
import manager from './manager.js';

export class Shotgun extends Weapon {
    lastTimeStep = 0;

    constructor(position) {
        super(position, new Vector(80, 40), '', 3, 500);
    }

    update(position, direction) {
        let offset = (direction == 1) ? Vector.zero : Vector.left.scaled(this.size.x / 2);

        this.position = position.added(offset);
        this.setCurrentSprite(direction);
    }

    fire(direction) {
        if (time.elapsedtime - this.lastTimeStep < this.fireRate) return;
        for (let i = 0; i < 3; i++) {
            let offsetX = (direction == 1) ? this.size.x * 0.8 : 0;
            let projectile = new ShotgunBullet(new Vector(this.position.x + offsetX, this.position.y + this.size.y / 2 - 5), new Vector(20, 20), new Vector(direction, -i / 10));
            projectile.name = 'shotgun_bullet_' + manager.currentProjectileID();
            manager.entities[projectile.name] = projectile;
            manager.increaseProcetileID();
        }

        let sfx = new Audio(sounds['shotgun_shot']);
        sfx.play();

        this.lastTimeStep = time.elapsedtime;
        this.ammoCount--;
    }

    setCurrentSprite(direction) {
        let sufix = (direction == 1) ? 'r' : 'l';
        this.sprite.src = sprites['shotgun_' + sufix];
    }
}