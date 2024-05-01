let canvas = document.getElementById("w6canvas9");
let ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", click, false);

function click(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = "#ff8080";
    ctx.fill();
}