let users = [];

function submitForm() {
    let form = document.getElementById("user-form");
    
    let fname = form["first-name"].value;
    let lname = form["last-name"].value;

    const user = {
        firstName: fname,
        lastName: lname
    }

    users.push(user);
    loadUsers();
}

function loadUsers() {
    let userList = document.getElementById("user-list");
    userList.innerHTML = "";
    
    for (let i = 0; i < users.length; i++) {
        
        // Create new div
        let userDiv = document.createElement("div");
        // Give it a class for styling, etc
        userDiv.classList.add("user");

        let userFullName = users[i].firstName + " " + users[i].lastName;
        // Set the contents to the name of
        // the user object at index i
        userDiv.innerHTML = userFullName;

        // Add the div to the section
        userList.appendChild(userDiv);
    }
    userList.appendChild(document.createElement("br"));
}

let btn = document.getElementById("user-form-submit");
btn.addEventListener("click", submitForm); 