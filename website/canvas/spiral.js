function drawSpiral() {
    const canvas = document.getElementById("w6canvas6");
    const ctx = canvas.getContext("2d");
    let x = 0;
    let y = 0;
    let radius = 10;
    let radiusOffset = 0.2;
    let arcStart = 0;
    let arcFinish = 0.05 * Math.PI;
    let arcOffset = 0.05;
    
    let spiral = setInterval(draw, 20);
    
    function draw() {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "magenta";
        ctx.arc(400, 200, radius, arcStart, arcFinish, false);
        ctx.stroke();
    
        radius = radius + radiusOffset;
        arcStart = arcStart + arcOffset;
        arcFinish = arcFinish + arcOffset;
        
        if (radius > 600) {
            clearInterval(spiral);
        }
    }
}

drawSpiral();