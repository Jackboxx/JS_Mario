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
        if (pressedKeys[' '] || pressedKeys['w'] || pressedKeys['ArrowUp']) player.jump();
        if (pressedKeys['e'] || pressedKeys['s'] || pressedKeys['ArrowDown']) player.useWeapon();

        if (pressedKeys['a'] || pressedKeys['ArrowLeft']) player.walk(-1);
        if (pressedKeys['d'] || pressedKeys['ArrowRight']) player.walk(1);
    }
}