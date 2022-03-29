import manager from './manager.js';

const player = manager.entities['player'];

//a bit wastfull
export function update() {
    let enemies = [];

    for (let name in manager.entities) {
        let entity = manager.entities[name];
        if (entity.layer === 'enemy') enemies.push(entity);
    }

    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        enemy.move(enemy, player);
    }
}