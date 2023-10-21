let p;
let objects = [];

function init() {
    p = new Player(new Vector(0, 0));
    objects.push(new Platform(
            new Vector(200, height - 30), 
            new Vector(30, 30)
        )
    );
    objects.push(new Platform(
            new Vector(400, height - 30), 
            new Vector(30, 30)
        )
    );
    objects.push(new Platform(
            new Vector(600, height - 30), 
            new Vector(30, 30)
        )
    );
    objects.push(
        new Platform(new Vector(700, height - 100), new Vector(30, 60))
    );

    requestAnimationFrame(render);
}
function render() {
    requestAnimationFrame(render);

    ctx.clearRect(0, 0, width, height);
    p.update();
    p.draw();

    objects.forEach((obj) => {
        obj.update();
        obj.draw();
    });
}
