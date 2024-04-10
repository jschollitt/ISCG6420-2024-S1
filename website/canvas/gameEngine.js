function gameEngine() {
    let canvas = document.getElementById("w7canvas6");
    let context = canvas.getContext('2d');

    let secondsPassed = 0;
    let oldTimeStamp = 0;
    let fps = 0;

    let squaresize = 100;
    let squares = new Array();
    let circles = new Array();

    canvas.addEventListener("mousedown", function (e) { doMouseDown(e) }, false);
    canvas.addEventListener("keydown", function (e) { doKeyDown(e) }, false);

    window.requestAnimationFrame(gameLoop);

    function gameLoop(timeStamp) {

        // Calculate the number of seconds passed since the last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        // Calculate fps
        fps = Math.round(1 / secondsPassed);
        update(secondsPassed);
        // Perform the drawing operation
        draw();

        // The loop function has reached it's end. Request a new frame
        window.requestAnimationFrame(gameLoop);
    }

    function update(secondsPassed) {
        checkCollisions();
        for (var i = 0; i < squares.length; i++) {
            (squares[i]).update(secondsPassed);
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        for (var i = 0; i < squares.length; i++) {
            squares[i].draw(context);
        }

        for (var i = 0; i < circles.length; i++) {
            circles[i].draw(context);
        }

        // Draw FPS counter to the screen
        context.fillStyle = 'white';
        context.fillRect(0, 0, 120, 50);
        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.fillText("FPS: " + fps, 10, 30);
        /////////////////////////////////
    }

    function doMouseDown(event) {
        console.log(this);
        switch (event.button) {
            case 0:
                squares.push(
                    new Square(
                        null,
                        getX(event),
                        getY(event),
                        getRandomInRange(-50, 50),
                        getRandomInRange(-50, 50),
                        squaresize,
                        squaresize
                    )
                )
                console.log(squares);
                break;

            default:
                circles.push(
                    new Circle(
                        null,
                        getX(event),
                        getY(event),
                        getRandomInRange(-50, 50),
                        getRandomInRange(-50, 50),
                        squaresize / 2
                    )
                )
                break;
        }
    }

    function doKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                // call method for up action
                break;
            case "ArrowDown":
                // call method for down action
                break;
            default:
                // default action, fallback
                break;
        }
    }

    function checkCollisions() {
        for (var i = 0; i < squares.length; i++) {
            // for each square, check the wall overlaps
            checkWallCollisions(squares[i]);
            // for each square, check for overlaps with other squares
            checkObjectCollisions(squares[i], i);
        }

        // for (var i = 0; i < circles.length; i++) {
        //     // for each square, check the wall overlaps
        //     checkWallCollisions(circles[i]);
        //     // for each square, check for overlaps with other squares
        //     checkObjectCollisions(circles[i], i);
        // }

    }

    function checkWallCollisions(object) {
        
        
        // check right and left wall overlap
        if (object.getRight() >= canvas.clientWidth) {
            object.vx = -object.vx;
            object.x = canvas.clientWidth - object.width - 1;
        }
        else if (object.x <= 0) {
            object.vx = -object.vx;
            object.x = 1;
        }

        // check bottom and top wall overlap
        if (object.getBottom() >= canvas.clientHeight) {
            object.vy = -object.vy;
            object.y = canvas.clientHeight - object.height - 1;;
        }
        else if (object.y <= 0) {
            object.vy = -object.vy;
            object.y = 1;
        }
    }

    function checkObjectCollisions(object, index) {
        // check parameter square against all other squares
        for (let i = 0; i < squares.length; i++) {
            if (object !== squares[i]) {
                let isCol = rectIntersect(
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    squares[i].x,
                    squares[i].y,
                    squares[i].width,
                    squares[i].height
                );
                object.isColliding = isCol;
                if (isCol) {
                    (squares[i]).isColliding = isCol;
                    break;
                }
            }
        }

        // check parameter square against all other squares
        for (let i = 0; i < circles.length; i++) {
            if (object !== circles[i]) {
                let isCol = circleIntersect(
                    object.x,
                    object.y,
                    object.width,
                    squares[i].x,
                    squares[i].y,
                    squares[i].width
                );
                object.isColliding = isCol;
                if (isCol) {
                    (squares[i]).isColliding = isCol;
                    break;
                }
            }
        }
    }

    function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }

    function circleIntersect(x1, y1, r1, x2, y2, r2) {
        const distanceX = x1 - x2;
        const distanceY = y1 - y2;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < r1 + r2) {
            return true;
        }
        return false;
    }

    function getX(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientX - rect.left;
    }

    function getY(event) {
        var rect = canvas.getBoundingClientRect();
        return event.clientY - rect.top;
    }

    function getRandomInRange(min, max) {
        return Math.random() * (Math.abs(min) + max) + min;
    }
}