class Player {
    constructor(spawnPos) {
        this.position = spawnPos.copy();
        this.velocity = new Vector(10, 0);
        this.size = new Vector(9 * 3, 16 * 3);
        this.jumping = false;
    }
    draw() {
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }
    update() {
        this.velocity.y += gravity;
        this.velocity.x *= friction;

        this.position.add(this.velocity);

        if (keys["d"]) {
            this.velocity.x += 1;
        }
        if (keys["a"]) {
            this.velocity.x -= 1;
        }

        if (keys[" "] && !this.jumping) {
            console.log("jump");
            this.jumping = true;
            this.velocity.y = -10;
        }

        this.checkCollision();
        for(const obj of objects) {
            let col = colCheck(this, obj);

            if(col === "l" && this.velocity.x < 0) {
                this.velocity.x = 0;
            }
            if(col === "r" && this.velocity.x > 0) {
                this.velocity.x = 0;
            }
            
            if(col === "b") {
                if(!this.jumping)
                    this.velocity.y = 0;
                this.jumping = false;   
            }
            if(col === "t") {
                this.velocity.y *= -0.2;
            }
        }
    }
    checkCollision() {
        // console.log(this.position.y + this.size.y, height);
        if (this.position.y + this.size.y > height) {
            // this.velocity.y *= -0.2;
            this.position.y = height - this.size.y;
            if (!this.jumping) {
                this.velocity.y = 0;
            }
            this.jumping = false;
        }
    }
}
