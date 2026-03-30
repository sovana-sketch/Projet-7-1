// gallery-edt suppression
async function getprojects(url) {
    const response = await fetch(url || "http://localhost:5678/api/works");

    const projects = await response.json();
    console.log(response);
    return projects;
};

const projects = getprojects("http://localhost:5678/api/works");
console.log(projects);

async function displayGalleryEdit() {
    const projects = await getprojects();
    const galleryEdit = document.getElementById("gallery_edt_content");
 
    projects.forEach(project => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash");
        figure.appendChild(trashIcon);
        image.src = project.imageUrl;
        image.alt = project.title;
        figure.appendChild(image);
        galleryEdit.appendChild(figure);
       
       console.log(project);
    });
}
displayGalleryEdit();


//gallery-edt addition
//catergory select
async function getcategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories;
}
const categories_selecter = getcategories();
console.log(categories_selecter);


async function displayCategories() {
    const categories = await getcategories();
    const categorySelect = document.getElementById("category_select");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}
displayCategories();
//titile input
const titleInput = document.getElementById("Titre");
async function handleTitleInput() {
    const title = titleInput.value;
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
            })
        });
        if (response.ok) {            const data = await response.json();
            console.log('Title submitted successfully:', data);
        } else {
            console.error('Failed to submit title:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting title:', error);
    }

    console.log(title);
}

