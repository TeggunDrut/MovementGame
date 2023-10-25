window.onload = init;

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey) {
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
