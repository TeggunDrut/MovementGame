let p;

function makeObject(type, x, y, w, h, force=10, orientation=0, rotatePad=false) {
    switch(type) {
        case Platform:
            level.add(new Platform(new Vector(x, y), new Vector(w, h), 0));
            break;
        case JumpPad:
            level.add(new JumpPad(new Vector(x, y), new Vector(w, h), force, orientation, rotatePad));
            break;
    }
}

function init() {
    p = new Player(new Vector(0, 0));
    makeObject(Platform, 10, 26, 10, 1);
    makeObject(Platform, 20, 25, 5, 2);
    makeObject(JumpPad, 1, 25, 1, 0.25, 20, 0, false);
    makeObject(JumpPad, 2, 20, 1, 0.25, 20, 0, false);
    makeObject(JumpPad, 1, 15, 1, 0.25, 20, 0, false);
    
    // make floor so player doesnt fall forever
    makeObject(Platform, 0, maxCells.y, maxCells.x, 1);

    requestAnimationFrame(render);
}
function render() {
    requestAnimationFrame(render);
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);
    ctx.clearRect(0, 0, level.size.x, level.size.y);

    level.update();
    level.draw();

    p.update();
    p.draw();

    ctx.restore();

    camera.position.y = p.position.y - camera.size.y / 2;

    if (camera.position.y < 0) camera.position.y = 0;

    if (camera.position.y > level.size.y - camera.size.y)
        camera.position.y = level.size.y - camera.size.y;
}
