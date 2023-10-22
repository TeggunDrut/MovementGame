class Slope extends Obj {
    constructor(position, rotation, p1, p2, p3) {
        super(position, rotation);
        this.position = position;
        this.rotation = rotation;
        this.points = [p1, p2, p3];
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (const point of this.points) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    update() {
        // const AB = dist(
        //     this.points[0].x,
        //     this.points[0].y,
        //     this.points[1].x,
        //     this.points[1].y
        // );
        // const BC = dist(
        //     this.points[1].x,
        //     this.points[1].y,
        //     this.points[2].x,
        //     this.points[2].y
        // );
        // const AC = dist(
        //     this.points[0].x,
        //     this.points[0].y,
        //     this.points[2].x,
        //     this.points[2].y
        // );

        // let angleRad = Math.cos(BC / AC);
        // let angleDeg = angleRad * 180 / Math.PI;
        
        // objects[3].rotation = -0.690178904494;

        // const normalVec = new Vector(
        //     Math.cos(angleRad) - ,
        //     Math.sin(angleRad)
        // );

    }
}
