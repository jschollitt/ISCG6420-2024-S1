// Canvas code isolated into functions to separate context.

// Call functions to run code.
outlineShapes();
fillShapes();

function outlineShapes() {
    let canvas = document.getElementById("w6canvas1");
    let ctx = canvas.getContext("2d");

    // Draw a line
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(390, 10);
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw a square
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.rect(10, 20, 50, 100);
    ctx.stroke();

    // Draw a triangle
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(100, 20);
    ctx.lineTo(250, 20);
    ctx.lineTo(175, 100);
    ctx.lineTo(100, 20);
    ctx.stroke();

    // Draw a circle
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();

    // Draw Pacman
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.arc(350, 225, 50, -1, 1, true);
    ctx.lineTo(350, 225);
    ctx.closePath();
    ctx.stroke();

    // Draw a checkmark
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(20, 200);
    ctx.quadraticCurveTo(0, 300, 200, 200);
    ctx.quadraticCurveTo(-50, 360, 20, 200);
    ctx.stroke();
}


function fillShapes() {
    canvas = document.getElementById("w6canvas2");
    ctx = canvas.getContext("2d");

    // Draw a line
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(390, 10);
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw a square
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(10, 20, 50, 100);
    ctx.fill();

    // Draw a triangle
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(100, 20);
    ctx.lineTo(250, 20);
    ctx.lineTo(175, 100);
    ctx.lineTo(100, 20);
    ctx.fill();

    // Draw a circle
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(300, 100, 50, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();

    // Draw Pacman
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(350, 225, 50, -1, 1, true);
    ctx.lineTo(350, 225);
    ctx.closePath();
    ctx.fill();

    // Draw a checkmark
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(20, 200);
    ctx.quadraticCurveTo(0, 300, 200, 200);
    ctx.quadraticCurveTo(-50, 360, 20, 200);
    ctx.fill();
}

