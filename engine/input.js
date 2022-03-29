import manager from '../game/manager.js';


const pressedKeys = [];
const player = manager.entities['player'];

export class InputManager {
    down(event) {
        pressedKeys[event.key] = true;
    }

    up(event) {
        pressedKeys[event.key] = false;
    }

    input() {
        if (pressedKeys[' ']) player.jump();

        if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.walk(-1);
        if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.walk(1);
    }
}