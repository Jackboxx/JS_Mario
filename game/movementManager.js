import manager from './manager.js';

const player = manager.entities['player'];

export function moveEntities() {
    if (player.alive) player.move();

    for (let i = 0; i < manager.allEnemies().length; i++) {
        let enemy = manager.allEnemies()[i];
        if (enemy.alive) enemy.move(player);
    }

    for (let i = 0; i < manager.allFriendlyProjectiles().length; i++) {
        let projectile = manager.allFriendlyProjectiles()[i];
        if (!projectile.impacted) projectile.travel();
    }

    for (let i = 0; i < manager.allUnfriendlyProjectiles().length; i++) {
        let projectile = manager.allUnfriendlyProjectiles()[i];
        projectile.travel();
    }
}