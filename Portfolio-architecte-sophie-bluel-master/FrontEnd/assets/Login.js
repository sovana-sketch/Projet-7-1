// fetch login

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    debugger;
    try {

        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password })
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


const loginform = document.getElementById('loginform');
loginform.addEventListener('submit',  (event) => {
    event.preventDefault();
  debugger;
    login();
  
});


