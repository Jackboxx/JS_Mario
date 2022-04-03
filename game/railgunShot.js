import { Projectile } from "../engine/projectile.js";
import { Vector } from "../engine/vector.js";
import { sprites } from "../engine/data.js";
import manager from './manager.js';

export class RailgunShot extends Projectile {
    constructor(position, direction) {
        super(position, new Vector(40, 40), direction, true, false, '');
        this.speed = 0;
        this.chargeTime = 1000;
        this.charge(direction.x);
    }

    impact() {}

    charge(direction) {
        manager.entities['player'].canMove = false;
        let dir = (direction == 1) ? 'r' : 'l';
        this.position.x -= (direction == 1) ? 0 : 100;

        this.animateCharge(9, dir);

        setTimeout(() => {
            this.size = new Vector(800, 100);
            this.position.x -= (direction == 1) ? 0 : 770;
            this.position.y -= 30;

            this.animateLaser(5, dir);

            setTimeout(() => {
                manager.entities['player'].canMove = true;
                delete manager.entities[this.name];
            }, 500);

        }, this.chargeTime);
    }

    animateCharge(cycle, dir) {
        if (cycle == 0) return;
        let sufix = (cycle % 2) + 1;
        this.sprite.src = sprites[`charge_${sufix}_${dir}`];
        setTimeout(() => {
            this.animateCharge(cycle - 1, dir);
        }, 100)
    }

    animateLaser(cycle, dir) {
        if (cycle == 0) return;
        let sufix = (cycle % 2) + 1;
        this.sprite.src = sprites[`laser_${sufix}_${dir}`];
        setTimeout(() => {
            this.animateLaser(cycle - 1, dir);
        }, 100)
    }
}