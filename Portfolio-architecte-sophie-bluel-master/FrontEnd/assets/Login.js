// fetch login
fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "user@example.com",    
        password: "password123"
    })
})

async function login() {
    const email = document.getElementById('.email').value;
    const password = document.getElementById('.password').value;
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            alert('Login failed. Please check your credentials and try again.')
            console.error('Login failed:', response.statusText);
            const errorData = await response.json();
            console.error('Error details:', errorData);
            alert(`Login failed: ${errorData.message}`);

        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
    
}
login();

const loginButton = document.querySelector('#loginButton');
loginButton.addEventListener('click', (event) => {
  const email = event.target.querySelector('.email').value;
  const password = event.target.querySelector('.password').value;
    if (!email || !password) {
        event.preventDefault();
        alert('Please fill in both email and password fields.');
    }
    else {
        login();
    }
});

loginButton.addEventListener('click', login);



