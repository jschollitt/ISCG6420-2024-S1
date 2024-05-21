document.onreadystatechange = () => {

    // Fix browser default behaviour to open dropped files
    window.addEventListener("dragover", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function (e) {
        e = e || event;
        e.preventDefault();
    }, false);

    // Example 1 setup
    let dropzones = document.getElementsByClassName("ex1dropzone");
    for (let i = 0; i < dropzones.length; i++) {
        dropzones[i].ondrop = drop;
        dropzones[i].ondragover = allowDrop;
    }

    let draggable = document.getElementById("ex1drag");
    draggable.ondragstart = drag;

    // Example 2 setup
    fileReader = new FileReader();
    fileReader.addEventListener("load", loadImage);
    document.getElementById("ex2dropzone").addEventListener("dragover", dragoverImage);
    document.getElementById("ex2dropzone").addEventListener("dragleave", dragleaveImage);
    document.getElementById("ex2dropzone").addEventListener("drop", dropImage);
    document.getElementById("ex2button").addEventListener("click", fileExplorer);
    document.getElementById("ex2fileInput").addEventListener("change", fileExplorerUpload);

    // Example 3 setup
    document.getElementById('ex3savesession').addEventListener("click", saveSessionData);
    document.getElementById('ex3savelocal').addEventListener("click", saveLocalData);
    document.getElementById('ex3loadsession').addEventListener("click", loadSessionData);
    document.getElementById('ex3loadlocal').addEventListener("click", loadLocalData);
    document.getElementById('ex3clear').addEventListener("click", clearStorage);

    // Example 4 setup
    document.getElementById('ex4button').addEventListener("click", getGeo);
}

function allowDrop(e) {
    console.log(`allow drop: ${e}`);
    e.preventDefault();
}

function drag(e) {
    console.log(`drag: ${e}`);
    e.dataTransfer.setData("text", e.target.id);
    setDropzoneHighlight(document.getElementsByClassName("ex1dropzone"), true);
}

function drop(e) {
    console.log(`drop: ${e}`);
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let dataElement = document.getElementById(data);
    if (dataElement.parentElement !== e.target.parentElement) {
        e.target.appendChild(dataElement);
    }
    setDropzoneHighlight(document.getElementsByClassName("ex1dropzone"), false);
}

function setDropzoneHighlight(dropzones, state) {
    if (dropzones.length == 0) return;
    for (let i = 0; i < dropzones.length; i++) {
        if (state) {
            dropzones[i].classList.add("highlightDropzone");
        }
        else {
            dropzones[i].classList.remove("highlightDropzone");
        }
    }
}


let fileobj;
let fileReader;
function uploadImage(file) {
    if (!fileobj.type.includes('image')) {
        return alert("Image file types only");
    }
    if (fileobj.size > 10_000_000) {
        return alert("File too large, please try a smaller image");
    }

    fileReader.readAsDataURL(fileobj);
}

function dragoverImage() {
    setDropzoneHighlight([document.getElementById('ex2dropzone')], true);
    return false;
}

function dragleaveImage() {
    setDropzoneHighlight([document.getElementById('ex2dropzone')], false);
}

function dropImage(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    uploadImage(fileobj);
    setDropzoneHighlight([document.getElementById('ex2dropzone')], false);
}

function fileExplorer() {
    document.getElementById('ex2fileInput').click();
}

function fileExplorerUpload() {
    fileobj = document.getElementById('ex2fileInput').files[0];
    uploadImage(fileobj);
}

function loadImage(e) {
    const image = document.getElementById("ex2img");
    image.style.backgroundImage = `url(${e.target.result})`;
}

function getFormFields() {
    return [
        document.getElementById('fname').value,
        document.getElementById('lname').value,
        document.getElementById('email').value
    ];
}

function setFormFields(fname, lname, email) {
    document.getElementById('fname').value = fname;
    document.getElementById('lname').value = lname;
    document.getElementById('email').value = email;
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function saveSessionData() {
    if (!storageAvailable("sessionStorage")) {
        setMessage("Session Storage is not available in this browser", "red", 5000);
        return;
    };

    let data = getFormFields();
    sessionStorage.setItem("firstname", data[0]);
    sessionStorage.setItem("lastname", data[1]);
    sessionStorage.setItem("email", data[2]);
    setMessage("Data saved in Session Storage", "#55ff55", 3000);
}

function saveLocalData() {
    if (!storageAvailable("localStorage")) {
        setMessage("Local Storage is not available in this browser", "red", 5000);
        return;
    }

    let data = getFormFields();
    localStorage.setItem("firstname", data[0]);
    localStorage.setItem("lastname", data[1]);
    localStorage.setItem("email", data[2]);
    setMessage("Data saved in Local Storage", "#55ff55", 3000);
}

function loadSessionData() {
    let fname = sessionStorage.getItem("firstname") ?? "";
    let lname = sessionStorage.getItem("lastname") ?? "";
    let email = sessionStorage.getItem("email") ?? "";
    setFormFields(fname, lname, email);
    setMessage("Data loaded from Session Storage", "#55ff55", 3000);
}

function loadLocalData() {
    let fname = localStorage.getItem("firstname") ?? "";
    let lname = localStorage.getItem("lastname") ?? "";
    let email = localStorage.getItem("email") ?? "";
    setFormFields(fname, lname, email);
    setMessage("Data loaded from Local Storage", "#55ff55", 3000);
}

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
}

function setMessage(message, colour, time) {
    let msg = document.getElementById('ex3message');
    msg.innerText = message;
    msg.style.backgroundColor = colour;
    msg.style.visibility = "visible";

    setTimeout(function () {
        msg.style.visibility = "hidden";
    }, time);
}

function getGeo() {
    if (!navigator.geolocation) {
        document.getElementById('ex4lat').innerText = "Geolocation permission denied";
        document.getElementById('ex4long').innerText = "Geolocation permission denied";
        return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        document.getElementById('ex4lat').innerText = lat;
        document.getElementById('ex4long').innerText = long;

        var map = L.map('map').setView([lat, long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, long]).addTo(map);
    });
}