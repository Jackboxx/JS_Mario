import { Vector } from "../engine/vector.js";
import { Entity } from "../engine/entity.js";
import { Player } from './mario.js';
import { sounds } from '../engine/data.js';

const maxEnemy = 25;

let enemies = [];
let objects = [];
let projectilesFriendly = [];
let projectilesUnfriendly = [];
let score = 0;
let enemyAmount = 0;
let enemyID = 0;
let projectileID = 0;
let juiceOn = false;

const scorePanel = document.getElementById('score');

class Manager extends Entity {
    gravity = .8;
    maxVerticalAcceleration = 25;

    constructor(position, size, screenSize) {
        super(position, size);
        this.screenSize = screenSize;
        this.maxEnemyAmount = 25;
        this.entities = {
            "player": new Player(new Vector(100, 399), new Vector(40, 40)),
            "block_0": new Entity(new Vector(-200, 500), new Vector(1200, 200), 2, 'block'),
            "block_1": new Entity(new Vector(-222, 350), new Vector(520, 40), 2, 'block'),
            "block_2": new Entity(new Vector(520, 350), new Vector(520, 40), 2, 'block'),
            "block_3": new Entity(new Vector(100, 200), new Vector(600, 40), 2, 'block'),
            "block_4": new Entity(new Vector(0, 50), new Vector(160, 40), 2, 'block'),
            "block_5": new Entity(new Vector(640, 50), new Vector(160, 40), 2, 'block'),
        };
    }

    update() {
        enemies = [];
        objects = [];
        projectilesFriendly = [];
        projectilesUnfriendly = [];

        for (let name in this.entities) {
            let entity = this.entities[name];
            if (entity.layer === 'object') objects.push(entity);
            if (entity.layer === 'enemy') enemies.push(entity);
            if (entity.layer === 'projectile' && entity.friendly) projectilesFriendly.push(entity);
            if (entity.layer === 'projectile' && !entity.friendly) projectilesUnfriendly.push(entity);

        }

        scorePanel.innerText = 'Score: ' + score;

        if (!juiceOn && score >= 10) this.startJuice();
    }

    allEnemies() {
        return enemies;
    }

    allObjects() {
        return objects;
    }

    allFriendlyProjectiles() {
        return projectilesFriendly;
    }

    allUnfriendlyProjectiles() {
        return projectilesUnfriendly;
    }

    worldGravity() {
        return this.gravity;
    }

    airResistance() {
        return this.maxVerticalAcceleration;
    }

    increaseScore() {
        score++;
    }

    currentScore() {
        return score;
    }

    currentEnemyAmount() {
        return enemyAmount;
    }

    currentEnemyID() {
        return enemyID;
    }

    currentProjectileID() {
        return projectileID;
    }

    increaseEnemyAmount() {
        enemyAmount++;
        enemyID++;
    }

    decreaseEnemyAmount() {
        enemyAmount--;
    }

    increaseProcetileID() {
        projectileID++;
    }

    startJuice() {
        juiceOn = true;
        let music = new Audio(sounds['juice']);
        music.play();
        setInterval(this.juice, 484000);
    }
}

const instance = new Manager(new Vector(0, 0), new Vector(0, 0), new Vector(800, 700))
Object.freeze(instance);

export default instance;