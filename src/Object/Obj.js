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
        ctx.translate(
            (this.position.x * cellSize.x) + this.size.x * cellSize.x,
            (this.position.y * cellSize.y) + this.size.y * cellSize.y,
        );
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -this.size.x * cellSize.x,
            -this.size.y * cellSize.y,
            this.size.x * cellSize.x,
            this.size.y * cellSize.y
        );
        ctx.restore();
    }
    update(camera) {
        // this.position.x = this.oposition.x - camera.position.x;
        // this.position.y = this.oposition.y - camera.y;
    }
}
