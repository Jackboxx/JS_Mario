import attributes from '../game/attributes.js';

export class Renderer{
    constructor(context){
        this.context = context;
    }

    draw(){
        //this function will need to get data from a scene or screen to know what to draw

        this.context.fillStyle = 'rgb(255, 0, 0)'
        this.context.clearRect(0, 0, attributes.getScreenSize.x, attributes.getScreenSize.y);
        this.context.fillRect(attributes.getPosition.x, attributes.getPosition.y, attributes.getSize.x, attributes.getSize.y);
    }
}