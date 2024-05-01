let spinDot =
{
    Create: function (parent, width, height, dotSize, offset, colour, animTime) {

        this.dotCont = document.createElement("DIV");
        this.dotCont.className = "loading";
        this.dotCont.style.width = width.toString() + "px";
        this.dotCont.style.height = height.toString() + "px";
        this.dotCont.style.webkitAnimationDuration = animTime.toString() + "s";

        var offsetHalf = (width / 2) - (dotSize / 2);
        this.dot = document.createElement("DIV");
        this.dot.className = "spindot";
        this.dot.style.width = dotSize.toString() + "px";
        this.dot.style.height = dotSize.toString() + "px";
        this.dot.style.top = offset.toString() + "px";
        this.dot.style.left = offsetHalf.toString() + "px";

        this.dot1 = document.createElement("DIV");
        this.dot1.className = "spindot";
        this.dot1.style.width = dotSize.toString() + "px";
        this.dot1.style.height = dotSize.toString() + "px";
        this.dot1.style.bottom = offset.toString() + "px";
        this.dot1.style.left = offsetHalf.toString() + "px";

        this.dot2 = document.createElement("DIV");
        this.dot2.className = "spindot";
        this.dot2.style.width = dotSize.toString() + "px";
        this.dot2.style.height = dotSize.toString() + "px";
        this.dot2.style.top = offsetHalf.toString() + "px";
        this.dot2.style.left = offset.toString() + "px";

        this.dot3 = document.createElement("DIV");
        this.dot3.className = "spindot";
        this.dot3.style.width = dotSize.toString() + "px";
        this.dot3.style.height = dotSize.toString() + "px";
        this.dot3.style.top = offsetHalf.toString() + "px";
        this.dot3.style.right = offset.toString() + "px";

        var parent = document.getElementById(parent);
        this.dotCont.appendChild(this.dot);
        this.dotCont.appendChild(this.dot1);
        this.dotCont.appendChild(this.dot2);
        this.dotCont.appendChild(this.dot3);
        parent.appendChild(this.dotCont);
    }

}

function CreateSpinner() {
    var num = document.getElementById("numberInput").value;
    for (var i = 0; i < num; i++) {
        var newDot = spinDot;
        var spinSize = 300;
        var unitSize = (spinSize / num) / 3;
        unitSize = unitSize > 1 ? unitSize : 1;
        var timePerSpin = 5 / num * (i + 1);
        newDot.Create("spinner-container", spinSize, spinSize, unitSize, unitSize * i * 1.25, "white", timePerSpin);
    }
}

function ResetAnim() {
    document.getElementById("spinner-container").innerText = '';
}