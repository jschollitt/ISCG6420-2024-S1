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

class Circle extends GameObject
{
    constructor (context, x, y, vx, vy, radius){
        super(context, x, y, vx, vy);

        // Set default width and height
        this.radius = radius

        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.setVelocity = this.setVelocity.bind(this);
        this.offsetVelocity = this.offsetVelocity.bind(this);
    }

    draw(ctx){
        super.draw(ctx);
        // Draw a simple circle
        ctx.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
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