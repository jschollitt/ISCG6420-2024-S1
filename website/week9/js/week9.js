Example1();
Example2();
Example3();

function Example1() {
    // Character Sprite sheet image from https://opengameart.org/content/base-character-spritesheet-16x16
    const characterSpriteSheet = new Image();
    characterSpriteSheet.src = "./assets/blank_character.png";
    characterSpriteSheet.onload = load;

    // set this to the number of elements you want to load before initalising
    const awaitLoadCount = 2;
    let loadCount = 0;

    // time tracking
    let lastTimeStamp = 0;
    let tick = 0;

    // canvas and context, not const as we don't set the value until document ready
    let canvas;
    let ctx;

    // game objects
    let character1;
    let character2;
    let character3;
    let character4;

    // run when the website has finished loading
    $('document').ready(function () {
        console.log("ready");
        load();
    });

    // call this function after each loadable element has finished loading.
    // Once all elements are loaded, loadCount threshold will be met to init.
    function load() {
        loadCount++;
        if (loadCount >= awaitLoadCount) {
            init();
        }
    }

    // initialise canvas and game elements
function init() {
        console.log("init");
        canvas = document.getElementById('ex1canvas');
        ctx = canvas.getContext('2d');

        character1 = Character(
            characterSpriteSheet,
            [64, 64],
            [[0, 64], [64, 64], [128, 64], [192, 64]],
            [108, 18]
        );

        character2 = Character(
            characterSpriteSheet,
            [64, 64],
            [[0, 0], [64, 0], [128, 0], [192, 0]],
            [281, 18]
        );

        character3 = Character(
            characterSpriteSheet,
            [64, 64],
            [[256, 0], [320, 0], [384, 0], [448, 0]],
            [454, 18]
        );

        character4 = Character(
            characterSpriteSheet,
            [64, 64],
            [[256, 64], [320, 64], [384, 64], [448, 64]],
            [627, 18]
        );

        window.requestAnimationFrame(run);
    }

    // Game loop function
    function run(timeStamp) {
        // calculate time delta since last update
        tick = (timeStamp - lastTimeStamp);
        // save current time for next loop
        lastTimeStamp = timeStamp;

        update(tick);
        draw();

        window.requestAnimationFrame(run);
    }

    function update() {
        character1.update(tick);
        character2.update(tick);
        character3.update(tick);
        character4.update(tick);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        character1.draw(ctx);
        character2.draw(ctx);
        character3.draw(ctx);
        character4.draw(ctx);
    }

    function Character(spritesheet, spriteSize, spriteFrames, position) {
        return {
            spriteSheet: spritesheet,       // image containing the sprites
            spriteFrameSize: spriteSize,    // dimensions of the sprites in the spritesheet
            spriteFrames: spriteFrames,     // 3d array. 
                                            // X = animation track, Y = animation frame, Z = coords of frame

            animationFrame: 0,              // current frame in animation to draw
            frameTime: 125,                 // milliseconds to wait between animation frame updates
            timeSinceLastFrame: 0,          // track time since the last frame update was performed

            position: position,               // position of the character (X, Y)

            update(tick) {
                // increase time keeper by last update delta
                this.timeSinceLastFrame += tick;
                // check if time since last frame meets threshold for new frame
                if (this.timeSinceLastFrame >= this.frameTime) {
                    // reset frame time keeper
                    this.timeSinceLastFrame = 0;

                    this.animationFrame = (this.animationFrame + 1) % this.spriteFrames.length;
                }
            },

            draw(context) {
                context.drawImage(
                    this.spriteSheet,
                    this.spriteFrames[this.animationFrame][0],
                    this.spriteFrames[this.animationFrame][1],
                    this.spriteFrameSize[0],
                    this.spriteFrameSize[1],
                    this.position[0],
                    this.position[1],
                    this.spriteFrameSize[0],
                    this.spriteFrameSize[1]
                );
            },


        }
    };
}


