class GameEngine {

    constructor(canvas, window) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.window = window;
        
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.fps = 0;
        
        this.squaresize = 100;
        this.squares = new Array();
        
        this.gameLoop = this.gameLoop.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.doMouseDown = this.doMouseDown.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
        this.checkCollisions = this.checkCollisions.bind(this);
        this.checkWallCollisions = this.checkWallCollisions.bind(this);
        this.checkObjectCollisions = this.checkObjectCollisions.bind(this);
        this.rectIntersect = this.rectIntersect.bind(this);
        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.getRandomInRange = this.getRandomInRange.bind(this);
        
        var temp = this;
        this.canvas.addEventListener("mousedown", function(e){temp.doMouseDown(e)}, false);
        this.canvas.addEventListener("keydown", function(e){temp.doKeyDown(e)}, false);
        
        this.window.requestAnimationFrame(this.gameLoop);
    }

    gameLoop(timeStamp) {

        // Calculate the number of seconds passed since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Calculate fps
        this.fps = Math.round(1 / this.secondsPassed);
        this.update(this.secondsPassed);
        // Perform the drawing operation
        this.draw();

        // The loop function has reached it's end. Request a new frame
        this.window.requestAnimationFrame(this.gameLoop);
    }

    update(secondsPassed) {
        this.checkCollisions();
        for (var i = 0; i < this.squares.length; i++) {
            (this.squares[i]).update(secondsPassed);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].draw(this.context);
        }

        // Draw FPS counter to the screen
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, 120, 50);
        this.context.font = '25px Arial';
        this.context.fillStyle = 'black';
        this.context.fillText("FPS: " + this.fps, 10, 30);
        /////////////////////////////////
    }

    doMouseDown(event) {
        console.log(this);
        switch (event.button) {
            case 0:
                var rect = this.canvas.getBoundingClientRect();
                this.squares.push(
                    new Square(
                        null,
                        this.getX(event), 
                        this.getY(event), 
                        this.getRandomInRange(-50, 50), 
                        this.getRandomInRange(-50, 50), 
                        this.squaresize, 
                        this.squaresize
                    )
                )
                console.log(this.squares);
                break;
        
            default:
                break;
        }
    }

    doKeyDown(event) {
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

    checkCollisions() {
        for (var i = 0; i < this.squares.length; i++) {
            // for each square, check the wall overlaps
            this.checkWallCollisions(this.squares[i]);
            // for each square, check for overlaps with other squares
            this.checkObjectCollisions(this.squares[i], i);
        }
        
    }

    checkWallCollisions(object) {
        // check right and left wall overlap
        if (object.getRight() >= this.canvas.clientWidth) {
            object.vx = -object.vx;
            object.x = this.canvas.clientWidth - object.width - 1;
        }
        else if (object.x <= 0) {
            object.vx = -object.vx;
            object.x = 1;
        }
        
        // check bottom and top wall overlap
        if (object.getBottom() >= this.canvas.clientHeight) {
            object.vy = -object.vy;
            object.y = this.canvas.clientHeight - object.height - 1;;
        }
        else if (object.y <= 0) {
            object.vy = -object.vy;
            object.y = 1;
        }
    }

    checkObjectCollisions(object, index) {
        // check parameter square against all other squares
        for (var i = 0; i < this.squares.length; i++) {
            if (object !== this.squares[i])
            {
                var isCol = this.rectIntersect(
                    object.x, 
                    object.y, 
                    object.width,
                    object.height,
                    this.squares[i].x,
                    this.squares[i].y,
                    this.squares[i].width,
                    this.squares[i].height
                    );
                    object.isColliding = isCol;
                    if (isCol) {
                        (this.squares[i]).isColliding = isCol;
                        break;
                    } 
            }
        }
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
    }

    getX(event) {
        var rect = this.canvas.getBoundingClientRect();
        return event.clientX - rect.left;
    }

    getY(event) {
        var rect = this.canvas.getBoundingClientRect();
        return event.clientY - rect.top;
    }

    getRandomInRange(min, max) {
        return Math.random() * (Math.abs(min) + max) + min;
    }
}

class GameObject
{
    constructor (context, x, y, vx, vy, width, height){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;

        this.isColliding = false;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.getRight = this.getRight.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }
    getRight(){
        return (this.x + this.width);
    }

    getBottom(){
        return (this.y + this.height);
    }

    draw(context){};
    update(secondsPassed){};
}

class Square extends GameObject
{
    constructor (context, x, y, vx, vy, width, height){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.width = width;
        this.height = height;

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }

    draw(ctx){
        super.draw(ctx);
        // Draw a simple square
        ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        super.update(secondsPassed);
        // Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
        //console.log(this.x + ", " + this.y);
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }

    offsetVelocity(vx, vy){
        this.vx += vx;
        this.vy += vy;
    }
}