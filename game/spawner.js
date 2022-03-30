import { Vector } from '../engine/vector.js';
import { Goomba } from './goomba.js';
import { HammerBro } from './hammerBro.js';
import time from '../engine/time.js';
import manager from './manager.js';

const spawnPoints = [
    new Vector(-150, 450), //bottom left
    new Vector(950, 450), //bottom right
    new Vector(50, -100), //top left
    new Vector(750, -100), //top right
    new Vector(-150, 300), //middle left
    new Vector(950, 300) //middle right 
];

export class Spawner {
    constructor() {
        this.budget = 8;
        this.enemyID = 0;
        this.currentScore = 0;
        this.lastTime = time.elapsedtime;
        this.delay = 400;
    }

    spawn() {
        if (manager.currentEnemyAmount() >= manager.maxEnemyAmount || time.elapsedtime - this.lastTime < this.delay - this.currentScore * 5) return;
        this.lastTime = time.elapsedtime;

        if (this.currentScore != manager.currentScore()) {
            this.budget += (manager.currentScore() - this.currentScore) * 3;
            this.currentScore = manager.currentScore();
        }

        let index = Math.floor(Math.random() * spawnPoints.length);
        let enemy = (Math.random < .15) ? new HammerBro(new Vector(spawnPoints[index].x, spawnPoints[index].y), new Vector(40, 40)) : new Goomba(new Vector(spawnPoints[index].x, spawnPoints[index].y), new Vector(40, 40));

        if (this.budget >= enemy.cost) {
            enemy.name += this.enemyID;
            manager.entities[enemy.name] = enemy;
            manager.increaseEnemyAmount();
            this.enemyID++;
            this.budget -= enemy.cost;
        }
    }
}