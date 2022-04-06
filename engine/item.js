import { Railgun } from "../game/railgun.js";
import { Shotgun } from "../game/shotgun.js";
import { Entity } from "./entity.js";
import { Vector } from "./vector.js";
import manager from '../game/manager.js';
import time from './time.js';


export class Item extends Entity {
    constructor(position, size, type, sprite) {
        super(position, size, 5, sprite)
        this.type = type;
        this.startingPosition = position;
    }

    pickUp(player) {
        switch (this.type) {
            case 'shotgun':
                player.equipWeapon(new Shotgun(player.position));
                manager.setWeaponExists(false);
                break;
            case 'railgun':
                player.equipWeapon(new Railgun(player.position));
                manager.setWeaponExists(false);
                break;
        }

        delete manager.entities[this.name];
    }

    move() {
        this.position = this.startingPosition.added(Vector.up.scaled(Math.sin(time.elapsedtime / 100)));
    }
}