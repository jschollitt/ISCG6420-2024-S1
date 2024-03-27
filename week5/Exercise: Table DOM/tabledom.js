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

    // toggle bold text

}


function toggleBG(object) {
    var tablecell = object;

    // toggle background styles

}

/*
 * Exercise Part 1.
 */
function append_row() {
    // Take input from user
    // EG: let fname = prompt("Message", "Placeholder Input");

    // Create a table row
    
    // Add content, styles, and event listeners to row elements
    
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