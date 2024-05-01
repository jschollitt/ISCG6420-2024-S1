const formPage1 = document.getElementById("form-page1");
const formPage2 = document.getElementById("form-page2");
const formPage3 = document.getElementById("form-page3");

const progressBar = document.querySelector("progress");

const summaryName = document.getElementById("summary-name");
const summaryVehicle = document.getElementById("summary-vehicle");

const formData = document.getElementById("collected-data");

function showPage(pageNumber) {
    switch (pageNumber) {
        case 1:
            formPage1.style.display = 'block';
            formPage2.style.display = 'none';
            formPage3.style.display = 'none';
            progressBar.value=10;
            break;

        case 2:
            formPage1.style.display = 'none';
            formPage2.style.display = 'block';
            formPage3.style.display = 'none';
            progressBar.value=50;
            break;

        case 3:
            formPage1.style.display = 'none';
            formPage2.style.display = 'none';
            formPage3.style.display = 'block';
            progressBar.value=100;
            updateSummary();
            break;
            
        default:
            break;
    }
}

function getFormData() {
    // example using ID-based fetch
    const fName = document.getElementById("name-first").value;
    const lName = document.getElementById("name-last").value;

    // example using CSS selectors within formPage2
    const vType = formPage2.querySelector('input[name=vehicle]:checked').value;
    const vMake = formPage2.querySelector('select').value;

    return data = {
        name: fName + " " + lName,
        vehicle: vMake + " " + vType
    };
}

function updateSummary() {
    const data = getFormData();

    summaryName.innerHTML = data.name;
    summaryVehicle.innerHTML = data.vehicle;
}

function submitData() {
    const dataRow = document.createElement("tr");
    const cellName = document.createElement("td");
    const cellVehicle = document.createElement("td");
    
    dataRow.appendChild(cellName);
    dataRow.appendChild(cellVehicle);
    
    const data = getFormData();

    cellName.innerHTML = data.name;
    cellVehicle.innerHTML = data.vehicle;

    formData.appendChild(dataRow);
}

