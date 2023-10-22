class Player {
    constructor(spawnPos) {
        this.oposition = spawnPos.copy();
        this.position = spawnPos.copy();
        this.velocity = new Vector(10, 0);
        this.size = new Vector(9 * 3, 16 * 3);
        this.osize = new Vector(9 * 3, 16 * 3);

        this.controlsEnables = true;

        this.jumping = false;
        this.sliding = false;
        this.canSlide = true;
        this.slideSpeed = 20;
        this.slideDuration = 50;
        this.slideTimer = 0;
    }
    draw() {
        ctx.fillStyle = "black";
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
                this.jumping = true;
                this.velocity.y = -12;
            }

            if (keys["shift"] && this.canSlide) {
                if (!this.sliding) {
                    this.sliding = true;
                    this.velocity.x *= 1.5;
                    this.canSlide = false;

                    let intervalDown =
                        (this.osize.y - this.osize.y * 0.75) /
                        this.slideDuration;
                    let downTimer = new Timer(0, this.slideDuration, () => {
                        this.size.y -= intervalDown;
                    });
                }
            }
            if (keys["shift"] == false && this.sliding) {
                this.sliding = false;
                let cooldown = new Timer(
                    0,
                    250,
                    () => {},
                    () => {
                        this.canSlide = true;
                    }
                );

                let intervalUp =
                    (this.osize.y - this.osize.y * 0.75) / this.slideSpeed;
                let upTimer = new Timer(0, this.slideSpeed, () => {
                    this.size.y += intervalUp;
                });
            }

        this.checkCollision();
        for (const obj of l.objects) {
            let col;

            if (obj instanceof Slope) continue;
            if (obj instanceof Platform) col = colCheck(this, obj);
            else if (obj instanceof JumpPad) {
                col = colCheck(this, obj, false);
            } else col = colCheck(this, obj);

            if (col === null) continue;

            if (obj instanceof JumpPad) {
                switch (obj.orientation) {
                    case 0:
                        this.velocity.y = -obj.jumpForce;
                        break;
                    case 0.5:
                        this.velocity.y = -obj.jumpForce;
                        this.velocity.x = obj.jumpForce;
                        break;
                    case 1:
                        this.velocity.x = obj.jumpForce;
                        break;
                    case 1.5:
                        this.velocity.y = obj.jumpForce;
                        this.velocity.x = obj.jumpForce;
                        break;
                    case 2:
                        this.velocity.y = obj.jumpForce;
                        break;
                    case 2.5:
                        this.velocity.y = obj.jumpForce;
                        this.velocity.x = -obj.jumpForce;
                        break;
                    case 3:
                        this.velocity.x = -obj.jumpForce;
                        break;
                    case 3.5:
                        this.velocity.y = -obj.jumpForce;
                        this.velocity.x = -obj.jumpForce;
                        break;
                }
                continue;
            }

            if (col === "l" && this.velocity.x < 0) {
                this.velocity.x = 0;
            }
            if (col === "r" && this.velocity.x > 0) {
                this.velocity.x = 0;
            }

            if (col === "b") {
                if (!this.jumping) {
                    this.velocity.y = 0;
                }
                this.jumping = false;
            }
            if (col === "t") {
                this.velocity.y *= -0.2;
            }
        }

        if (this.position.x > camera.position.x + camera.size.x / 2) {
            camera.position.x = this.position.x - camera.size.x / 2;
        }
        if (this.position.x < camera.position.x + camera.size.x / 2) {
            camera.position.x = this.position.x - camera.size.x / 2;
        }
        if (camera.position.x < 0) {
            camera.position.x = 0;
        }
        if (camera.position.x > l.size.x - camera.size.x) {
            camera.position.x = l.size.x - camera.size.x;
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
