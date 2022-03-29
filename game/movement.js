import { Vector } from '../engine/vector.js';
import manager from './manager.js';
import time from '../engine/time.js';
import { CollisionManager } from '../engine/collisionManager.js';
import { Entity } from '../engine/entity.js';

let velocity = Vector.zero;
let acceleration = Vector.zero;

const player = manager.entities["player"];
const gravity = .8;
const maxVerticalAcceleration = 150;

let grounded = false;
let jumping = false;
let jumpTimer = 0;
let startingHeight;

let previousStep = 0;
let previousDirection = 0;
let moving = false;

function move() {
    if (jumping) {
        previousStep = jumpTimer;
        jumpTimer += time.deltaTime;
        acceleration.y = jumpFunction(jumpTimer) - jumpFunction(previousStep);
    }

    if (!grounded && !jumping) {
        if (acceleration.y < maxVerticalAcceleration) acceleration.y += gravity;
    } else if (!jumping) {
        acceleration.y = 0;
    }

    velocity.add(acceleration);
    player.setPreviousPosition(player.position);
    player.position.add(velocity);

    player.setCurrentSprite(Math.abs(velocity.x), jumping, velocity.x, time.elapsedtime, velocity.length);
    velocity = Vector.zero;
    if (!moving) acceleration.x = 0;

    moving = false;
    grounded = false;
}


//slightly broken
function onCollision(other) {
    let previous = new Entity(player.previousPosition, player.size, 1);

    if (CollisionManager.above(player, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && acceleration.y > 0) {
        player.position.y = other.position.y - player.size.y;
        grounded = true;
        stopJump();
    }

    if (CollisionManager.below(player, other) && (CollisionManager.left(previous, other) | CollisionManager.right(previous, other)) && acceleration.y < 0) {
        player.position.y = other.position.y + other.size.y;
        acceleration.y = 0;
        stopJump()
    }

    if (CollisionManager.left(player, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && acceleration.x > 0) {
        player.position.x = other.position.x - player.size.x;
        acceleration.x = 0;
    }

    if (CollisionManager.right(player, other) && (CollisionManager.above(previous, other) | CollisionManager.below(previous, other)) && acceleration.x < 0) {
        player.position.x = other.position.x + other.size.x;
        acceleration.x = 0;
    }
}

function jumpFunction(x) {
    return ((4 * player.jumpHeight) / (player.jumpDuration * player.jumpDuration)) * ((x - (player.jumpDuration / 2)) * (x - (player.jumpDuration / 2))) - player.jumpHeight;
}


function walk(direction) {
    if (direction != previousDirection) {
        acceleration.x = previousDirection * player.acceleration;
        previousDirection = direction;
    }
    if (Math.abs(acceleration.x) < player.maxAcceleration) acceleration.add(Vector.right.scaled(direction * player.acceleration));

    moving = true;
}

function jump() {
    if (jumping || !grounded) return;
    startingHeight = player.position.y;
    jumping = true;
    grounded = false;
}

function stopJump() {
    jumping = false;
    jumpTimer = 0;
}

export { move, jump, walk, onCollision };