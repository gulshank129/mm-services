// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  navToggle?.addEventListener('click', () => {
    siteNav.classList.toggle('show');
  });

  // KPI counters (simple, visible)
  document.querySelectorAll('.kpi-number').forEach(node => {
    const target = parseInt(node.dataset.target || '0', 10);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) node.textContent = target;
      else { node.textContent = current; requestAnimationFrame(tick); }
    };
    tick();
  });

  // Projects data (edit filenames/URLs as needed)
  const projects = [
    { name: "HSSH NGO", logo: "clients/hssh-logo.png", url: "https://hsshngo.org" },
    { name: "SGW Foundation", logo: "clients/sgw-logo.png", url: "https://sgwfoundation.org" },
    { name: "Client 3", logo: "clients/client3.png", url: "#" },
    { name: "Client 4", logo: "clients/client4.png", url: "#" },
    { name: "Client 5", logo: "clients/client5.png", url: "#" }
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    projects.forEach(p => {
      const a = document.createElement('a');
      a.className = 'project-tile';
      a.href = p.url || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = p.name;

      const img = document.createElement('img');
      img.src = p.logo;
      img.alt = p.name;

      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      overlay.textContent = p.name;

      a.appendChild(img);
      a.appendChild(overlay);
      projectsGrid.appendChild(a);
    });

    // Init tilt on desktop only
    if (window.innerWidth > 720 && window.VanillaTilt) {
      VanillaTilt.init(document.querySelectorAll('.project-tile'), { max: 10, glare: true, "max-glare": 0.15, speed: 350, scale: 1.02 });
      VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 8, glare: true, "max-glare": 0.08, speed: 350, scale: 1.01 });
    }
  }
  renderProjects();

  // Contact form submit with FormSubmit.co
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formStatus.textContent = 'Sending...';
      fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      }).then(res => {
        if (res.ok) {
          window.location.href = contactForm.querySelector('input[name="_next"]').value;
        } else {
          res.json().then(data => {
            formStatus.textContent = data.errors?.map(x => x.message).join(', ') || 'Submission error';
          }).catch(()=> formStatus.textContent = 'Submission error');
        }
      }).catch(() => formStatus.textContent = 'Network error');
    });
  }

  // Close mobile nav on link click (small UX)
  document.querySelectorAll('#siteNav a').forEach(a => {
    a.addEventListener('click', () => {
      if (siteNav.classList.contains('show')) siteNav.classList.remove('show');
    });
  });

  // small accessibility: keyboard nav toggle close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('show')) siteNav.classList.remove('show');
  });
});
