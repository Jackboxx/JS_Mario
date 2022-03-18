import { layers, sprites } from "./data.js";

export class Entity {
    constructor(position, size, layer, sprite) {
        this.position = position;
        this.size = size;
        this.layer = layers[layer];
        this.sprite = new Image;
        this.sprite.src = sprites[sprite];
        this.exists = true;
    }

    remove() {
        this.exists = false;
    }

    isTouching(otherPosition, otherSize) {
        return this.position.x < otherPosition.x + otherSize.x &&
            this.position.x + this.size.x > otherPosition.x &&
            this.position.y < otherPosition.y + otherSize.y &&
            this.position.y + this.size.y > otherPosition.y;
    }
}