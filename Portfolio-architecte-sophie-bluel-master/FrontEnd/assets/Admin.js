let token = window.localStorage.getItem('token');
console.log(token);

//login/logout
const log_link = document.getElementById('nav-links');
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
    logout_link.appendChild(logout_a);
    logout_a.addEventListener('click', () => {
        console.log('logout');
        window.localStorage.removeItem('token');
        window.location.href = './index.html';
    });
}
//filter disables
const unfilters = document.querySelectorAll('[data-filter]');
console.log(unfilters);
if (token) {
    unfilters.forEach(unfilter => {
        unfilter.style.display = 'none';
    });
} else {
    unfilters.forEach(unfilter => {
        unfilter.style.display = 'block';
    });
}

//modal btn

const edit_btn = document.getElementById('edit-btn');
if (token === null) {
    edit_btn.style.display = 'none';
}
else {
    edit_btn.style.display = 'block';
}
const valid_btn = document.getElementById('valid_btn');
edit_btn.addEventListener('click', () => {
    mode_edition.classList.add('show');
});
const btn_back = document.getElementById('btn-back');
const mode_edition = document.getElementById('mode_edition');
const mode_edition2 = document.getElementById('mode_edition2');

valid_btn.addEventListener('click', () => {
    mode_edition2.classList.add('show');
});
btn_back.addEventListener('click', () => {
    mode_edition.classList.add('show');
    mode_edition2.classList.remove('show');
});

const btn_close = document.querySelectorAll('.btn_close');
btn_close.forEach(btn => {
    btn.addEventListener('click', () => {
        mode_edition.classList.remove('show');
        mode_edition2.classList.remove('show');
    });
});

[mode_edition, mode_edition2].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            mode_edition.classList.remove('show');
            mode_edition2.classList.remove('show');
        }
    });
});