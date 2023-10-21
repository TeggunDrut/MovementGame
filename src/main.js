let p;
let objects = [];

function init() {
    p = new Player(new Vector(0, 0));
    objects.push(new Platform(
            new Vector(200, height - 90), 
            new Vector(30, 30)
        )
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
