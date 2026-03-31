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
};
const modify_btn = document.getElementById('modify-btn');
if (token === null) {
    modify_btn.style.display = 'none';
    
}
else {
    modify_btn.style.display = 'block';
}
//!!
//popover navigation between gallery and add-photo dialogs
const popoverSwitchBtns = document.querySelectorAll('[data-switch-popover]');

popoverSwitchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-switch-popover');
        const hideId = btn.getAttribute('data-hide-popover');

        const targetPopover = targetId ? document.getElementById(targetId) : null;
        const hidePopover = hideId ? document.getElementById(hideId) : null;

        if (hidePopover && typeof hidePopover.hidePopover === 'function') {
            hidePopover.hidePopover();
        }

        if (targetPopover && typeof targetPopover.showPopover === 'function') {
            targetPopover.showPopover();
        }
    });
});

// Close popover when clicking outside modal content.
const popovers = document.querySelectorAll('.modal[popover]');

popovers.forEach((popover) => {
    popover.addEventListener('click', (event) => {
        const modalCard = popover.querySelector('.modal_card');

        if (!modalCard || modalCard.contains(event.target)) {
            return;
        }

        if (typeof popover.hidePopover === 'function') {
            popover.hidePopover();
        }
    });
});


