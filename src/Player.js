class Player {
    constructor(spawnPos) {
        this.position = spawnPos.copy();
        this.velocity = new Vector(10, 0);
        this.size = new Vector(9 * 3, 16 * 3);
        this.osize = new Vector(9 * 3, 16 * 3);

        this.jumping = false;
        this.sliding = false;
        this.slideSpeed = 20;
        this.slideDuration = 50;
        this.slideTimer = 0;
    }
    draw() {
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }
    async update() {
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

        if (keys["shift"]) {
            if (!this.sliding) {
                this.sliding = true;
                let intervalDown =
                    (this.osize.y - this.osize.y * 0.75) / this.slideDuration;
                let downTimer = new Timer(0, this.slideDuration, () => {
                    this.size.y -= intervalDown;
                });
            }
        }
        if(keys["shift"] == false && this.sliding) {
            this.sliding = false;
            let intervalUp =
                (this.osize.y - this.osize.y * 0.75) / this.slideSpeed;
            let upTimer = new Timer(0, this.slideSpeed, () => {
                this.size.y += intervalUp;
            });
        }

        // if (keys["shift"] && !this.sliding) {
        //     this.sliding = true;
        // let intervalDown =
        //     (this.osize.y - this.osize.y * 0.75) / this.slideDuration;
        //     let intervalUp =
        //         (this.osize.y - this.osize.y * 0.75) / this.slideSpeed;

        //     let downTimer = new Timer(
        //         0,
        //         this.slideDuration,
        //         () => {
        //             this.size.y -= intervalDown;
        //         },
        //         () => {
        //             let upTimer = new Timer(
        //                 0,
        //                 this.slideSpeed,
        //                 () => {
        //                     this.size.y += intervalUp;
        //                 },
        //                 () => {
        //                     this.sliding = false;
        //                 }
        //             );
        //         }
        //     );
        // }

        this.checkCollision();
        for (const obj of objects) {
            let col = colCheck(this, obj);

            if (col === "l" && this.velocity.x < 0) {
                this.velocity.x = 0;
            }
            if (col === "r" && this.velocity.x > 0) {
                this.velocity.x = 0;
            }

            if (col === "b") {
                if (!this.jumping) this.velocity.y = 0;
                this.jumping = false;
            }
            if (col === "t") {
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
