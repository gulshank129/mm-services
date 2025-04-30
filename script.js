document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        })
          .then(response => {
            if (response.ok) {
              status.textContent = "Thanks for your message!";
              contactForm.reset();
            } else {
              response.json().then(data => {
                status.textContent =
                  data.errors?.map(error => error.message).join(", ") ||
                  "Oops! Something went wrong.";
              });
            }
          })
          .catch(() => {
            status.textContent = "Oops! Something went wrong.";
          });
      });
    }
  });
  