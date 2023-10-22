class JumpPad extends Obj {
    constructor(position, size, rotation, jumpForce = 10, orientation = 0) {
        super(position, size, rotation);
        this.position = position;
        this.size = size;
        this.rotation = rotation;
        this.color = "lime";
        this.jumpForce = jumpForce;
        this.orientation = orientation; // 0 = up, 1 = right, 2 = down, 3 = left (clockwise) top -> land on top, right -> land on right, etc.
    }
}
