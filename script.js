// SCRIPT.JS - Interactivity & Visual Effects for Vijender Singh's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. CUSTOM CURSOR
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
    'a, button, .skill-card, .project-card, .cert-card, .stat, .btn-primary, .btn-ghost, .contact-link'
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
              const targetWidth = bar.style.width;
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

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
      });
    });
  }
});