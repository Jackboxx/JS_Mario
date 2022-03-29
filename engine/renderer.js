import manager from '../game/manager.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        this.context.clearRect(0, 0, manager.screenSize.x, manager.screenSize.y);
        for (let name in manager.entities) {
            let entity = manager.entities[name];
            this.context.drawImage(entity.sprite, entity.position.x, entity.position.y, entity.size.x, entity.size.y);
        }

        this.context.fillRect(manager.entities['ground'].position.x, manager.entities['ground'].position.y, manager.entities['ground'].size.x, manager.entities['ground'].size.y)
        this.context.fillRect(manager.entities['block1'].position.x, manager.entities['block1'].position.y, manager.entities['block1'].size.x, manager.entities['block1'].size.y)
        this.context.fillRect(manager.entities['block2'].position.x, manager.entities['block2'].position.y, manager.entities['block2'].size.x, manager.entities['block2'].size.y)
        this.context.fillRect(manager.entities['block3'].position.x, manager.entities['block3'].position.y, manager.entities['block3'].size.x, manager.entities['block3'].size.y)
    }
}