import manager from '../game/manager.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        //this function will need to get data from a scene or screen to know what to draw
        this.context.clearRect(0, 0, manager.getScreenSize.x, manager.getScreenSize.y);
        for (let name in manager.getAllEntities) {
            let entity = manager.getEntity(name);
            this.context.drawImage(entity.getCurrentSprite, entity.getPosition.x, entity.getPosition.y, entity.getSize.x, entity.getSize.y);
        }
    }
}