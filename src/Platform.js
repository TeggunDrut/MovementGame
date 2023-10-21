class Platform {
    constructor(position, size, rotation) {
        this.position = position;
        this.size = size;
        this.rotation = rotation;
    }
    draw() {
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }
    update() {}
}
