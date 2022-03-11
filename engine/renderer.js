import player from '../game/mario.js';

export class Renderer {
    constructor(context) {
        this.context = context;
    }

    draw() {
        //this function will need to get data from a scene or screen to know what to draw

        this.context.clearRect(0, 0, player.getScreenSize.x, player.getScreenSize.y);
        this.context.drawImage(player.getCurrentSprite, player.getPosition.x, player.getPosition.y, player.getSize.x, player.getSize.y);
    }
}