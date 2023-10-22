let p;

function makePlatform(x, y, w, h) {
    l.add(new Platform(new Vector(x, y), new Vector(w, h)));
}

function init() {
    p = new Player(new Vector(0, 0));
    l.add(new Platform(new Vector(200, height - 30), new Vector(300, 30)));
    l.add(new Platform(new Vector(500, height - 60), new Vector(600, 60)));
    makePlatform(1500, height - 90, 600, 90);
    l.add(
        new JumpPad(new Vector(1310, height - 5), new Vector(30, 10), 0, 20, 0)
    );
    l.add(
        
        new JumpPad(new Vector(2230, height - 5), new Vector(30, 10), Math.PI/2, 20, 0)
    );
    

    // l.add(new Platform(new Vector(700, height - 100), new Vector(30, 60)));
    // l.add(
    //     new JumpPad(new Vector(610, height - 120), new Vector(30, 10), 0, 20, 0)
    // );

    requestAnimationFrame(render);
}
function render() {
    requestAnimationFrame(render);
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);
    ctx.clearRect(0, 0, l.size.x, l.size.y);
    p.update();
    p.draw();

    l.update();
    l.draw();

    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 2;
    // ctx.strokeRect(
    //     camera.position.x,
    //     camera.position.y,
    //     camera.size.x,
    //     camera.size.y
    // );
    ctx.restore();

    // keep the player in the center while the camera moves

    

    // if (p.position.y > camera.position.y + camera.size.y / 2) {
    //     camera.position.y = p.position.y - camera.size.y / 2;
    // }
    // if (p.position.y < camera.position.y + camera.size.y / 2) {
    //     camera.position.y = p.position.y - camera.size.y / 2;
    // }
    if (camera.position.y < 0) camera.position.y = 0;

    if (camera.position.y > l.size.y - camera.size.y)
        camera.position.y = l.size.y - camera.size.y;
}