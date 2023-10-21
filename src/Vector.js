class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    mult(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
    }
    div(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    copy() {
        return this;
    }
}
