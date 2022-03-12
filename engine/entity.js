export class Entity {
    constructor(position, size, sprite) {
        this.position = position;
        this.size = size;
        this.sprite = new Image;
        this.sprite.src = sprite;
        this.exists = true;
    }

    get getPosition() {
        return this.position;
    }

    get getSize() {
        return this.size;
    }

    get getCurrentSprite() {
        return this.sprite;
    }

    remove() {
        this.exists = false;
    }

    setPosition(position) {
        this.position = position;
    }

    addPosition(term) {
        this.position.add(term);
    }

    isTouching(otherPosition, otherSize) {
        return this.position.x < otherPosition.x + otherSize.x &&
            this.position.x + this.size.x > otherPosition.x &&
            this.position.y < otherPosition.y + otherSize.y &&
            this.position.y + this.size.y > otherPosition.y;
    }
}