import { Vector } from '../engine/vector.js';
import manager from './manager.js';
import time from '../engine/time.js';

let velocity = Vector.zero;
let acceleration = Vector.zero;

let jumping = false;
let jumpTimer = 0;
let startingHeight;

let previousStep = 0;
let previousDirection = 0;

const player = manager.getEntity("player");

function move() {
    if (jumping) {
        previousStep = jumpTimer;
        jumpTimer += time.deltaTime;
        velocity.add(new Vector(0, (jumpFunction(jumpTimer) - jumpFunction(previousStep))));
    }

    player.position.add(velocity);
    velocity = Vector.zero;
}

function jumpFunction(x) {
    return ((4 * player.getJumpHeight) / (player.getJumpDuration * player.getJumpDuration)) * ((x - (player.getJumpDuration / 2)) * (x - (player.getJumpDuration / 2))) - player.getJumpHeight;
}

function walk(direction) {
    if (direction != previousDirection) {
        acceleration = Vector.right.scaled(previousDirection * player.getAcceleration);
        previousDirection = direction;
    }
    if (Math.abs(acceleration.x) < player.getMaxAcceleration) acceleration.add(Vector.right.scaled(direction * player.getAcceleration));
    velocity.add(acceleration.scaled(player.getSpeed));
}

function jump() {
    if (jumping) return;
    startingHeight = player.getPosition.y;
    jumping = true;
}

export { move, jump, walk };