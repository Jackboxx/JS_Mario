import { Vector } from '../engine/vector.js';
import attributes from './attributes.js';
import time from '../engine/time.js';

let velocity = Vector.zero;

const jumpDuration = 1000;
const jumpHeight = 200;

let jumping = false;
let jumpTimer = 0;
let startingHeight;

let previousStep = 0;

function move(){
    if (jumping) {
        previousStep = jumpTimer;
        jumpTimer += time.deltaTime;
        velocity.add(new Vector(0, (jumpFunction(jumpTimer) - jumpFunction(previousStep))));
    }

    attributes.position.add(velocity);
    velocity = Vector.zero;
}

function jumpFunction(x) {
    return ((4 * jumpHeight) / (jumpDuration * jumpDuration)) * ((x - (jumpDuration / 2)) * (x - (jumpDuration / 2))) - jumpHeight;
}

function jump() {
    if(jumping) return;
    startingHeight = attributes.getPosition.y;
    jumping = true;
}

export {move, jump};