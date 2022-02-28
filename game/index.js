import time from '../engine/time.js';
import attributes from './attributes.js';

import {move, jump} from './movement.js';

const width = 800;
const height = 700;

const mario = document.getElementById('mario');
const game_screen = document.getElementById('game_screen');
const ctx = game_screen.getContext('2d');

document.addEventListener('keypress', inputListener)

function inputListener(event) {
    switch (event.code){
        case 'Space':
            jump();
            break;
    }
}

function update() {
    time.tick();
    move();
    draw();
    setTimeout(update, 1000 / 60);
}

function draw(){
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(attributes.getPosition.x, attributes.getPosition.y, attributes.getSize.x, attributes.getSize.y);
}

update();