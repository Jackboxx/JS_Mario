import attributes from '../game/attributes.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        //this function will need to get data from a scene or screen to know what to draw

        this.context.clearRect(0, 0, attributes.getScreenSize.x, attributes.getScreenSize.y);
        this.context.drawImage(attributes.sprite, attributes.getPosition.x, attributes.getPosition.y, attributes.getSize.x, attributes.getSize.y);
    }
}