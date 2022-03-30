import { CollisionManager } from '../engine/collisionManager.js';
import { InputManager } from '../engine/input.js';
import { Renderer } from '../engine/renderer.js';
import { Spawner } from './spawner.js';
import { moveEntities } from './movementManager.js';
import time from '../engine/time.js';
import manager from './manager.js';

const game_screen = document.getElementById('game_screen');
const renderer = new Renderer(game_screen.getContext('2d'));
const collisionManager = new CollisionManager();
const spawner = new Spawner();
const inputManager = new InputManager();

document.addEventListener('keydown', inputManager.down);
document.addEventListener('keyup', inputManager.up);

let start;

function update(timestep) {
    if (start === undefined) {
        start = timestep;
    }
    time.tick(timestep - start);
    manager.update();
    spawner.spawn();
    inputManager.input();
    moveEntities();
    collisionManager.checkCollision();
    renderer.draw();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);