class Obj {
    constructor(position, size, rotation) {
        this.oposition = position.copy();
        this.position = position.copy();
        this.size = size;
        this.rotation = rotation;

        this.color = "black";
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        ctx.restore();
    }
    update(camera) {
        // this.position.x = this.oposition.x - camera.position.x;
        // this.position.y = this.oposition.y - camera.y;
    }
}
