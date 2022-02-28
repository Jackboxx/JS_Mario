export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get zero() {
        return new Vector(0, 0);
    }

    static get right() {
        return new Vector(1, 0);
    }
    static get left() {
        return new Vector(-1, 0);
    }
    static get up() {
        return new Vector(0, 1);
    }
    static get down() {
        return new Vector(0, -1);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalised() {
        return new Vector(this.x / this.length, this.y / this.length);
    }

    scaled(scaler) {
        return new Vector(this.x * scaler, this.y * scaler);
    }

    normalise() {
        this.x /= this.length;
        this.y /= this.length;
    }

    scale(scaler) {
        this.x *= scaler;
        this.y *= scaler;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return new this;
    }

    angleBetween(vector) {
        let theta = (this.x * vector.x + this.y * vector.y) / (this.length * vector.length);
        return (Math.acos(theta) * 180) / Math.PI;
    }
}