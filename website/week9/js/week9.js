// Character Sprite sheet image from https://opengameart.org/content/classic-hero 
const characterSpriteSheet = new Image();
characterSpriteSheet.src = "./assets/hero4x.png"
characterSpriteSheet.onload = load;

const backgroundImage = new Image();

const awaitLoadCount = 2;
let loadCount = 0;

let lastTimeStamp = 0;
let tick = 0;

let canvas;
let ctx;

let character;


$('document').ready(function () {
    console.log("ready");
    load();
});

function load () {
    loadCount++;
    console.log("load " + loadCount);
    if (loadCount >= awaitLoadCount) {
        init();
    }
}

function init() {
    console.log("init");
    canvas = document.getElementById('ex1canvas');
    ctx = canvas.getContext('2d');

    character = Character(
        characterSpriteSheet,
        [64, 64],
        [
            // idle track
            [[0, 0], [64, 0], [128, 0], [192, 0], [0, 0], [64, 0], [128, 0], [0, 0], [64, 0], [128, 0], [0, 0], [64, 0], [128, 0]
        ],
            [[64, 64], [128, 64], [192, 64], [256, 64]]
        ],
        1
    );
    character.init();
    window.requestAnimationFrame(run);
}

function run(timeStamp) {
    //if (!runGame) return;
    console.log(`run: timeStamp ${timeStamp}, lastTimeStamp ${lastTimeStamp}, tick ${tick}`);
    tick = (timeStamp - lastTimeStamp);
    lastTimeStamp = timeStamp;
    console.log(`tick in run: ${tick}`);
    update(tick);
    draw();
    window.requestAnimationFrame(run);
}

function update() {
    character.update(tick);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.draw(ctx);
    
}

function Character(spritesheet, spriteSize, spriteFrames, spriteScale) {
    return {
        spriteSheet: spritesheet,
        spriteFrameSize: spriteSize,
        spriteFrames: spriteFrames, // 3d array. X = animation track, Y = animation frame, Z = X & Y of frame
        animationTrack: 0,
        animationFrame: 0,
        invertFrame: false,
        frameTime: 250,
        timeSinceLastFrame: 0,
        spriteScale: spriteScale,
        spriteCanvasSize: spriteSize, // temp value. Overwritten in init
        position: [0, 0],
        velocity: 10,
        direction: "right",
        init () {
            this.spriteCanvasSize = [
                this.spriteFrameSize[0] * this.spriteScale,
                this.spriteFrameSize[1] * this.spriteScale
            ];
        },
        action (action) {
            switch(action) {
                case "moveLeft":
                    this.direction = "left";
                    this.animationTrack = 0;
                    this.invertFrame = true;
                    break;
                case "moveRight":
            }
        },
        update(tick) {
            // increase time keeper by last update delta
            this.timeSinceLastFrame += tick;
            console.log(`tick: ${tick}. time since: ${this.timeSinceLastFrame}`);
            // check if time since last frame meets threshold for new frame
            if (this.timeSinceLastFrame >= this.frameTime) {
                // reset frame time keeper
                this.timeSinceLastFrame = 0;
                
                // update frame to next frame on the track. Modulo wraps the frames from last frame to first
                this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
            }

            // check if non-movement action has completed


            //this.position[0] 

        },
        draw(context) {
            context.drawImage(
                this.spriteSheet, 
                this.spriteFrames[this.animationTrack][this.animationFrame][0],
                this.spriteFrames[this.animationTrack][this.animationFrame][1],
                this.spriteFrameSize[0],
                this.spriteFrameSize[1],
                this.position[0],
                this.position[1],                
                this.spriteCanvasSize[0],
                this.spriteCanvasSize[1]
            )
        }
    };
}




