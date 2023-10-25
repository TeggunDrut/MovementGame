class Level {
    constructor(size, objects=[]) {
        this.size = size;
        if (this.objects == undefined) this.objects = [];
        else this.objects = objects;

        this.drawGrid = false;
    }
    draw() {
        if(this.drawGrid) {
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 1;
            for (let x = 0; x < this.size.x; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, this.size.y);
                ctx.stroke();
            }
            for (let y = 0; y < this.size.y; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(this.size.x, y);
                ctx.stroke();
            }
        }

        for (const obj of this.objects) {
            obj.draw();
        }
    }
    update() {
        for (const obj of this.objects) {
            obj.update(camera);
        }
    }
    add(obj) {
        this.objects.push(obj);
    }
}
