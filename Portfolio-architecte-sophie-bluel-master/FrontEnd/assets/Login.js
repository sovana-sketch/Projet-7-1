// fetch login

// Get form elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Create error message elements and insert them after inputs
const emailError = document.createElement("div");
emailError.className = "error-message";
emailInput.parentElement.insertBefore(emailError, emailInput.nextSibling);

const passwordError = document.createElement("div");
passwordError.className = "error-message";
passwordInput.parentElement.insertBefore(passwordError, passwordInput.nextSibling);

// Validation functions
function validateEmail(email) {
    if (!email || email.trim() === "") {
        emailError.textContent = "L'adresse email est obligatoire.";
        emailError.style.display = "block";
        return false;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Veuillez entrer une adresse email valide.";
        emailError.style.display = "block";
        return false;
    }
    emailError.style.display = "none";
    return true;
}

function validatePassword(password) {
    if (!password || password.trim() === "") {
        passwordError.textContent = "Le mot de passe est obligatoire.";
        passwordError.style.display = "block";
        return false;
    }
    passwordError.style.display = "none";
    return true;
}

// Clear errors on input change
emailInput.addEventListener("input", () => {
    emailError.style.display = "none";
});

passwordInput.addEventListener("input", () => {
    passwordError.style.display = "none";
});

async function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Validate fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
              
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json().catch(() => null);
            // Display error under email field for credentials error
            emailError.textContent = errorData?.message || "Identifiants incorrects. Veuillez réessayer.";
            emailError.style.display = "block";
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        emailError.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
        emailError.style.display = "block";
    }
}


const loginform = document.getElementById('loginform');
loginform.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    login();

});



