let token = window.localStorage.getItem('token');
console.log(token);

//login/logout
const log_link = document.getElementById('navv-links');
const logout_link = document.getElementById('logout');
const login_link = document.getElementById('login-link');
if (token === null) {
    const login_a = document.createElement('a');
    login_a.href = './Login.html';
    login_a.textContent = 'login';
    login_link.appendChild(login_a);
}
else {
    const logout_a = document.createElement('a');
    logout_a.href = '#';
    logout_a.textContent = 'logout';
    logout.appendChild(logout_a);
    logout_a.addEventListener('click', () => {
        window.localStorage.removeItem('token');
        window.location.href = './index.html';
    });
}

//modal

const edit_mode = document.getElementById('mode_edition');
if (token) {
    const edit_button = document.createElement('button');
    edit_button.textContent = 'Mode édition';
    // Style du bouton
    edit_button.style.position = 'absolute';
    edit_button.style.top = '0%';
    edit_button.style.left = '0%';
    edit_button.style.width = '100%'
    edit_button.style.height = '5%';
    edit_button.style.backgroundColor = '#000000';
    edit_button.style.color = '#ffffff';
    edit_button.style.border = 'none';
    edit_mode.appendChild(edit_button);
    // Ajouter un événement de clic pour afficher la modale
    edit_button.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
    });
}   

const modal = document.createElement('div');
modal.id = 'modal';
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.transform = 'translateY(-50%)';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.backgroundColor = '#fff';
modal.style.padding = '20px';
modal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
document.body.appendChild(modal);