function Example2() {
// Character Sprite sheet image from https://opengameart.org/content/base-character-spritesheet-16x16
const characterSpriteSheet = new Image();
characterSpriteSheet.src = "./assets/blank_character.png";
characterSpriteSheet.onload = load;

// set this to the number of elements you want to load before initalising
const awaitLoadCount = 2;
let loadCount = 0;

// time tracking
let lastTimeStamp = 0;
let tick = 0;

// canvas and context, not const as we don't set the value until document ready
let canvas;
let ctx;

// game objects
let character1;
let character2;
let character3;
let character4;

// run when the website has finished loading
$('document').ready(function () {
    console.log("ready");
    load();
});

// call this function after each loadable element has finished loading.
// Once all elements are loaded, loadCount threshold will be met to init.
function load() {
    loadCount++;
    if (loadCount >= awaitLoadCount) {
        init();
    }
}

// initialise canvas and game elements
function init() {
    console.log("init");
    canvas = document.getElementById('ex2canvas');
    ctx = canvas.getContext('2d');

    character1 = Character(
        characterSpriteSheet,
        [64, 64],
        [[256, 64], [320, 64], [384, 64], [448, 64]],
        [0, 18],
        80
    );

    character2 = Character(
        characterSpriteSheet,
        [64, 64],
        [[256, 64], [320, 64], [384, 64], [448, 64]],
        [0, 100],
        120
    );

    character3 = Character(
        characterSpriteSheet,
        [64, 64],
        [[256, 64], [320, 64], [384, 64], [448, 64]],
        [0, 200],
        160
    );

    character4 = Character(
        characterSpriteSheet,
        [64, 64],
        [[256, 64], [320, 64], [384, 64], [448, 64]],
        [0, 300],
        200
    );

    window.requestAnimationFrame(run);
}

// Game loop function
function run(timeStamp) {
    tick = (timeStamp - lastTimeStamp);
    lastTimeStamp = timeStamp;

    update(tick);
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    character1.update(tick);
    character2.update(tick);
    character3.update(tick);
    character4.update(tick);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    character1.draw(ctx);
    character2.draw(ctx);
    character3.draw(ctx);
    character4.draw(ctx);
}

function Character(spritesheet, spriteSize, spriteFrames, position, frameTime) {
    return {
        spriteSheet: spritesheet,       // image containing the sprites
        spriteFrameSize: spriteSize,    // dimensions of the sprites in the spritesheet
        spriteFrames: spriteFrames,     // 3d array. X = animation track, Y = animation frame, Z = X & Y of frame

        animationFrame: 0,              // current frame in animation to draw
        frameTime: frameTime,                 // milliseconds to wait between animation frame updates
        timeSinceLastFrame: 0,          // track time since the last frame update was performed

        position: position,               // position of the character (X, Y)
        direction: [0.2, 0],

        update(tick) {
            // increase time keeper by last update delta
            this.timeSinceLastFrame += tick;
            // check if time since last frame meets threshold for new frame
            if (this.timeSinceLastFrame >= this.frameTime) {
                // reset frame time keeper
                this.timeSinceLastFrame = 0;

                this.animationFrame = (this.animationFrame + 1) % this.spriteFrames.length;
            }

            this.position[0] = (this.position[0] + (this.direction[0] * tick)) % canvas.width;
        },

        draw(context) {
            context.drawImage(
                this.spriteSheet,
                this.spriteFrames[this.animationFrame][0],
                this.spriteFrames[this.animationFrame][1],
                this.spriteFrameSize[0],
                this.spriteFrameSize[1],
                this.position[0],
                this.position[1],
                this.spriteFrameSize[0],
                this.spriteFrameSize[1]
            );
        },


    }
};
}

