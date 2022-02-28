import {Vector} from '../engine/vector.js';

class Attributes {
    constructor(){
        this.position = new Vector(0, 0);
        this.size = new Vector(40, 40);
    }

    get getPosition(){
        return this.position;
    }     

    get getSize(){
        return this.size;
    }

    setPosition(position){
        this.position = position;
    }

    addPosition(term){
        this.position.add(term);
    }
}


const instance = new Attributes();
Object.freeze(instance);

export default instance;