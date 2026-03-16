fetch("http://localhost:5678/api/works")
    .then(r => console.log(r))

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
};
const works = getWorks("http://localhost:5678/api/works");
console.log(works);


//button filter
const buttonAll = document.querySelector("#tous");
buttonAll.addEventListener("click", function () {
    const allWorks = Array.from(works);
    allWorks.forEach(function (work) {
        work.style.display = "block";
    });
    console.log("All button clicked");
});

const buttonObjects = document.querySelector("#objets");
buttonObjects.addEventListener("click", function () {
    const objectWorks = Array.from(works).filter(function (work) {
        return work.categoryId === 1;
    });
    objectWorks.forEach(function (work) {
        work.style.display = "block";
    });
    console.log("Objects button clicked");
});
