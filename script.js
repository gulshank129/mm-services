// script.js

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animated SVG logo spin on load
  const svgLogo = document.getElementById('svgLogo');
  if (svgLogo) {
    svgLogo.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 1600, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => siteNav.classList.toggle('show'));
  }

  // VanillaTilt init on elements with data-tilt
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      glare: true,
      "max-glare": 0.18,
      speed: 350,
      scale: 1.02,
    });
  }

  // Portfolio clients data (edit these paths/names)
  const clients = [
    { name: "HSSH NGO", logo: "clients/hssh-logo.png", url: "https://hsshngo.org", desc: "Donation & volunteer portal with donation receipts." },
    { name: "SGW Foundation", logo: "clients/sgw-logo.png", url: "https://sgwfoundation.org", desc: "Campaign & donations, integrated forms." },
    { name: "Client 3", logo: "clients/client3.png", url: "#", desc: "Ecommerce and local booking integration." },
    { name: "Client 4", logo: "clients/client4.png", url: "#", desc: "Landing pages & ad funnel." },
    { name: "Client 5", logo: "clients/client5.png", url: "#", desc: "Custom dashboard & reporting." }
  ];

  const grid = document.getElementById('portfolioGrid');
  const modal = document.getElementById('caseModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLink = document.getElementById('modalLink');
  const modalClose = document.querySelector('.modal-close');

  function buildGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    clients.forEach(c => {
      const a = document.createElement('a');
      a.className = 'logo-link tilt';
      a.href = c.url || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = c.name;

      const img = document.createElement('img');
      img.src = c.logo;
      img.alt = c.name;
      a.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'logo-overlay';
      overlay.textContent = c.name;
      a.appendChild(overlay);

      // click opens modal preview (prevent default)
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(c);
      });

      grid.appendChild(a);
    });

    // re-init VanillaTilt on new nodes
    if (window.VanillaTilt) VanillaTilt.init(document.querySelectorAll('.tilt'), { glare: true, "max-glare":0.12, speed: 350, scale: 1.01 });
  }

  function openModal(client) {
    if (!modal) return;
    modalImg.src = client.logo;
    modalTitle.textContent = client.name;
    modalDesc.textContent = client.desc || '';
    modalLink.href = client.url || '#';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  buildGrid();

  // KPI counter animation
  const counters = document.querySelectorAll('.kpi-number');
  counters.forEach(node => {
    const target = +node.dataset.target || 0;
    let count = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const tick = () => {
      count += step;
      if (count >= target) node.textContent = target;
      else { node.textContent = count; requestAnimationFrame(tick); }
    };
    tick();
  });

  // simple parallax on mouse move for hero
  const hero = document.querySelector('.hero');
  const heroRight = document.getElementById('heroRight');
  if (hero && heroRight) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroRight.style.transform = `translate3d(${x * 10}px, ${y * -10}px, 0) rotateX(${y * 3}deg) rotateY(${x * 6}deg)`;
    });
    hero.addEventListener('mouseleave', () => heroRight.style.transform = '');
  }

  // contact form submit handling (FormSubmit)
  const contactForm = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Sending...';
      fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      }).then(r => {
        if (r.ok) {
          window.location.href = contactForm.querySelector('input[name="_next"]').value;
        } else {
          r.json().then(data => status.textContent = data.errors?.map(x=>x.message).join(', ') || 'Error');
        }
      }).catch(()=>status.textContent='Network error');
    });
  }

  // small accessibility: close modal with ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
