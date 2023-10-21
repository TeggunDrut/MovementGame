window.onload = init;

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
    // console.log(e.key);
});
document.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = false;
});
