document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("successMsg").textContent = "";
  
    let hasError = false;
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      hasError = true;
    }
  
    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      hasError = true;
    } else if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent = "Invalid email format.";
      hasError = true;
    }
  
    if (message === "") {
      document.getElementById("messageError").textContent = "Message cannot be empty.";
      hasError = true;
    }
  
    if (!hasError) {
      document.getElementById("successMsg").textContent = "Form submitted successfully!";
      // Reset form (optional)
      document.getElementById("contactForm").reset();
    }
  });
  