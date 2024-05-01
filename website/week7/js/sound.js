// Credit: Luke.RUSTLTD on opengameart.org.
// https://opengameart.org/content/wind1
let bgAudio = new Sound("../assets/wind1.wav");

// Credit: p0ss on opengameart.org.
// https://opengameart.org/content/interface-sounds-starter-pack
let actionAudio = new Sound("../assets/appear-online.ogg");
actionAudio.play();

let playBGAudio = document.getElementById("bgAudioPlay");
playBGAudio.addEventListener("click", () => {
    bgAudio.sound.paused ? bgAudio.play() : bgAudio.stop();
});

let playActionAudio = document.getElementById("actionAudioPlay");
playActionAudio.addEventListener("click", () => actionAudio.play());

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.crossOrigin = "anonymous";
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("looping", "true");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        if (!this.sound.paused || !this.sound.currentTime) {
            this.sound.load();    
        }
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
} 


