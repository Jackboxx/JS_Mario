import { Vector } from "../engine/vector.js";
import { Entity } from "../engine/entity.js";

class Manager extends Entity {
    constructor(position, size, screenSize) {
        super(position, size);
        this.screenSize = screenSize;
    }

    get getScreenSize() {
        return this.screenSize;
    }
}

const instance = new Manager(new Vector(0, 0), new Vector(0, 0), new Vector(800, 700))
Object.freeze(instance);

export default instance;