// script.js
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('show');
      navToggle.classList.toggle('open');
    });
  }

  // contact form submit (FormSubmit.co)
  const contactForm = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = contactForm.querySelector('input[name="_next"]').value;
        } else {
          response.json().then(data => {
            status.textContent = data.errors?.map(err => err.message).join(', ') || 'Oops! Something went wrong.';
          });
        }
      })
      .catch(() => {
        status.textContent = 'Network error. Please try again later.';
      });
    });
  }
});
