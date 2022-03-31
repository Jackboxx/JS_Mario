import manager from '../game/manager.js';
import { Entity } from "./entity.js";

export class Projectile extends Entity {
    constructor(startingPosition, size, direction, friendly, sprite = '', layer = 4) {
        super(startingPosition, size, layer, sprite);
        this.direction = direction;
        this.friendly = friendly;
        this.impaced = false;
    }

    travel() {
        this.position.add(this.direction.normalised);
    }

    impact() {
        delete manager.entities[this.name];
    }
}