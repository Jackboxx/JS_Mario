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

const player = manager.entities["player"];

function move() {
    if (jumping) {
        previousStep = jumpTimer;
        jumpTimer += time.deltaTime;
        velocity.add(new Vector(0, (jumpFunction(jumpTimer) - jumpFunction(previousStep))));
    }

    player.position.add(velocity);
    player.setCurrentSprite(velocity.length > 0, jumping, velocity.x, time.elapsedtime, velocity.length);
    velocity = Vector.zero;
}

function jumpFunction(x) {
    return ((4 * player.jumpHeight) / (player.jumpDuration * player.jumpDuration)) * ((x - (player.jumpDuration / 2)) * (x - (player.jumpDuration / 2))) - player.jumpHeight;
}

function walk(direction) {
    if (direction != previousDirection) {
        acceleration = Vector.right.scaled(previousDirection * player.acceleration);
        previousDirection = direction;
    }
    if (Math.abs(acceleration.x) < player.maxAcceleration) acceleration.add(Vector.right.scaled(direction * player.acceleration));
    velocity.add(acceleration.scaled(player.speed));
}

function jump() {
    if (jumping) return;
    startingHeight = player.position.y;
    jumping = true;
}

export { move, jump, walk };