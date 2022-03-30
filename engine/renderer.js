import manager from '../game/manager.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        this.context.clearRect(0, 0, manager.screenSize.x, manager.screenSize.y);
        for (let name in manager.entities) {
            let entity = manager.entities[name];
            if (name.includes('block')) {
                for (let i = 0; i < entity.size.x / 40; i++) {
                    for (let j = 0; j < entity.size.y / 40; j++) {
                        this.context.drawImage(entity.sprite, entity.position.x + 40 * i, entity.position.y + 40 * j, 40, 40);
                    }
                }
            } else {
                this.context.drawImage(entity.sprite, entity.position.x, entity.position.y, entity.size.x, entity.size.y);
            }
        }
    }
}