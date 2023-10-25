class JumpPad extends Obj {
    constructor(position, size, jumpForce = 10, orientation = 0, rotatePad=true) {
        super(position, size);
        this.position = position;
        this.size = size;
        this.color = "lime";
        this.jumpForce = jumpForce;
        this.orientation = orientation; // 0 = up, 1 = right, 2 = down, 3 = left (clockwise) top -> land on top, right -> land on right, etc.
        this.rotatePad = rotatePad;

        this.points = [];
        let numPoints = 5;
        let spacing = 10;

        let startingAngle = 90;
        function addPoints(points, count, degrees) {
            for (let i = 0; i < count; i++) {
                let p = new Vector(-i * i * spacing, 0);
                let rotated = rotatePoint(p, new Vector(0, 0), degrees + startingAngle);
                points.push(rotated);
            }
        }

        switch (this.orientation) {
            case 0: //up
                addPoints(this.points, numPoints, 0);
                break;
            case 0.5: // up right
                addPoints(this.points, numPoints, 45);
                break;
            case 1: // right
                addPoints(this.points, numPoints, 160);
                break;
            case 1.5: // right down
                addPoints(this.points, numPoints, 135);
                break;
            case 2: // down
                addPoints(this.points, numPoints, 180);
                break;
            case 2.5: // down left
                addPoints(this.points, numPoints, 225);
                break;
            case 3: // left
                addPoints(this.points, numPoints, 270);
                break;
            case 3.5: // left up
                addPoints(this.points, numPoints, 315);
                break;
        }
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
        // ctx.fillStyle = "lightgray";
        // for (const point of this.points) {
        //     ctx.fillRect(point.x - 5, point.y, 10, 10);
        // }

        ctx.restore();
    }
}
