//fetch data
fetch("http://localhost:5678/api/works")
    .then(r => console.log(r))

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;


};
const works = getWorks("http://localhost:5678/api/works");
console.log(works);

async function displayCategories() {
    let categories = await fetch("http://localhost:5678/api/categories");
    categories = await categories.json();
    console.log(categories);
    return categories;
}
displayCategories();
const categories = displayCategories();
console.log(categories);


//gallery
async function displayGallery() {
    const works = await getWorks();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "http://localhost:5678/api/works";
    works.forEach(work => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;
        figure.appendChild(image);
        gallery.appendChild(figure);
        

    });
}

let gallery = displayGallery();


//button filter
async function buttonall() {
    const buttonAll = document.querySelector("#tous");
    buttonAll.addEventListener("click", async () => {
        console.log("tous");
        const works = await getWorks();
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        works.forEach(work => {
            const figure = document.createElement("figure");
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = work.title;
            const image = document.createElement("img");
            image.src = work.imageUrl;
            image.alt = work.title;
            figure.appendChild(image);
            gallery.appendChild(figure);
            figure.appendChild(figcaption);
        });
    });
}
buttonall();

async function buttonobjects() {
    const buttonObjects = document.querySelector("#Objets");
    buttonObjects.addEventListener("click", async () => {
        console.log("Objets");
        const works = await getWorks();
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        works.forEach(work => {
            if (work.categoryId === 1) {
                const figure = document.createElement("figure");
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;
                const image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);
                gallery.appendChild(figure);
                figure.appendChild(figcaption);
            }
        });
    });
}
buttonobjects();

async function buttonappartements() {
    const buttonAppartements = document.querySelector("#Appartements");
    buttonAppartements.addEventListener("click", async () => {
        console.log("Appartements");
        const works = await getWorks();
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        works.forEach(work => {
            if (work.categoryId === 2) {
                const figure = document.createElement("figure");
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;
                const image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);
                gallery.appendChild(figure);
                figure.appendChild(figcaption);
            }
        });
    });
}
buttonappartements();

async function buttonhotel() {
    const buttonHotel = document.querySelector("#Hotel et restaurants");
    buttonHotel.addEventListener("click", async () => {
        console.log("Hotel et restaurants");
        const works = await getWorks();
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        works.forEach(work => {
            if (work.categoryId === 3) {
                const figure = document.createElement("figure");
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;
                const image = document.createElement("img");
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);
                gallery.appendChild(figure);
                figure.appendChild(figcaption);
            }
        });
    });
}
buttonhotel();