function Example3() {
    // Character Sprite sheet image from https://opengameart.org/content/base-character-spritesheet-16x16
    const characterSpriteSheet = new Image();
    characterSpriteSheet.src = "./assets/blank_character.png";
    characterSpriteSheet.onload = load;

    // Background image tilemap set from https://opengameart.org/content/snow-tiles
    const backgroundImage = new Image();
    backgroundImage.src = "./assets/snow.png";
    backgroundImage.onload = load;

    // set this to the number of elements you want to load before initalising
    const awaitLoadCount = 3;
    let loadCount = 0;

    // time tracking
    let lastTimeStamp = 0;
    let tick = 0;

    // canvas and context, not const as we don't set the value until document ready
    let canvas;
    let ctx;

    // game objects
    let character;

    // run when the website has finished loading
    $('document').ready(function () {
        console.log("ready");
        load();
    });

    // call this function after each loadable element has finished loading.
    // Once all elements are loaded, loadCount threshold will be met to init.
    function load() {
        loadCount++;
        console.log("load " + loadCount);
        if (loadCount >= awaitLoadCount) {
            init();
        }
    }

    // initialise canvas and game elements
    function init() {
        console.log("init");
        canvas = document.getElementById('ex3canvas');
        ctx = canvas.getContext('2d');

        character = Character(
            characterSpriteSheet,
            [64, 64],

            [ // main character set
                [ // walk up track
                    [0, 0], [64, 0], [128, 0], [192, 0]
                ],
                [ // walk down track 
                    [256, 0], [320, 0], [384, 0], [448, 0]
                ],
                [ // walk left track
                    [0, 64], [64, 64], [128, 64], [192, 64]
                ],
                [ // walk right track 
                    [256, 64], [320, 64], [384, 64], [448, 64]
                ],
            ],

            1
        );
        character.init();

        document.addEventListener("keydown", doKeyDown);
        document.addEventListener("keyup", doKeyUp);

        window.requestAnimationFrame(run);
    }

    // Game loop function
    function run(timeStamp) {
        tick = (timeStamp - lastTimeStamp);
        lastTimeStamp = timeStamp;

        update(tick);
        draw();

        window.requestAnimationFrame(run);
    }

    function update() {
        character.update(tick);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, 800, 800);
        character.draw(ctx);
    }

    function doKeyDown(e) {
        e.preventDefault();
        if (character != undefined) { character.doKeyInput(e.key, true); }
    }

    function doKeyUp(e) {
        e.preventDefault();
        if (character != undefined) { character.doKeyInput(e.key, false); }
    }

    // Create and return a new Character object.
    // Param: spritesheet = Image object
    // Param: spriteSize = Array of 2 numbers [width, height]
    // Param: spriteFrames = 3D array[Tracks[Frames[Frame X, Y]]]
    // Param: spriteScale = Number to scale sprite size -> canvas size
    function Character(spritesheet, spriteSize, spriteFrames, spriteScale) {
        return {

            spriteSheet: spritesheet,       // image containing the sprites
            spriteFrameSize: spriteSize,    // dimensions of the sprites in the spritesheet
            spriteFrames: spriteFrames,     // 3d array. X = animation track, Y = animation frame, Z = X & Y of frame
            spriteScale: spriteScale,       // amount to scale sprites by (numbers except 1 will be linearly interpolated)
            spriteCanvasSize: spriteSize,   // Calculated size after scale. temp value set, overwritten in init

            animationTrack: 0,              // current animation frame set to use
            animationFrame: 0,              // current frame in animation to draw
            frameTime: 125,                 // milliseconds to wait between animation frame updates
            timeSinceLastFrame: 0,          // track time since the last frame update was performed
            lastAction: "",                 // Last user input action performed

            position: [0, 0],               // position of the character (X, Y)
            direction: [0, 0],              // X and Y axis movement amount
            velocity: 0.2,                   // rate of position change for each axis

            // Initialise variables that cannot be calculated during
            // object creation.
            init() {
                console.log("init");
                // Apply scale multiplier to sprite frame dimensions
                this.spriteCanvasSize = [
                    this.spriteFrameSize[0] * this.spriteScale,
                    this.spriteFrameSize[1] * this.spriteScale
                ];
            },

            // Handle actions for the character to perform.
            // param: action = string of action name.
            action(action) {
                console.log(`action: ${action}. Animation Frame ${this.animationFrame}`);
                // ignore duplicate actions.
                if (action === this.lastAction) return;

                // Handle each action type as cases.
                switch (action) {
                    case "moveLeft":
                        this.animationTrack = 2;
                        this.animationFrame = 0;
                        this.direction[0] = -this.velocity;
                        break;
                    case "moveRight":
                        this.animationTrack = 3;
                        this.animationFrame = 0;
                        this.direction[0] = this.velocity;
                        break;
                    case "moveUp":
                        this.animationTrack = 0;
                        this.animationFrame = 0;
                        this.direction[1] = -this.velocity;
                        break;
                    case "moveDown":
                        this.animationTrack = 1;
                        this.animationFrame = 0;
                        this.direction[1] = this.velocity;
                        break;
                    case "noMoveHorizontal":
                        this.direction[0] = 0;
                        this.animationFrame = 0;
                        break;
                    case "noMoveVertical":
                        this.direction[1] = 0;
                        this.animationFrame = 0;
                        break;
                    default:
                        this.direction = [0, 0];
                        break;
                }

                // keep track of last action to avoid reinitialising the current action.
                this.lastAction = action;
            },

            update(tick) {
                // increase time keeper by last update delta
                this.timeSinceLastFrame += tick;
                // check if time since last frame meets threshold for new frame
                if (this.timeSinceLastFrame >= this.frameTime) {
                    // reset frame time keeper
                    this.timeSinceLastFrame = 0;

                    // update frame to next frame on the track. 
                    // Modulo wraps the frames from last frame to first.
                    if (this.direction[0] !== 0 || this.direction[1] !== 0) {
                        this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                    }
                }

                // Calculate how much movement to perform based on how long
                // it has been since the last position update.
                this.position[0] += this.direction[0] * tick;
                this.position[1] += this.direction[1] * tick;
            },

            // Draw character elements using the passed context (canvas).
            // Param: context = canvas 2D context.
            draw(context) {
                // Draw image to canvas.
                // Params: (spritesheet Image, 
                //          sprite X, sprite Y, sprite width, sprite height
                //          position on canvas X, position on canvas Y, scaled width, scaled height).
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
                );
            },

            // Handle input from keyboard for the character.
            // Param: e = event key string.
            // Param: isKeyDown = boolean, true = key pressed, false = key released
            doKeyInput(e, isKeydown = true) {
                switch (e) {
                    case "w":
                        if (isKeydown) this.action("moveUp");
                        else this.action("noMoveVertical");
                        break;
                    case "a":
                        if (isKeydown) this.action("moveLeft");
                        else this.action("noMoveHorizontal");
                        break;
                    case "s":
                        if (isKeydown) this.action("moveDown");
                        else this.action("noMoveVertical");
                        break;
                    case "d":
                        if (isKeydown) this.action("moveRight");
                        else this.action("noMoveHorizontal");
                        break;
                    default:
                        if (!isKeydown) this.action("stop");
                        break;
                }

            }
        };
    }
}