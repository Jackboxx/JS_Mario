import { Vector } from '../engine/vector.js';

class Attributes {
    constructor() {
        this.screenSize = new Vector(800, 700);
        this.position = new Vector(100, 400);
        this.size = new Vector(40, 40);
        this.speed = 10;
        this.acceleration = 0.02;
        this.maxAcceleration = 1;
        this.jumpDuration = 1000; // in ms
        this.jumpHeight = 200;
        this.sprites = [];
        this.sprites[0] = new Image();
        this.sprites[0].src = '../sprites/mario.png';
    }

    get getScreenSize() {
        return this.screenSize;
    }

    get getPosition() {
        return this.position;
    }

    get getSize() {
        return this.size;
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

    setPosition(position) {
        this.position = position;
    }

    addPosition(term) {
        this.position.add(term);
    }
}


const instance = new Attributes();
Object.freeze(instance);

export default instance;