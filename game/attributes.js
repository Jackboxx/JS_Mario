import {Vector} from '../engine/vector.js';

class Attributes {
    constructor(){
        this.screenSize = new Vector(800, 700);
        this.position = new Vector(100, 400);
        this.size = new Vector(40, 40);
    }

    get getScreenSize(){
        return this.screenSize;
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