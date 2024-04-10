function bubbling () {
    const div = document.getElementById("bubbling-div");
    const article = document.getElementById("bubbling-article");
    const p = document.getElementById("bubbling-p");

    div.addEventListener("click", (e) => {
        alert("DIV");
    }, true);

    article.addEventListener("click", (e) => {
        alert("ARTICLE");
    }, false);

    p.addEventListener("click", (e) => {
        alert("P");
    });


}