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
    gallery.innerHTML = "";
       works.forEach(work => {
        const figure = document.createElement("figure");
        figure.setAttribute("data-project-id", work.id);
        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;
        figure.appendChild(image);
        gallery.appendChild(figure);
        

    });
}

let gallery = displayGallery();

function createGalleryFigure(work) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");

    figure.setAttribute("data-project-id", work.id);
    image.src = work.imageUrl;
    image.alt = work.title;
    figure.appendChild(image);

    return figure;
}
// maj instant gallery
document.addEventListener("projectCreated", (event) => {
    const gallery = document.querySelector(".gallery");

    if (!gallery) {
        return;
    }

    gallery.appendChild(createGalleryFigure(event.detail));
});

document.addEventListener("projectDeleted", (event) => {
    const projectElement = document.querySelector(`.gallery figure[data-project-id="${event.detail.projectId}"]`);

    if (projectElement) {
        projectElement.remove();
    }
});


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
    const buttonHotel = document.querySelector("#Hotel_et_restaurants");
    buttonHotel.addEventListener("click", async () => {
        console.log("Hotel_et_restaurants");
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


