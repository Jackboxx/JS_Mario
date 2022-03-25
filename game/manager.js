import { Vector } from "../engine/vector.js";
import { Entity } from "../engine/entity.js";
import player from './mario.js';

class Manager extends Entity {
    constructor(position, size, screenSize) {
        super(position, size);
        this.screenSize = screenSize;
        this.entities = {
            "player": player,
            "ground": new Entity(new Vector(0, 440), new Vector(800, 30), 2, ''),
            "block1": new Entity(new Vector(400, 390), new Vector(40, 40), 2, ''),
            "block2": new Entity(new Vector(300, 250), new Vector(200, 80), 2, ''),
            "block3": new Entity(new Vector(150, 250), new Vector(60, 40), 2, '')
        };
    }
}

const instance = new Manager(new Vector(0, 0), new Vector(0, 0), new Vector(800, 700))
Object.freeze(instance);

export default instance;