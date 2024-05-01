face();

function face() {
    let canvas = document.getElementById("w6canvas7");
    let ctx = canvas.getContext("2d");

    let x = 15;
    let y = 15;
    let xAdd = 3;
    let yAdd = 1;

    // Grey background
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(50, 50, 400, 400);

    // Head
    ctx.beginPath();
    ctx.arc(250, 250, 100, 0, Math.PI * 2, true);
    ctx.fillStyle = "rgb(255, 154, 145";
    ctx.fill();
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Left eye
    ctx.beginPath();
    ctx.arc(220, 240, 40, 30, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.arc(290, 240, 40, 30, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // Left iris
    ctx.beginPath();
    ctx.arc(225, 240, 5, 30, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Right iris
    ctx.beginPath();
    ctx.arc(285, 240, 5, 30, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 310, 20, Math.PI, 0, true);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.stroke();

    function moveEyes() {
        x += xAdd;
        y += yAdd;
        if (x > 20 || x < 0) xAdd = -xAdd;
        if (y > 20 || x < 0) yAdd = -yAdd;
        x += xAdd;
        y += yAdd;
        doEyes(x, y);
    }

    function doEyes(x, y) {

        // draw 2 black circles
        ctx.beginPath();
        ctx.arc(220, 240, 40, 30, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(290, 240, 40, 30, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();

        // draw 2 blue circles
        ctx.beginPath();
        ctx.arc(225 + x, 240 + y, 5, 30, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(285 + x, 240 + y, 5, 30, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }
    setInterval(moveEyes, 200);
}