import { Vector } from '../engine/vector.js';
import attributes from './attributes.js';
import time from '../engine/time.js';

let velocity = Vector.zero;
let acceleration = Vector.zero;

let jumping = false;
let jumpTimer = 0;
let startingHeight;

let previousStep = 0;
let previousDirection = 0;

function move() {
    if (jumping) {
        previousStep = jumpTimer;
        jumpTimer += time.deltaTime;
        velocity.add(new Vector(0, (jumpFunction(jumpTimer) - jumpFunction(previousStep))));
    }

    attributes.position.add(velocity);
    velocity = Vector.zero;
}

function jumpFunction(x) {
    return ((4 * attributes.getJumpHeight) / (attributes.getJumpDuration * attributes.getJumpDuration)) * ((x - (attributes.getJumpDuration / 2)) * (x - (attributes.getJumpDuration / 2))) - attributes.getJumpHeight;
}

function walk(direction) {
    if (direction != previousDirection) {
        acceleration = Vector.right.scaled(previousDirection * attributes.getAcceleration);
        previousDirection = direction;
    }
    if (Math.abs(acceleration.x) < attributes.getMaxAcceleration) acceleration.add(Vector.right.scaled(direction * attributes.getAcceleration));
    velocity.add(acceleration.scaled(attributes.getSpeed));
}

function jump() {
    if (jumping) return;
    startingHeight = attributes.getPosition.y;
    jumping = true;
}

export { move, jump, walk };