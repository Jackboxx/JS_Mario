import time from '../engine/time.js';
import {InputManager} from '../engine/input.js';
import { Renderer } from '../engine/renderer.js';
import { move } from './movement.js';

const mario = document.getElementById('mario');
const game_screen = document.getElementById('game_screen');
const renderer = new Renderer(game_screen.getContext('2d'));
const inputManager = new InputManager();

document.addEventListener('keydown', inputManager.down);
document.addEventListener('keyup', inputManager.up);

function update() {
    time.tick();
    inputManager.input();
    move();
    renderer.draw();
    setTimeout(update, 1000 / 60);
}

update();