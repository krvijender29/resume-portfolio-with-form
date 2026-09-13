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
    'a, button, .skill-card, .project-card, .cert-card, .hobby-card, .stat, .btn-primary, .btn-ghost, .btn-download, .contact-link'
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

  // 8. SCROLL PROGRESS BAR & ELEVATED NAV & BACK-TO-TOP RING
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const navElement = document.querySelector('nav');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.querySelector('.progress-ring-circle');
  const circleRadius = progressCircle ? progressCircle.r.baseVal.value : 18;
  const circumference = 2 * Math.PI * circleRadius;

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  function handleScrollEffects() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Top Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Elevated Nav Shadow
    if (navElement) {
      if (scrollTop > 50) {
        navElement.classList.add('scrolled');
      } else {
        navElement.classList.remove('scrolled');
      }
    }

    // Back to Top Button Visibility & Ring Offset
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    if (progressCircle) {
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. DYNAMIC HERO TYPING / ROLE SWITCHER
  const dynamicRoleElem = document.getElementById('hero-dynamic-role');
  if (dynamicRoleElem) {
    const roles = ['Data Analyst', 'AI & ML Enthusiast', 'Streamlit Dashboard Dev', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        dynamicRoleElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeRole, typingSpeed);
    }
    typeRole();
  }

  // 10. MAGNETIC SPOTLIGHT & 3D TILT EFFECT ON CARDS
  const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card, .qual-item');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Mild 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 11. SKILLS CATEGORY FILTERING & PERCENT COUNTER ANIMATION
  const filterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // Percent Counter Animation
  function animatePercentCounters() {
    const percentNums = document.querySelectorAll('.skill-percent-num');
    percentNums.forEach((numElem) => {
      const target = parseInt(numElem.getAttribute('data-target') || '0', 10);
      let count = 0;
      const duration = 1200;
      const stepTime = Math.abs(Math.floor(duration / target));
      const timer = setInterval(() => {
        count += 1;
        numElem.textContent = `${count}%`;
        if (count >= target) {
          clearInterval(timer);
          numElem.textContent = `${target}%`;
        }
      }, stepTime);
    });
  }

  // Trigger percentage counters when skill grid comes into view
  if (skillGrid) {
    let countTriggered = false;
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countTriggered) {
          animatePercentCounters();
          countTriggered = true;
        }
      });
    }, { threshold: 0.2 });
    countObserver.observe(skillGrid);
  }

  // 12. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = 'svijender130@gmail.com';
      try {
        await navigator.clipboard.writeText(emailText);
        copyEmailBtn.textContent = 'Copied! ✓';
        showToast('Email address copied to clipboard! 📋');
        setTimeout(() => {
          copyEmailBtn.textContent = '📋 Copy';
        }, 2500);
      } catch (err) {
        showToast('Direct email: svijender130@gmail.com');
      }
    });
  }

  // 13. FULL-SCREEN SCROLL-CONTROLLED 300-FRAME CHARACTER ANIMATION (Individual Full-Quality JPG Frames)
  const scrollCanvas = document.getElementById('hero-scroll-canvas');
  if (scrollCanvas) {
    const ctx = scrollCanvas.getContext('2d');
    const TOTAL_FRAMES = 300;
    const frameImages = new Array(TOTAL_FRAMES);

    let targetProgress = 0;   // 0.0 (top) to 1.0 (end of hero scroll range)
    let currentProgress = 0;  // Eased progress for ultra-smooth 60fps interpolation
    let lastDrawnIndex = -1;

    // Responsive Canvas Resize (covering hero viewport with retina DPR)
    function resizeCanvas() {
      const hero = document.querySelector('.hero');
      const w = hero ? hero.clientWidth : window.innerWidth;
      const h = hero ? hero.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      scrollCanvas.width = Math.round(w * dpr);
      scrollCanvas.height = Math.round(h * dpr);

      // Re-draw active frame immediately after resize
      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
      drawFrameCover(targetIndex);
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Object-fit: cover rendering engine on canvas
    function drawFrameCover(frameIndex) {
      // Find requested image or nearest already-loaded frame to eliminate blank flash
      let img = frameImages[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const down = frameIndex - offset;
          const up = frameIndex + offset;
          if (down >= 0 && frameImages[down] && frameImages[down].complete) {
            img = frameImages[down];
            break;
          }
          if (up < TOTAL_FRAMES && frameImages[up] && frameImages[up].complete) {
            img = frameImages[up];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = scrollCanvas.width;
      const ch = scrollCanvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Calculate scale to cover canvas (100vw x 100vh)
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;

      // Character positioning:
      // Position character prominently on the RIGHT side (clear of the left text)
      const isMobile = window.innerWidth <= 768;
      const charTargetX = isMobile ? (cw * 0.5) : (cw * 0.74);
      const nx = charTargetX - (nw * 0.5);
      // Anchor vertically so hair and head sit comfortably below the top banner (navbar)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const verticalShift = (isMobile ? 32 : 65) * dpr;
      const ny = ((ch - nh) * 0.15) + verticalShift;

      ctx.fillStyle = '#f2e7d3';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);

      // Feather left edge of frame so it blends seamlessly into the background with zero visible boundary
      if (nx > 0) {
        const featherW = Math.min(140 * dpr, (cw - nx) * 0.25);
        const featherGrad = ctx.createLinearGradient(nx, 0, nx + featherW, 0);
        featherGrad.addColorStop(0, '#f2e7d3');
        featherGrad.addColorStop(1, 'rgba(242, 231, 211, 0)');
        ctx.fillStyle = featherGrad;
        ctx.fillRect(nx, 0, featherW, ch);
      }

      lastDrawnIndex = frameIndex;
    }

    // 1. Instant First Paint: Load neutral front frame (frame_001.jpg) immediately
    const neutralImg = new Image();
    neutralImg.src = './frames/frame_001.jpg';
    neutralImg.onload = () => {
      frameImages[0] = neutralImg;
      resizeCanvas();
      drawFrameCover(0);
    };
    frameImages[0] = neutralImg;

    // 2. Preload remaining 299 frames sequentially in background
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `./frames/frame_${String(i).padStart(3, '0')}.jpg`;
      frameImages[i - 1] = img;
    }

    // 3. Scroll progress calculation
    // 0% at scrollY = 0 (top of page, neutral front-facing pose)
    // 100% when scrolled past the hero section (head smoothly tilted down)
    function updateScrollProgress() {
      const hero = document.querySelector('.hero');
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetProgress = Math.min(1, Math.max(0, scrollY / heroHeight));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    resizeCanvas();

    // 4. Smooth 60 FPS requestAnimationFrame Loop with lerp interpolation
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Lerp easing ensures silky-smooth frame transitions even on fast scrolls/flicks
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.0002) {
        currentProgress += delta * 0.12;
      } else {
        currentProgress = targetProgress;
      }

      // Map progress (0.0 to 1.0) to frame index (0 to 299)
      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));

      if (targetIndex !== lastDrawnIndex) {
        drawFrameCover(targetIndex);
      }
    }

    renderLoop();
  }

  // Welcome console message
  console.log(
    "%c Vijender Singh %c B.Tech Student in AI & Data Science | Portfolio Ready ",
    "background: #e63946; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 3px 0 0 3px;",
    "background: #1a1a2e; color: #f4a261; padding: 4px 8px; border-radius: 0 3px 3px 0;"
  );
});
