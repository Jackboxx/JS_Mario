import {jump} from '../game/movement.js';

const pressedKeys = [];

export class InputManager{
    down(event) {
        pressedKeys[event.key] = true;
    }
    
    up(event){
        pressedKeys[event.key] = false;
    }

    input(){
        if(pressedKeys[' ']) jump();

        if(pressedKeys['w']) console.log('W');
        if(pressedKeys['a']) console.log('A');
        if(pressedKeys['s']) console.log('S');
        if(pressedKeys['d']) console.log('D');
    }
}