import manager from '../game/manager.js';
import { Entity } from "./entity.js";

export class Projectile extends Entity {
    constructor(startingPosition, size, direction, friendly, canCollide, sprite = '', layer = 4) {
        super(startingPosition, size, layer, sprite);
        this.direction = direction;
        this.friendly = friendly;
        this.canCollide = canCollide;
        this.impaced = false;
    }

    travel() {}

    impact() {
        this.impaced = true;
        delete manager.entities[this.name];
    }
}