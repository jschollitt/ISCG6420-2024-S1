function addressBookItem(fname, lname, email) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
}

addressBookItem.prototype.write = function () {
    let adrbook = "<tr><td>" + this.fname + "</td>";
    adrbook += "<td>" + this.lname + "</td>";
    adrbook += "<td>" + this.email + "</td></tr>";

    document.write(adrbook);
}

function toggleBold(object) {
    var tablecell = object;

    if (tablecell.style.fontWeight == "bold") {
        tablecell.style.fontWeight = "normal";
    }
    else {
        tablecell.style.fontWeight = "bold";
    }
}


function toggleBG(object) {
    var tablecell = object;

    if (tablecell.style.backgroundColor == "green") {
        tablecell.style.backgroundColor = "white";
        tablecell.style.fontSize = "medium";
        tablecell.style.color = "black";
    }
    else {
        tablecell.style.backgroundColor = "green";
        tablecell.style.fontSize = "xx-large";
        tablecell.style.color = "white";
    }
}

/*
 * Exercise Part 1.
 */
function append_row() {
    // Take input from user
    let fname = prompt("Please enter your first name:", "Your first name");
    let lname = prompt("Please enter your last name:", "Your last name");
    let email = prompt("Please enter your email:", "Your email");
    
    // Create a table row
    let tableObject = document.getElementsByTagName("table")[0];
    let tableRowObject = tableObject.insertRow();
    
    // Add content, styles, and event listeners to row elements
    let tableDataobject1 = tableRowObject.insertCell();
    tableDataobject1.innerHTML = fname;
    tableDataobject1.style.color = "green";

    tableDataobject1.addEventListener("click",function() {toggleBold(this)});
    tableDataobject1.addEventListener("mouseover", function() {toggleBG(this)});
    tableDataobject1.addEventListener("mouseout", function() {toggleBG(this)});

    let tableDataobject2 = tableRowObject.insertCell();
    tableDataobject2.innerHTML = lname;
    tableDataobject2.style.color = "green";

    tableDataobject2.addEventListener("click",function() {toggleBold(this)});
    tableDataobject2.addEventListener("mouseover", function() {toggleBG(this)});
    tableDataobject2.addEventListener("mouseout", function() {toggleBG(this)});

    let tableDataobject3 = tableRowObject.insertCell();
    tableDataobject3.innerHTML = email;
    tableDataobject3.style.color = "green";

    tableDataobject3.addEventListener("click",function() {toggleBold(this)});
    tableDataobject3.addEventListener("mouseover", function() {toggleBG(this)});
    tableDataobject3.addEventListener("mouseout", function() {toggleBG(this)});
}

let aB1 = new addressBookItem('Roger', 'Williams', 'rwilliams@gmail.com');
let aB2 = new addressBookItem('Rose', 'Schultz', 'rose_s@earthlink.net');

document.write("<table border = '1'><tr><th>First Name</th><th>Last Name</th><th>Email Address</th></tr>");

aB1.write();
aB2.write();

document.write("</table>");

let tableObject = document.getElementsByTagName("table")[0];
let tableRows = tableObject.rows;
let tableRowLength = tableObject.rows.length;

for (var i = 0; i < tableRowLength; i++) {
    var cellsOfCurrentRow = tableRows[i].cells;
    var numberOfCells = cellsOfCurrentRow.length;

    for (var x = 0; x < numberOfCells; x++) {
        cellsOfCurrentRow[x].addEventListener("click",function() {toggleBold(this)});
        cellsOfCurrentRow[x].addEventListener("mouseover", function() {toggleBG(this)});
        cellsOfCurrentRow[x].addEventListener("mouseout", function() {toggleBG(this)});
    }
}