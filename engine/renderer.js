import manager from '../game/manager.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        //this function will need to get data from a scene or screen to know what to draw
        this.context.clearRect(0, 0, manager.screenSize.x, manager.screenSize.y);
        for (let name in manager.entities) {
            let entity = manager.entities[name];
            this.context.drawImage(entity.sprite, entity.position.x, entity.position.y, entity.size.x, entity.size.y);
        }
    }
}