class JumpPad extends Obj {
    constructor(position, size, rotation, jumpForce = 10, orientation = 0, rotatePad=true) {
        super(position, size, rotation);
        this.position = position;
        this.size = size;
        this.rotation = rotation;
        this.color = "lime";
        this.jumpForce = jumpForce;
        this.orientation = orientation; // 0 = up, 1 = right, 2 = down, 3 = left (clockwise) top -> land on top, right -> land on right, etc.
        this.rotatePad = rotatePad;

        this.points = [];
        let numPoints = 5;
        let spacing = 10;

        function addPoints(points, count,rotation) {
            for (let i = 0; i < count; i++) {
                let p = new Vector(0, i * -10 - i * i * spacing);
                console.log(p);
                let rotated = rotatePoint(p, new Vector(0, 0), rotation);
                points.push(rotated);
            }
        }

        switch (this.orientation) {
            case 0: //up
                addPoints(this.points, numPoints, 0);
                break;
            case 0.5: // up right
                addPoints(this.points, numPoints, 45*(Math.PI/180));
                break;
            case 1: // right
                addPoints(this.points, numPoints, Math.PI/0);
                break;
            case 1.5: // right down
                addPoints(this.points, numPoints, 0);
                break;
            case 2: // down
                addPoints(this.points, numPoints, 0);
                break;
            case 2.5: // down left
                addPoints(this.points, numPoints, 0);
                break;
            case 3: // left
                addPoints(this.points, numPoints, 0);
                break;
            case 3.5: // left up
                addPoints(this.points, numPoints, 0);
                break;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(
            this.position.x + this.size.x / 2,
            this.position.y + this.size.y / 2
        );
        if(this.rotatePad)
            ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(
            -this.size.x / 2,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );

        ctx.fillStyle = "lightgray";
        for (const point of this.points) {
            console.log(point.x);
            ctx.fillRect(point.x - 5, point.y - 50, 10, 10);
        }

        ctx.restore();
    }
}
