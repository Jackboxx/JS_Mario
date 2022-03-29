import { Vector } from "../engine/vector.js";
import { Entity } from "../engine/entity.js";
import { Player } from './mario.js';
import { Goomba } from "./goomba.js";

let enemies = [];
let objects = [];

class Manager extends Entity {
    gravity = .8;
    maxVerticalAcceleration = 25;

    constructor(position, size, screenSize) {
        super(position, size);
        this.screenSize = screenSize;
        this.entities = {
            "player": new Player(new Vector(100, 399), new Vector(40, 40)),
            "ground": new Entity(new Vector(0, 440), new Vector(800, 30), 2, ''),
            "block1": new Entity(new Vector(400, 390), new Vector(40, 40), 2, ''),
            "block2": new Entity(new Vector(300, 250), new Vector(200, 80), 2, ''),
            "block3": new Entity(new Vector(150, 250), new Vector(60, 40), 2, ''),
            "goomba": new Goomba(new Vector(200, 310), new Vector(60, 40)),
        };
    }

    update() {
        enemies = [];
        objects = [];

        for (let name in this.entities) {
            let entity = this.entities[name];
            if (entity.layer === 'object') objects.push(entity);
            if (entity.layer === 'enemy') enemies.push(entity);
        }
    }

    allEnemies() {
        return enemies;
    }

    allObjects() {
        return objects;
    }

    worldGravity() {
        return this.gravity;
    }

    airResistance() {
        return this.maxVerticalAcceleration;
    }
}

const instance = new Manager(new Vector(0, 0), new Vector(0, 0), new Vector(800, 700))
Object.freeze(instance);

export default instance;