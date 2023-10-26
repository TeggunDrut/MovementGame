class Player {
    constructor(spawnPos) {
        this.oposition = spawnPos.copy();
        this.position = spawnPos.copy();
        this.velocity = new Vector(10, 0);
        this.size = new Vector(32, 9*7);
        this.osize = new Vector(64, 27);

        this.controlsEnables = true;

        this.grounded = false;
        this.jumping = false;

        this.sliding = false;
        this.slidePower = 10;
        this.canSlide = true;
        this.slideSpeed = 20;
        this.slideDuration = 30;
        this.slideTimer = 0;

        this.canCrouch = true;
        this.crouchSpeed = 40;
        this.crouchDuration = 30;
        this.crouchTimer = 0;
        this.crouching = false;

        this.wallRunning = false;

        this.facing = 0; // 0 - left, 1 - right
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
        let faceSize = 20;
        if (this.facing)
            ctx.fillRect(
                this.position.x + this.size.x - faceSize/2,
                this.position.y + faceSize/2,
                faceSize,
                faceSize
            );
        else if (!this.facing)
            ctx.fillRect(this.position.x - faceSize/2, this.position.y + faceSize/2, 20, 20);
    }
    async update() {
        // this.size.x = cellSize.x;
        // this.size.y = cellSize.y * 2;
        this.velocity.y += gravity;
        if (!this.grounded) this.velocity.x *= airFriction;
        else this.velocity.x *= groundFriction;

        this.position.add(this.velocity);

        if (keys["d"]) {
            this.velocity.x += 1;
            this.facing = 1;
        }
        if (keys["a"]) {
            this.velocity.x -= 1;
            this.facing = 0;
        }

        if (keys[" "] && !this.jumping) {
            // if ((this.wallRunning === "right")) {
            //     this.velocity.x -= 12;
            // } else if ((this.wallRunning === "left")) this.velocity.x += 12;
            // else {
            this.jumping = true;
            this.velocity.y = -12;
            this.grounded = false;
            // }
            // this.wallRunning = false;
        }

        if (keys["shift"] && this.canSlide) {
            if (!this.sliding && !this.crouching) {
                this.sliding = true;
                if (this.velocity.x < 0) this.velocity.x -= this.slidePower;
                else this.velocity.x += this.slidePower;
                this.canSlide = false;
                groundFriction = 0.94;
                let intervalDown =
                    (this.osize.y - this.osize.y * 0.75) / this.slideDuration;
                let downTimer = new Timer(
                    0,
                    this.slideDuration,
                    () => {
                        this.size.y -= intervalDown;
                    },
                    () => {
                        groundFriction = 0.9;
                    }
                );
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

        if (keys["control"] && this.canCrouch) {
            if (!this.crouching && !this.sliding) {
                let intervalDown =
                    (this.osize.y - this.osize.y * 0.75) / this.crouchDuration;
                let downTimer = new Timer(0, this.crouchDuration, () => {
                    this.size.y -= intervalDown;
                });
                this.crouching = true;
                this.canCrouch = false;
            }
        }

        if (keys["control"] === false && this.crouching) {
            this.crouching = false;
            let cooldown = new Timer(
                0,
                250,
                () => {},
                () => {
                    this.canCrouch = true;
                }
            );

            let intervalUp =
                (this.osize.y - this.osize.y * 0.75) / this.crouchSpeed;
            let upTimer = new Timer(0, this.crouchSpeed, () => {
                this.size.y += intervalUp;
            });
        }

        this.checkCollision();
        for (const obj of level.objects) {
            let col;
            let newObj = {
                position: new Vector(
                    obj.position.x * cellSize.x,
                    obj.position.y * cellSize.y
                ),
                size: new Vector(
                    obj.size.x * cellSize.x,
                    obj.size.y * cellSize.y
                ),
            };
            if (obj instanceof Slope) continue;
            if (obj instanceof Platform) col = colCheck(this, newObj);
            if (obj instanceof JumpPad) {col = colCheck(this, newObj, false);}
            if (col === null) continue;

            if (obj instanceof JumpPad) {
                switch (obj.orientation) {
                    case 0:
                        this.velocity.y = -obj.jumpForce;
                        break;
                    case 0.5:
                        this.velocity.y = -obj.jumpForce;
                        this.velocity.x = obj.jumpForce;
                        this.facing = 1;
                        break;
                    case 1:
                        this.velocity.x = obj.jumpForce;
                        this.facing = 1;
                        break;
                    case 1.5:
                        this.velocity.y = obj.jumpForce;
                        this.velocity.x = obj.jumpForce;
                        this.facing = 1;
                        break;
                    case 2:
                        this.velocity.y = obj.jumpForce;
                        break;
                    case 2.5:
                        this.velocity.y = obj.jumpForce;
                        this.velocity.x = -obj.jumpForce;
                        this.facing = 0;
                        break;
                    case 3:
                        this.velocity.x = -obj.jumpForce;
                        this.facing = 0;
                        break;
                    case 3.5:
                        this.velocity.y = -obj.jumpForce;
                        this.velocity.x = -obj.jumpForce;
                        this.facing = 0;
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
                this.wallRunning = false;
                this.grounded = true;
            }
            if (col === "t") {
                this.velocity.y *= -0.2;
                this.wallRunning = false;
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
        if (camera.position.x > level.size.x - camera.size.x) {
            camera.position.x = level.size.x - camera.size.x;
        }
    }
    checkCollision() {
        // if (this.position.y + this.size.y > height) {
        //     this.position.y = height - this.size.y;
        //     if (!this.jumping) {
        //         this.velocity.y = 0;
        //     }
        //     this.jumping = false;
        //     this.grounded = true;
        // }
        if (this.position.x < 0) {
            this.velocity.x = 0;
            this.position.x = 0;
        }
        if (this.position.x + this.size.x > level.size.x) {
            this.velocity.x = 0;
            this.position.x = level.size.x - this.size.x;
        }
    }
}
