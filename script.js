// SCRIPT.JS - Interactivity & Visual Effects for Vijender Singh's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 0. HELLO INTRO GREETING ANIMATION
  const helloOverlay = document.getElementById('hello-overlay');
  const helloBar = document.getElementById('hello-accent-bar');
  const helloText = document.getElementById('hello-text');
  const helloSub = document.getElementById('hello-sub');

  if (helloOverlay) {
    setTimeout(() => {
      if (helloBar) {
        helloBar.style.opacity = '1';
        helloBar.style.transform = 'scaleX(1)';
      }
    }, 150);

    setTimeout(() => {
      if (helloText) {
        helloText.style.opacity = '1';
        helloText.style.transform = 'translateY(0)';
      }
    }, 350);

    setTimeout(() => {
      if (helloSub) {
        helloSub.style.opacity = '1';
      }
    }, 650);

    setTimeout(() => {
      helloOverlay.style.opacity = '0';
      setTimeout(() => {
        helloOverlay.style.display = 'none';
      }, 800);
    }, 2100);
  }

  // 1. THEME TOGGLE (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. CUSTOM CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (cursor) {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    }
  });

  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    if (ring) {
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover expansion on interactive elements
  const hoverElements = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .cert-card, .hobby-card, .stat, .btn-primary, .btn-ghost, .btn-download, .theme-toggle-btn, .contact-link'
  );

  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
      if (ring) ring.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      if (ring) ring.style.opacity = '0.5';
    });
  });

  // 2. PARTICLE TRAIL CANVAS
  const canvas = document.getElementById('trail-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#e63946', '#f4a261', '#2a9d8f', '#f7c948'];
    const particles = [];

    document.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          decay: 0.02 + Math.random() * 0.02,
        });
      }
    });

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.97;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 3. SCROLL REVEAL (FADE-UP)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  // 4. SKILL BARS ANIMATION ON SCROLL
  const skillGrid = document.querySelector('.skills-grid');
  if (skillGrid) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
              const targetWidth = bar.getAttribute('data-width') || bar.style.width;
              bar.style.width = '0';
              setTimeout(() => {
                bar.style.width = targetWidth;
              }, 150);
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    barObserver.observe(skillGrid);
  }

  // 5. ACTIVE NAV LINK HIGHLIGHTING
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 220) {
        current = s.id;
      }
    });

    navLinks.forEach((a) => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  });

  // 6. MOBILE MENU TOGGLE
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-links');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.textContent = navList.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking on a link
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
      });
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (navList.classList.contains('active') && !navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
      }
    });
  }

  // 7. AJAX QUERY FORM SUBMISSION (No external page redirects)
  const queryForm = document.getElementById('queryForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const formErrorMsg = document.getElementById('formErrorMsg');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (queryForm) {
    queryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formErrorMsg) formErrorMsg.style.display = 'none';

      // Set loading state
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = 'Sending Message... ⏳';

      try {
        const formData = new FormData(queryForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('https://formsubmit.co/ajax/svijender130@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          // Hide form and display sleek custom success interface
          queryForm.style.display = 'none';
          queryForm.reset();
          if (formSuccessBox) {
            formSuccessBox.style.display = 'flex';
          }
        } else {
          throw new Error(result.message || 'Submission failed. Please try again.');
        }
      } catch (err) {
        if (formErrorMsg) {
          formErrorMsg.textContent = 'Oops! Unable to send message. Please email directly at svijender130@gmail.com';
          formErrorMsg.style.display = 'block';
        }
      } finally {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // Handle "Send Another Message" button
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      if (formSuccessBox) formSuccessBox.style.display = 'none';
      if (queryForm) queryForm.style.display = 'flex';
      if (formErrorMsg) formErrorMsg.style.display = 'none';
    });
  }

  // Welcome console message
  console.log(
    "%c Vijender Singh %c B.Tech Student in AI & Data Science | Portfolio Ready ",
    "background: #e63946; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 3px 0 0 3px;",
    "background: #1a1a2e; color: #f4a261; padding: 4px 8px; border-radius: 0 3px 3px 0;"
  );
});
