import manager from './manager.js';

const player = manager.entities['player'];

export function moveEntities() {
    player.move();

    for (let i = 0; i < manager.allEnemies().length; i++) {
        let enemy = manager.allEnemies()[i];
        if (enemy.isAlive()) enemy.move(enemy, player);
    }
}