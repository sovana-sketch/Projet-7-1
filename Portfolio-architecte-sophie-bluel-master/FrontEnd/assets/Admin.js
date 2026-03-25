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
    logout.appendChild(logout_a);
    logout_a.addEventListener('click', () => {
        console.log('logout');
        window.localStorage.removeItem('token');
        window.location.href = './index.html';
    });
}

//modal


if (token) {
   

}