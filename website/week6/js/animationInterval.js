function slindingSquare() {
    const canvas = document.getElementById("w6canvas5");
    const ctx = canvas.getContext("2d");
    let x = -50;
    let y = 0;


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(x, y, 50, 50);
        ctx.fill();
        x++;

        if (x > canvas.width) {
            x = -50;
        }
    }

    setInterval(draw, 16);
}

slindingSquare();