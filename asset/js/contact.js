document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("project-details");
    const toast = document.getElementById("toast");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
  
      // Validate form data
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("msg").value.trim();
  
      if (!name || !email || !message) {
        showToast("All fields are required.", "red");
        return;
      }
  
      if (!isValidEmail(email)) {
        showToast("Please enter a valid email address.", "red");
        return;
      }
  
      // Prepare form data
      const formData = { name, email, message };
  
      try {
        const response = await fetch("https://b8b6pa6lcl.execute-api.us-east-1.amazonaws.com/prod/solid-eng-mailer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          showToast("Thank you for contacting us! We will get back to you soon.", "green");
          form.reset(); // Reset the form on successful submission
        } else {
          throw new Error("Failed to send message. Please try again later.");
        }
      } catch (error) {
        showToast(error.message, "red");
      }
    });
  
    // Helper function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Helper function to show toast messages
    function showToast(message, color) {
      toast.style.color = color;
      toast.textContent = message;
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 5000);
    }
  });
  