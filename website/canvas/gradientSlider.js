let mycanvas = document.getElementById("w6canvas8");
let cntx = mycanvas.getContext('2d');

let canvasWidth = mycanvas.clientWidth;
let canvasHeight = mycanvas.clientHeight;

let mygradient = null;

let gradientDirection = 1;

DrawGradients(0.5);

function DrawGradients(value) {
    RecalcGradient(value)
    cntx.clearRect(0, 0, canvasWidth, canvasHeight);
    cntx.fillStyle = mygradient;
    cntx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function RecalcGradient(value) {

    switch (gradientDirection) {
        case 2:
            mygradient = cntx.createLinearGradient(0, 0, canvasWidth, 0);
            break;
        case 3:
            mygradient = cntx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
            break;
        case 4:
            mygradient = cntx.createLinearGradient(0, canvasHeight, canvasWidth, 0);
            break;
        default:
            mygradient = cntx.createLinearGradient(0, 0, 0, canvasWidth);
            break;
    }

    mygradient.addColorStop(0, "#ffffff");
    mygradient.addColorStop(value, "#111111");
    mygradient.addColorStop(1, "#000000");
}

function SliderUpdate(slider) {
    DrawGradients((isNaN(slider.value) ? 50 : slider.value) / 100);
}

function SetGradientDir(option) {
    gradientDirection = option;
    SliderUpdate(document.getElementById("myRange"));
}