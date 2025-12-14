// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize VanillaTilt for 3D effects
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.05
    });
  }

  // Animated Counter for KPIs
  const counters = document.querySelectorAll('.kpi-number');
  const speed = 200;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  };

  // Intersection Observer for counters
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('show');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.site-nav a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('show');
        navToggle.classList.remove('active');
      });
    });
  }

  // Current Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Dynamic Projects Grid
  const projectsGrid = document.getElementById('projectsGrid');
  const projects = [
    {
      name: "HSSH NGO",
      type: "Website & Branding",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop&crop=center"
    },
    {
      name: "Klasetu E-commerce",
      type: "E-commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop&crop=center"
    },
    {
      name: "FinTech Dashboard",
      type: "Web Application",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-400&h=225&fit=crop&crop=center"
    },
    {
      name: "HealthCare App",
      type: "Mobile Interface",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop&crop=center"
    },
    {
      name: "Restaurant Branding",
      type: "Brand Identity",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop&crop=center"
    },
    {
      name: "Travel Portal",
      type: "Booking System",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=225&fit=crop&crop=center"
    }
  ];

  if (projectsGrid) {
    projects.forEach(project => {
      const tile = document.createElement('a');
      tile.href = '#';
      tile.className = 'project-tile';
      tile.setAttribute('data-tilt', '');
      tile.setAttribute('data-tilt-max', '10');
      
      tile.innerHTML = `
        <img src="${project.image}" alt="${project.name}" loading="lazy">
        <div class="project-overlay">
          <h4>${project.name}</h4>
          <p>${project.type}</p>
        </div>
      `;
      
      projectsGrid.appendChild(tile);
    });
    
    // Re-initialize tilt for new elements
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.project-tile'), {
        max: 10,
        speed: 300,
        glare: true,
        'max-glare': 0.15
      });
    }
  }

  // Form Submission with Animation
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate API call (replace with actual FormSubmit.co)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      } catch (error) {
        // Show error message
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
      } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect for hero device
  const device3d = document.getElementById('device3d');
  
  if (device3d) {
    window.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      
      device3d.style.transform = `
        rotateY(${xAxis}deg)
        rotateX(${yAxis}deg)
        translateZ(20px)
      `;
    });
  }

  // Add scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service, .project-tile, .testi, .card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.style.animation = 'slideUp 0.6s ease forwards';
      }
    });
  };

  // Initial animation check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Add hover effect to services
  document.querySelectorAll('.service').forEach(service => {
    service.addEventListener('mouseenter', () => {
      service.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    service.addEventListener('mouseleave', () => {
      service.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
});

// Add 3D hover effect to header brand
const brand = document.querySelector('.brand');
if (brand) {
  brand.addEventListener('mousemove', (e) => {
    const rect = brand.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    brand.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  });
  
  brand.addEventListener('mouseleave', () => {
    brand.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
}
