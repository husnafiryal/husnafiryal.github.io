// UI Interaction Script for Una.dev

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navMobileLinks = document.querySelectorAll('.nav-mobile-links a');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.contains('open');
      if (isOpen) {
        navMobile.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMobile.classList.add('open');
        menuToggle.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking any link inside it
    navMobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple validation check
      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Display sending status
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status';

      // Simulate network request
      setTimeout(() => {
        formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        
        // Clear status message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, 1200);
    });
  }

  // 3. Projects Carousel Logic
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track ? track.children : []);
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  let currentSlide = 0;
  const slideCount = slides.length;

  const updateCarousel = (index) => {
    if (!track) return;
    
    // Bounds check and looping
    if (index >= slideCount) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slideCount - 1;
    } else {
      currentSlide = index;
    }

    // Shift the track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update pagination dots
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Auto-collapse all cards on slide change to prevent height layout shifts
    slides.forEach(slide => {
      if (slide.classList.contains('expanded')) {
        slide.classList.remove('expanded');
        const btn = slide.querySelector('.btn-project-toggle');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          const btnSpan = btn.querySelector('span');
          if (btnSpan) btnSpan.textContent = 'View Case Study';
        }
      }
    });
  };

  // Wire up Next/Prev button click event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
    });
  }

  // Wire up pagination dot click event listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });

  // Mobile Swipe Gesture Listeners
  let touchStartX = 0;
  let touchEndX = 0;

  const handleGesture = () => {
    const swipeThreshold = 50; // Minimum drag distance (px)
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe Left -> Next Slide
      updateCarousel(currentSlide + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe Right -> Prev Slide
      updateCarousel(currentSlide - 1);
    }
  };

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    }, { passive: true });
  }

  // 4. Project Card Collapsible Details Toggle
  const toggleBtns = document.querySelectorAll('.btn-project-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card') || btn.closest('.project-grid-card');
      if (!card) return;
      
      const isExpanded = card.classList.contains('expanded');
      const btnSpan = btn.querySelector('span');
      
      if (isExpanded) {
        card.classList.remove('expanded');
        btn.setAttribute('aria-expanded', 'false');
        if (btnSpan) btnSpan.textContent = 'View Case Study';
      } else {
        card.classList.add('expanded');
        btn.setAttribute('aria-expanded', 'true');
        if (btnSpan) btnSpan.textContent = 'Hide Case Study';
      }
    });
  });

  // 5. Scroll Observer: Auto-collapse cards when scrolling into Experience Section
  const experienceSection = document.getElementById('experience');
  if (experienceSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const expandedCards = document.querySelectorAll('.project-card.expanded, .project-grid-card.expanded');
          expandedCards.forEach(card => {
            card.classList.remove('expanded');
            const btn = card.querySelector('.btn-project-toggle');
            if (btn) {
              btn.setAttribute('aria-expanded', 'false');
              const btnSpan = btn.querySelector('span');
              if (btnSpan) btnSpan.textContent = 'View Case Study';
            }
          });
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.15 // trigger when 15% of the experience section is visible
    });
    observer.observe(experienceSection);
  }

  // 6. Project Category Filtering (for projects.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectGridCards = document.querySelectorAll('.project-grid-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectGridCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

});
