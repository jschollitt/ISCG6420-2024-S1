function adReplay() {
    let ad = document.getElementById("adWrapper");
    let copy = ad.cloneNode(true);
    ad.replaceWith(copy);
}

function togglePico() {
    let form = document.getElementById("picoMePlease");

    if (form.classList.contains("pico")) {
        form.classList.remove("pico");
    }
    else {
        form.classList.add("pico");
    }
}




































function calculate(operator) {
    let num1 = document.getElementById("calcNum1").value;
    let num2 = document.getElementById("calcNum2").value;

    let output = document.getElementById("calcResult");

    switch (operator) {
        case 'add':
            output.innerHTML = +num1 + +num2;
            break;
        case 'sub':
            output.innerHTML = +num1 - +num2;
            break;
        case 'mul':
            output.innerHTML = +num1 * +num2;
            break;
        case 'div':
            output.innerHTML = +num1 / +num2;
            break;

    }
}