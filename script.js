// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Insert dynamic client portfolio from a data array
  const portfolioGrid = document.getElementById('portfolioGrid');

  // --- Add your clients here (edit this array) ---
  // filename should exist in /clients/ folder (or use full URL)
  const clients = [
    { name: "HSSH NGO", logo: "clients/hssh-logo.png", url: "https://hsshngo.org" },
    { name: "SGW Foundation", logo: "clients/sgw-logo.png", url: "https://sgwfoundation.org" },
    { name: "Client 3", logo: "clients/client3.png", url: "#" },
    { name: "Client 4", logo: "clients/client4.png", url: "#" },
    { name: "Client 5", logo: "clients/client5.png", url: "#" }
  ];

  // Render logos
  function renderClients() {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';
    clients.forEach(c => {
      const a = document.createElement('a');
      a.className = 'logo-link';
      a.href = c.url || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = c.name;

      const img = document.createElement('img');
      img.src = c.logo;
      img.alt = c.name + ' logo';
      a.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'logo-overlay';
      overlay.textContent = c.name;
      a.appendChild(overlay);

      portfolioGrid.appendChild(a);
    });
  }

  renderClients();

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('show');
      navToggle.classList.toggle('open');
    });
  }

  // Animated KPI counters
  const counters = document.querySelectorAll('.kpi-number');
  counters.forEach(node => {
    const target = parseInt(node.dataset.target || '0', 10);
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(target / (duration / 30));
    const inc = () => {
      start += step;
      if (start >= target) {
        node.textContent = target;
      } else {
        node.textContent = start;
        requestAnimationFrame(inc);
      }
    };
    inc();
  });

  // Contact form submit (FormSubmit.co)
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
            status.textContent = data.errors?.map(err => err.message).join(', ') || 'Something went wrong.';
          });
        }
      })
      .catch(() => {
        status.textContent = 'Network error. Please try again later.';
      });
    });
  }
});
