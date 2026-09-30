/**
 * M&M Services — Modern Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    // Close mobile drawer when clicking any link
    document.querySelectorAll('.drawer-link, .drawer-btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(7, 9, 14, 0.95)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      navbar.style.background = 'rgba(7, 9, 14, 0.82)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.07)';
    }
  });

  // 4. KPI Stat Counters with IntersectionObserver
  const counterElements = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600; // ms
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out function
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutQuad * target);

        counter.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // 5. Portfolio Filtering System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const content = currentItem.querySelector('.accordion-content');
      const isAlreadyActive = currentItem.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
        item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // If clicked item wasn't open, open it
      if (!isAlreadyActive) {
        currentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (accordionHeaders.length > 0) {
    const firstItem = accordionHeaders[0].parentElement;
    const firstContent = firstItem.querySelector('.accordion-content');
    firstItem.classList.add('active');
    accordionHeaders[0].setAttribute('aria-expanded', 'true');
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  // 7. Active Nav Link on Scroll (Spy Scroll)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
});

/**
 * Handle Contact Form submission & redirect to WhatsApp
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim() || 'Not specified';
  const service = form.service.value;
  const message = form.message.value.trim();

  if (!name || !phone || !message) {
    formStatus.textContent = 'Please fill out all required fields (*).';
    formStatus.className = 'form-status error';
    return false;
  }

  // M&M Services WhatsApp Number
  const whatsappNumber = '919622337107';

  // Format message for WhatsApp
  const formattedMsg = 
    `*🚀 New Project Inquiry — M&M Services*\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Email:* ${email}\n` +
    `*Service Requested:* ${service}\n\n` +
    `*Project Details:*\n${message}\n\n` +
    `_Sent via mm-services.vercel.app_`;

  const waURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMsg)}`;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Connecting to WhatsApp...</span>';
  formStatus.textContent = 'Redirecting to WhatsApp with your details...';
  formStatus.className = 'form-status success';

  setTimeout(() => {
    window.open(waURL, '_blank');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send via WhatsApp &rarr;</span>';
    formStatus.textContent = 'Message prepared! If WhatsApp didn’t open, click the button again or use the floating button.';
    form.reset();
  }, 600);

  return false;
}
