window.onload = init;

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key.toLocaleLowerCase() === "control") {
        e.preventDefault();
    }
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = false;
});

window.onresize = function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    level.size.x = width + 200;
    level.size.y = height;
    cellSize = new Vector(level.size.x / (16 * scale), level.size.y / (9 * scale));
    maxCells = new Vector(
        level.size.x / (level.size.x / (16 * scale)),
        level.size.y / (level.size.y / (9 * scale))
    );
    camera.size.x = width;
    camera.size.y = height;
};
