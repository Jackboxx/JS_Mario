import { layers, sprites } from "./data.js";
import { Vector } from "./vector.js";

let _previousPosition = Vector.zero;


export class Entity {

    constructor(position, size, layer = 0, sprite = '') {
        this.position = position;
        this.size = size;
        this.layer = layers[layer];
        this.sprite = new Image;
        if (sprite !== '') this.sprite.src = sprites[sprite];
    }

    get previousPosition() {
        return _previousPosition;
    }

    set previousPosition(position) {
        _previousPosition = position;
    }
}