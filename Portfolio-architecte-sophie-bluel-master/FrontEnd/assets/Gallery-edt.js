// gallery-edt suppression
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

async function getprojects(url) {
    const response = await fetch(url || "http://localhost:5678/api/works");

    const projects = await response.json();
    console.log(response);
    return projects;
};

const projects = getprojects("http://localhost:5678/api/works");
console.log(projects);
//add project to gallery-edt instantly
function notifyProjectCreated(project) {
    document.dispatchEvent(new CustomEvent("projectCreated", {
        detail: project
    }));
}

function notifyProjectDeleted(projectId) {
    document.dispatchEvent(new CustomEvent("projectDeleted", {
        detail: { projectId }
    }));
}

function createProjectFigure(project) {
    const figure = document.createElement("figure");
    figure.setAttribute("data-project-id", project.id);

    const image = document.createElement("img");
    const trashIcon = document.createElement("i");

    trashIcon.classList.add("trash_button", "fa-regular", "fa-trash-can");
    image.src = project.imageUrl;
    image.alt = project.title;

    figure.appendChild(trashIcon);
    figure.appendChild(image);

    trashIcon.addEventListener('click', () => {
        deleteProject(project.id);
    });

    return figure;
}

function resetPreview() {
    if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
        currentPreviewUrl = "";
    }

    photoPreview.removeAttribute("src");
    photoPreview.style.display = "none";
    if (uploadIcon) uploadIcon.style.display = "block";
    if (uploadLabel) uploadLabel.style.display = "block";
    if (uploadHint) uploadHint.style.display = "block";
}

function isValidPhoto(file) {
    if (!file) {
        return false;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert("Seuls les fichiers JPEG et PNG sont autorisés.");
        return false;
    }

    if (file.size > MAX_FILE_SIZE) {
        alert("Le fichier ne doit pas dépasser 4 Mo.");
        return false;
    }

    return true;
}

async function displayGalleryEdit() {
    const projects = await getprojects();
    const galleryEdit = document.getElementById("gallery_edt_content");
 
    projects.forEach(project => {
        const figure = createProjectFigure(project);
        galleryEdit.appendChild(figure);

       console.log(project);
    });
}
displayGalleryEdit();

async function deleteProject(projectId) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            console.log(`Project with ID ${projectId} deleted successfully.`);
            const projectElement = document.querySelector(`figure[data-project-id="${projectId}"]`);
            if (projectElement) {
                projectElement.remove();
            }
            notifyProjectDeleted(projectId);
        } else {
            console.error(`Failed to delete project with ID ${projectId}:`, response.statusText);
        }
    } catch (error) {
        console.error(`Error deleting project with ID ${projectId}:`, error);
    }
}


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

//photo input
//preview

const photoInput = document.getElementById("photo");
const uploadIcon = document.getElementById("upload_icon");
const uploadBox = document.querySelector(".upload_box");
const uploadLabel = uploadBox ? uploadBox.querySelector("label[for='photo']") : null;
const uploadHint = uploadBox ? uploadBox.querySelector("p") : null;

let currentPreviewUrl = "";
const photoPreview = document.createElement("img");
photoPreview.id = "photo_preview";
photoPreview.alt = "Apercu de la photo selectionnee";

if (uploadBox) {
    uploadBox.prepend(photoPreview);
}

resetPreview();

if (photoInput) {
    photoInput.addEventListener("change", (event) => {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            resetPreview();
            return;
        }

        if (!isValidPhoto(file)) {
            event.target.value = "";
            resetPreview();
            return;
        }

        if (currentPreviewUrl) {
            URL.revokeObjectURL(currentPreviewUrl);
        }

        currentPreviewUrl = URL.createObjectURL(file);
        photoPreview.src = currentPreviewUrl;
        photoPreview.style.display = "block";
        if (uploadIcon) uploadIcon.style.display = "none";
        if (uploadLabel) uploadLabel.style.display = "none";
        if (uploadHint) uploadHint.style.display = "none";
    });
}
//send form
const sendForm = document.getElementById("send_project");
if (sendForm) {
    sendForm.addEventListener("click", async (event) => {
        event.preventDefault();
        const title = titleInput.value;
        const categoryId = document.getElementById("category_select").value;
        const photoFile = photoInput.files && photoInput.files[0];
        if (!title || !categoryId || !photoFile ) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }
        if (!isValidPhoto(photoFile)) {
            photoInput.value = "";
            resetPreview();
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", categoryId);
        formData.append("image", photoFile);

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Form submitted successfully:', data);
                const galleryEdit = document.getElementById("gallery_edt_content");
                if (galleryEdit) {
                    galleryEdit.appendChild(createProjectFigure(data));
                }
                notifyProjectCreated(data);
                titleInput.value = "";
                document.getElementById("category_select").selectedIndex = 0;
                photoInput.value = "";
                resetPreview();
            } else {
                const errorData = await response.json().catch(() => null);
                alert(errorData?.error || "Échec de l'ajout du projet.");
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
}

