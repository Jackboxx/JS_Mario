import { layers, sprites } from "./data.js";
import { Vector } from "./vector.js";

class Entity {
    constructor(position, size, layer = 0, sprite = '') {
        this.position = position;
        this.size = size;
        this.name = '';
        this.layer = layers[layer];
        this.sprite = new Image;
        this.previousPosition = Vector.zero;
        if (sprite !== '') this.sprite.src = sprites[sprite];
    }

    // very very very stupid work-around
    setPreviousPosition(position) {
        this.previousPosition.subtract(this.previousPosition).add(position);
    }
}

export { Entity }