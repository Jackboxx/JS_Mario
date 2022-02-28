import { Vector } from '../engine/vector.js';
import attributes from './attributes.js';
import time from '../engine/time.js';

let velocity = Vector.zero;

const jumpDuration = 1000;
const jumpHeight = 200;

let jumping = false;
let jumpTimer = 0;
let startingHeight;

function move(){
    if (jumping) {
        velocity.add(new Vector(0, -jumpFunction(jumpTimer) - startingHeight));
        jumpTimer += time.deltaTime;
    }

    attributes.addPosition(velocity);
    velocity = Vector.zero;
}

function jumpFunction(x) {
    return ((4 * jumpHeight) / (jumpDuration * jumpDuration)) * ((x - (jumpDuration / 2)) * (x - (jumpDuration / 2))) - jumpHeight;
}

function jump() {
    startingHeight = attributes.getPosition.y;
    jumping = true;
}

export {move, jump};