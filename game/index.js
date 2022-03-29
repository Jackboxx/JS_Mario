import time from '../engine/time.js';
import { CollisionManager } from '../engine/collisionManager.js';
import { InputManager } from '../engine/input.js';
import { Renderer } from '../engine/renderer.js';
import { move } from './movement.js';
import { update as updateMovement } from './movementManager.js';

const game_screen = document.getElementById('game_screen');
const renderer = new Renderer(game_screen.getContext('2d'));
const collisionManager = new CollisionManager();
const inputManager = new InputManager();

document.addEventListener('keydown', inputManager.down);
document.addEventListener('keyup', inputManager.up);

let start;

function update(timestep) {
    if (start === undefined) {
        start = timestep;
    }

    time.tick(timestep - start);
    inputManager.input();
    move();
    updateMovement();
    collisionManager.checkCollision();
    renderer.draw();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);