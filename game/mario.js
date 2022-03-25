import { sprites } from '../engine/data.js';
import { Vector } from '../engine/vector.js';
import { Entity } from '../engine/entity.js';

let lastStepTime = 0;
let animationStep = 1;

class Player extends Entity {
    constructor(position, size) {
        super(position, size, 1, 'mario_idle_r');
        this.acceleration = 0.2;
        this.maxAcceleration = 10;
        this.jumpDuration = 1000; // in ms
        this.jumpHeight = 200;
    }

    setCurrentSprite(moving, jumping, direction, currentTimeStep, cycleSpeed) {
        let sufix = (direction >= 0) ? 'r' : 'l';
        let animation = "mario_";

        if (jumping) {
            animation += `jump_${sufix}`;
        } else if (moving) {
            if (currentTimeStep - lastStepTime > (1000 / cycleSpeed)) {
                animationStep++;
                lastStepTime = currentTimeStep;
            }
            if (animationStep > 3) animationStep = 1;
            animation += `run_${sufix}_${animationStep}`;
        } else {
            animation += `idle_${sufix}`;
        }
        this.sprite.src = sprites[animation];
    }
}


const instance = new Player(new Vector(100, 399), new Vector(40, 40));
Object.freeze(instance);

export default instance;