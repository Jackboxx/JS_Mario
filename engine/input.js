import { jump, walk } from '../game/movement.js';

const pressedKeys = [];

export class InputManager {
    down(event) {
        pressedKeys[event.key] = true;
    }

    up(event) {
        pressedKeys[event.key] = false;
    }

    input() {
        if (pressedKeys[' ']) jump();

        if (pressedKeys['a'] || pressedKeys['ArrowLeft']) walk(-1);
        if (pressedKeys['d'] || pressedKeys['ArrowRight']) walk(1);
    }
}