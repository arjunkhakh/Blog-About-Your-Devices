const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const user = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
  
    if (user && password) {
        debugger;
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ user, password }),
        headers: { "Content-Type": "application/json" },
      });
      
      
      
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace("/homepage");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const loginForm = document.getElementById("login-form");
  
  loginForm.addEventListener("submit", loginFormHandler);
  