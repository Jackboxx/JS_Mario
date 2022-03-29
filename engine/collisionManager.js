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
                    enemy.onCollision(enemy, object);
                }
            }
        }

        for (let i = 0; i < manager.allEnemies().length; i++) {
            let enemy = manager.allEnemies()[i];
            if (CollisionManager.isTouching(player, enemy)) player.onEnemyCollision(enemy);
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