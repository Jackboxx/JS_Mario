import manager from '../game/manager.js';

const player = manager.entities['player'];

class CollisionManager {
    checkCollision() {
        for (let i = 0; i < manager.allObjects().length; i++) {
            let object = manager.allObjects()[i];
            if (player.alive && CollisionManager.isTouching(player, object)) player.onCollision(object);

            for (let j = 0; j < manager.allEnemies().length; j++) {
                let enemy = manager.allEnemies()[j];
                if (CollisionManager.isTouching(enemy, object)) {
                    enemy.onCollision(object);
                }
            }
        }

        for (let i = 0; i < manager.allEnemies().length; i++) {
            let enemy = manager.allEnemies()[i];
            for (let j = 0; j < manager.allFriendlyProjectiles().length; j++) {
                let projectile = manager.allFriendlyProjectiles()[j];
                if (enemy.alive && CollisionManager.isTouching(enemy, projectile)) {
                    enemy.die();
                    projectile.impact();
                    break;
                }
            }

            if (player.alive && enemy.alive && CollisionManager.isTouching(player, enemy)) player.onEnemyCollision(enemy);
        }

        for (let i = 0; i < manager.allFriendlyProjectiles().length; i++) {
            let projectile = manager.allFriendlyProjectiles()[i];

            if (projectile.canCollide && !projectile.impacted) {
                for (let j = 0; j < manager.allObjects().length; j++) {
                    let object = manager.allObjects()[j];
                    if (CollisionManager.isTouching(projectile, object)) {
                        projectile.impact();
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < manager.allUnfriendlyProjectiles().length; i++) {
            let projectile = manager.allUnfriendlyProjectiles()[i];
            if (player.alive && CollisionManager.isTouching(player, projectile)) {
                player.die();
                projectile.impact();
                break;
            }

            if (projectile.canCollide && !projectile.impacted) {
                for (let j = 0; j < manager.allObjects().length; j++) {
                    let object = manager.allObjects()[j];
                    if (CollisionManager.isTouching(projectile, object)) {
                        impact();
                        break;
                    }
                }
            }
        }
    }

    static isTouching(self, other) {
        return self.position.x < other.position.x + other.size.x &&
            self.position.x + self.size.x > other.position.x &&
            self.position.y < other.position.y + other.size.y &&
            self.position.y + self.size.y > other.position.y;
    }

    static above(self, other) {
        return self.position.y < other.position.y && self.position.y + self.size.y > other.position.y
    }

    static below(self, other) {
        return self.position.y + self.size.y > other.position.y + other.size.y && self.position.y < other.position.y + other.size.y
    }

    static left(self, other) {
        return self.position.x < other.position.x && self.position.x + self.size.x > other.position.x;
    }

    static right(self, other) {
        return self.position.x > other.position.x && self.position.x < other.position.x + other.size.x;
    }
}

export { CollisionManager };