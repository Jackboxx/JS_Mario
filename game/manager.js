import { Vector } from "../engine/vector.js";
import { Entity } from "../engine/entity.js";
import player from './mario.js';

class Manager extends Entity {
    constructor(position, size, screenSize) {
        super(position, size);
        this.screenSize = screenSize;
        this.entities = {
            "player": player,
            "ground": new Entity(new Vector(0, 440), new Vector(800, 260), '../sprites/idle_r.png')
        };
    }

    get getScreenSize() {
        return this.screenSize;
    }

    get getAllEntities() {
        return this.entities;
    }

    getEntity(name) {
        return this.entities[name];
    }
}

const instance = new Manager(new Vector(0, 0), new Vector(0, 0), new Vector(800, 700))
Object.freeze(instance);

export default instance;