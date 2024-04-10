function drawOnMouseEvent() {
    let canvas = document.getElementById("w7canvas4");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", click, false);

    function click(event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        draw(x, y);
    }

    function draw(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = "#ff8080";
        ctx.fill();
    }
}

function followCursor() {
    let canvas = document.getElementById("w7canvas5");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", doMouseMove);
    canvas.addEventListener("wheel", doScroll);
    
    let x = 0;
    let y = 0;
    let radius = 25;
    let colour = "#00FF00";

    run();

    function doMouseMove(event) {
        let rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    function doScroll(event) {
        event.preventDefault();

        radius += event.deltaY * 0.05;
        radius = Math.min(Math.max(radius, 10), 200);
    }

    function run() {
        draw();
        requestAnimationFrame(run);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
} 