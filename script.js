document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. Loading Screen
  --------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 600);
  });

  /* ---------------------------------------------------
     2. Footer year
  --------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------
     3. Sticky Navbar + blur on scroll
  --------------------------------------------------- */
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    toggleScrollTopBtn();
    highlightActiveNav();
  });

  /* ---------------------------------------------------
     4. Collapse mobile menu on link click
  --------------------------------------------------- */
  const navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------------------------------------------------
     5. Smooth Scrolling (native CSS scroll-behavior handles
        most, but offset for fixed navbar via JS)
  --------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------------------------------------------
     6. Active Section Highlighting
  --------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  function highlightActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ---------------------------------------------------
     7. Typing Animation
  --------------------------------------------------- */
  const typedTextEl = document.getElementById('typed-text');
  const typingStrings = [
    'Computer Science Engineer',
    'Full Stack Developer',
    'IoT Enthusiast',
    'Problem Solver'
  ];
  let strIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const current = typingStrings[strIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    typedTextEl.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === current.length) {
      speed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      strIndex = (strIndex + 1) % typingStrings.length;
      speed = 400;
    }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------------------------------------------------
     8. Scroll-to-top button
  --------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  function toggleScrollTopBtn() {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     9. Theme Toggle (Dark default / Light)
  --------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(light) {
    document.body.classList.toggle('light-theme', light);
    themeIcon.className = light ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  }
  // In-memory only (no localStorage per artifact restrictions) — defaults to dark.
  let isLight = false;
  themeToggle.addEventListener('click', () => {
    isLight = !isLight;
    setTheme(isLight);
  });

  /* ---------------------------------------------------
     10. Intersection Observer — Scroll Reveal Animations
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     11. Animated Counters
  --------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 20);
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, stepTime);
  }

  /* ---------------------------------------------------
     12. Skill Progress Bar Animation
  --------------------------------------------------- */
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') + '%';
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  progressBars.forEach(bar => progressObserver.observe(bar));

  /* ---------------------------------------------------
     13. Project Filtering
  --------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ---------------------------------------------------
     14. Contact Form Validation + Success Message
  --------------------------------------------------- */
 // Initialize EmailJS
emailjs.init("Zn8Wyli0SUo6lMpT3");

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
    }

    emailjs.sendForm(
        "service_xckqxbz",
        "template_1lh281t",
        this
    )
    .then(function () {
        formSuccess.classList.remove("d-none");
        contactForm.reset();
        contactForm.classList.remove("was-validated");

        setTimeout(() => {
            formSuccess.classList.add("d-none");
        }, 5000);
    })
    .catch(function (error) {
        alert("Failed to send email.\n" + JSON.stringify(error));
        console.error(error);
    });
});
  
  /* Initial state on load */
  toggleScrollTopBtn();
  highlightActiveNav();
});
