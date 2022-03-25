import manager from '../game/manager.js';
import { onCollision } from '../game/movement.js';
const player = manager.entities['player'];

class CollisionManager {
    checkCollision() {
        let objects = [];
        let enemies = [];

        for (let name in manager.entities) {
            let entity = manager.entities[name];
            if (entity.layer === 'object') objects.push(entity);
            if (entity.layer === 'enemy') enemies.push(entity);
        }

        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            if (CollisionManager.isTouching(player, object)) onCollision(object);
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