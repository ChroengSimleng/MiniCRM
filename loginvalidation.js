document.addEventListener('DOMContentLoaded', function () {
  // Login form submission handling
  document.querySelector('form')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded valid credentials (replace with a backend validation in production)
    const validUsername = "user123";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        // Save user session information in localStorage (optional)
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
        const errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.className = 'text-danger mt-2';
            errorDiv.innerText = 'Invalid username or password';
            this.appendChild(errorDiv); // Append error message below the form
        }
    }
  });

  
});

