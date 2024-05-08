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
        let userDiv = document.createElement("div");
        userDiv.classList.add("user");
        let userFullName = users[i].firstName + " " + users[i].lastName;
        userDiv.innerHTML = userFullName;
        userList.appendChild(userDiv);
    }
}

document.getElementById("user-form-submit").addEventListener("click", submitForm);
