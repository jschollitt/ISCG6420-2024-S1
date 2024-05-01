function drawFocused() {
    let canvas = document.getElementById("w7canvas3");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener("keydown", keyDown, true);
    canvas.addEventListener("keyup", keyUp, true);

    canvas.addEventListener("focus", () => {canvas.style.backgroundColor = "#99DD99";});
    canvas.addEventListener("blur", () => {canvas.style.backgroundColor = "#FFFFFF";});

    let rectX = 0;
    let rectY = 0;
    let offset = 1;

    let keyPressed = "none";
    draw();
    run();


    function keyDown(event) {
        event.preventDefault();
        keyPressed = event.key;
    }

    function keyUp() {
        keyPressed = "none";
    }

    function run() {
        update();
        draw();
        requestAnimationFrame(run);
    }

    function update() {
        switch (keyPressed) {
            case "ArrowLeft": //left
                rectX -= offset;
                break;
            case "ArrowUp": //up
                rectY -= offset;
                break;
            case "ArrowRight": //right
                rectX += offset;
                break;
            case "ArrowDown": //down
                rectY += offset;
                break;
            default:
                break;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "red";
        ctx.fillRect(rectX, rectY, 50, 50);
        ctx.fill();
    }
} 