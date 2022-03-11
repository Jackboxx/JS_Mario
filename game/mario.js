import { Vector } from '../engine/vector.js';
import { Entity } from '../engine/entity.js';

let lastStepTime = 0;
let animationStep = 1;

class Player extends Entity {
    constructor(position, size) {
        super(position, size)
        this.speed = 10;
        this.acceleration = 0.02;
        this.maxAcceleration = 1;
        this.jumpDuration = 1000; // in ms
        this.jumpHeight = 200;
        this.currentSprite = new Image();

        this.sprites = {
            "idle_r": '../sprites/idle_r.png',
            "idle_l": '../sprites/idle_l.png',
            "death": '../sprites/death.png',
            "victory": '../sprites/victory.png',
            "run_r_1": '../sprites/run_r_1.png',
            "run_r_2": '../sprites/run_r_2.png',
            "run_r_3": '../sprites/run_r_3.png',
            "run_l_1": '../sprites/run_l_1.png',
            "run_l_2": '../sprites/run_l_2.png',
            "run_l_3": '../sprites/run_l_3.png',
            "jump_r": '../sprites/jump_r.png',
            "jump_l": '../sprites/jump_l.png',
            "turn_r": '../sprites/turn_r.png',
            "turn_l": '../sprites/turn_l.png'
        };
    }

    get getSpeed() {
        return this.speed;
    }

    get getAcceleration() {
        return this.acceleration;
    }

    get getMaxAcceleration() {
        return this.maxAcceleration;
    }

    get getJumpDuration() {
        return this.jumpDuration;
    }

    get getJumpHeight() {
        return this.jumpHeight;
    }

    get getMirrorOffset() {
        return this.mirrorOffset;
    }

    get getCurrentSprite() {
        return this.currentSprite;
    }

    setPosition(position) {
        this.position = position;
    }

    addPosition(term) {
        this.position.add(term);
    }

    setCurrentSprite(moving, jumping, direction, currentStep, cycleSpeed) {
        let sufix = (direction >= 0) ? 'r' : 'l';
        let animation = "";

        if (jumping) {
            animation = `jump_${sufix}`;
        } else if (moving) {
            //step forward on frame every 333.33.. ms
            if (currentStep - lastStepTime > (1000 / cycleSpeed)) {
                animationStep++;
                lastStepTime = currentStep;
            }
            if (animationStep > 3) animationStep = 1;
            animation = `run_${sufix}_${animationStep}`;
        } else {
            animation = `idle_${sufix}`;
        }
        this.currentSprite.src = this.sprites[animation];
    }
}


const instance = new Player(new Vector(100, 400), new Vector(40, 40));
Object.freeze(instance);

export default instance;