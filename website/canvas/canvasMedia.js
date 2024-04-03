function animateGradient() {
    const canvas = document.getElementById("w6canvas3");
    const ctx = canvas.getContext("2d");

    let halfWidth = 0.5 * canvas.width;
    let halfHeight = 0.5 * canvas.height;
    let radii = [
        10,
        halfHeight / 2,
        halfHeight
    ]
    let grow = true;
    
    let animation = setInterval(animate, 20);
    
    function animate() {
        update();
        draw();
    }

    function update() {
        if (grow) {
            radii[1]++;
        }
        else {
            radii[1]--;
        }

        if (radii[1] >= radii[2] - 1 || radii[1] <= radii[0] + 1) {
            grow = !grow;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let gradient = ctx.createRadialGradient(
            halfWidth, halfHeight, radii[0],
            halfWidth, halfHeight, radii[1]
        );
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "blue");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

animateGradient();

function animateImage() {
    const canvas = document.getElementById("w6canvas4");
    const ctx = canvas.getContext("2d");
    const img1 = document.getElementById("canvas4Img1");

    let x = 0;
    let y = 0;

    let animation = setInterval(animate, 20);
    
    function animate() {
        update();
        draw();
    }

    function update() {
        if (x + img1.width > canvas.width) {
            x--;
        }
        else {
            x = 0;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img1, x, y);
    }
}

animateImage();