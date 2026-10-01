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
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. CUSTOM CURSOR & CANVAS TRAIL (Desktop fine pointer only - saves mobile CPU/battery)
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = -100, my = -100, rx = -100, ry = -100;
  let ringRafId = null;

  if (hasFinePointer && (cursor || ring)) {
    function updateRing() {
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringRafId = requestAnimationFrame(updateRing);
      } else {
        ringRafId = null;
      }
    }

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
      if (!ringRafId) {
        ringRafId = requestAnimationFrame(updateRing);
      }
    }, { passive: true });

    // Hover expansion on interactive elements
    const hoverElements = document.querySelectorAll(
      'a, button, .skill-card, .project-card, .cert-card, .hobby-card, .stat, .btn-primary, .btn-ghost, .btn-download, .theme-toggle-btn, .contact-link'
    );

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
        if (ring) ring.style.opacity = '0.2';
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        if (ring) ring.style.opacity = '0.5';
      }, { passive: true });
    });
  }

  // 2B. PARTICLE TRAIL CANVAS (Idle RAF auto-sleep: 0% CPU when stationary)
  const canvas = document.getElementById('trail-canvas');
  if (hasFinePointer && canvas) {
    const ctx = canvas.getContext('2d');
    let canvasW = window.innerWidth;
    let canvasH = window.innerHeight;

    function resizeCanvas() {
      canvasW = canvas.width = window.innerWidth;
      canvasH = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const colors = ['#e63946', '#f4a261', '#2a9d8f', '#f7c948'];
    const particles = [];
    let particleRafId = null;

    function animateParticles() {
      ctx.clearRect(0, 0, canvasW, canvasH);
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

      if (particles.length > 0) {
        particleRafId = requestAnimationFrame(animateParticles);
      } else {
        particleRafId = null;
      }
    }

    document.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          decay: 0.025 + Math.random() * 0.02,
        });
      }
      if (!particleRafId) {
        particleRafId = requestAnimationFrame(animateParticles);
      }
    }, { passive: true });
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

  // 5. ACTIVE NAV LINK HIGHLIGHTING (IntersectionObserver for zero layout thrashing)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((a) => {
              if (a.getAttribute('href') === '#' + id) {
                a.classList.add('active');
              } else {
                a.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

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

  // 7. AJAX QUERY FORM SUBMISSION (With Google reCAPTCHA v3 Invisible Protection)
  const queryForm = document.getElementById('queryForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const formErrorMsg = document.getElementById('formErrorMsg');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (queryForm) {
    queryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (formErrorMsg) formErrorMsg.style.display = 'none';

      // Set loading state
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = 'Sending Message... ⏳';

      const sendFormData = async (token) => {
        try {
          const formData = new FormData(queryForm);
          const data = Object.fromEntries(formData.entries());
          if (token) {
            data['g-recaptcha-response'] = token;
          }

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
      };

      // Execute Google reCAPTCHA v3 token generation
      if (typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
        grecaptcha.ready(() => {
          grecaptcha.execute('6Lfb2NktAAAAAGFN55Z2kvePwFcSybgS51BiAyag', { action: 'submit' })
            .then((token) => {
              sendFormData(token);
            })
            .catch(() => {
              // Fallback without blocking user submission
              sendFormData('');
            });
        });
      } else {
        sendFormData('');
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

  // 10. MAGNETIC SPOTLIGHT & 3D TILT EFFECT ON CARDS (Cached geometry, no layout thrashing)
  if (window.matchMedia('(hover: hover)').matches) {
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card, .qual-item');
    cards.forEach((card) => {
      let rect = null;
      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
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
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        rect = null;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

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

  // 13. FULL-SCREEN SCROLL-CONTROLLED CHARACTER ANIMATION (Optimized WebP, Tiered Loading, Smart RAF)
  const scrollCanvas = document.getElementById('hero-scroll-canvas');
  if (scrollCanvas) {
    const ctx = scrollCanvas.getContext('2d');
    const TOTAL_FRAMES = 66;
    const frameImages = new Array(TOTAL_FRAMES);
    const frameLoaded = new Array(TOTAL_FRAMES).fill(false);

    let targetProgress = 0;   // 0.0 (top, face looking up) to 1.0 (scrolled, face looking down)
    let currentProgress = 0;  // Eased progress for smooth, snappy 60fps tracking
    let lastDrawnIndex = -1;
    let rafActive = false;

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
      let img = frameImages[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const down = frameIndex - offset;
          const up = frameIndex + offset;
          if (down >= 0 && frameImages[down] && frameImages[down].complete && frameImages[down].naturalWidth > 0) {
            img = frameImages[down];
            break;
          }
          if (up < TOTAL_FRAMES && frameImages[up] && frameImages[up].complete && frameImages[up].naturalWidth > 0) {
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

      // Character positioning on right side
      const isMobile = window.innerWidth <= 768;
      const charTargetX = isMobile ? (cw * 0.5) : (cw * 0.74);
      const nx = charTargetX - (nw * 0.5);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const verticalShift = (isMobile ? 32 : 65) * dpr;
      const ny = ((ch - nh) * 0.15) + verticalShift;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);

      lastDrawnIndex = frameIndex;
    }

    // Helper to load a single frame
    function loadFrame(idx, onLoaded) {
      if (frameImages[idx]) return frameImages[idx];
      const img = new Image();
      img.src = `./ezgif-frame-webp/ezgif-frame-${String(idx + 1).padStart(3, '0')}.webp`;
      img.onload = () => {
        frameLoaded[idx] = true;
        if (onLoaded) onLoaded(idx);
        const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
        if (targetIdx === idx && lastDrawnIndex !== targetIdx) {
          drawFrameCover(targetIdx);
        }
      };
      frameImages[idx] = img;
      return img;
    }

    // 1. Instant First Paint: Load neutral front frame immediately (already preloaded in <head>)
    loadFrame(0, () => {
      resizeCanvas();
      drawFrameCover(0);
    });

    // 2. Tier 1: Buffer initial scroll frames (frames 1 to 9) immediately
    for (let i = 1; i <= 9 && i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    // 3. Tier 2: Progressive background preloader in idle slices
    const remainingQueue = [];
    for (let i = 10; i < TOTAL_FRAMES; i++) {
      remainingQueue.push(i);
    }

    function processPreloadQueue() {
      if (remainingQueue.length === 0) return;
      const batchSize = 3;
      for (let b = 0; b < batchSize && remainingQueue.length > 0; b++) {
        const nextIdx = remainingQueue.shift();
        loadFrame(nextIdx);
      }
      if (remainingQueue.length > 0) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(processPreloadQueue, { timeout: 800 });
        } else {
          setTimeout(processPreloadQueue, 60);
        }
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(processPreloadQueue, { timeout: 1000 });
    } else {
      setTimeout(processPreloadQueue, 150);
    }

    // 4. Scroll progress calculation & priority on-demand loading
    function updateScrollProgress() {
      const hero = document.querySelector('.hero');
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const animScrollDistance = Math.max(260, Math.min(heroHeight * 0.42, 400));
      targetProgress = Math.min(1, Math.max(0, scrollY / animScrollDistance));

      // Priority load the current target frame if not loaded yet
      const currentTargetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(targetProgress * (TOTAL_FRAMES - 1))));
      if (!frameLoaded[currentTargetIdx]) {
        loadFrame(currentTargetIdx);
        if (currentTargetIdx + 1 < TOTAL_FRAMES) loadFrame(currentTargetIdx + 1);
        if (currentTargetIdx - 1 >= 0) loadFrame(currentTargetIdx - 1);
      }

      startRenderLoop();
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    resizeCanvas();

    // 5. Smart RAF loop: Runs only while animating, sleeps at idle (0% CPU)
    function renderLoop() {
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.0008) {
        currentProgress += delta * 0.28;
        const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
        if (targetIndex !== lastDrawnIndex) {
          drawFrameCover(targetIndex);
        }
        requestAnimationFrame(renderLoop);
      } else {
        currentProgress = targetProgress;
        const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
        if (targetIndex !== lastDrawnIndex) {
          drawFrameCover(targetIndex);
        }
        rafActive = false;
      }
    }

    function startRenderLoop() {
      if (!rafActive) {
        rafActive = true;
        requestAnimationFrame(renderLoop);
      }
    }

    // Redraw hero canvas immediately when dark/light theme is toggled
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        lastDrawnIndex = -1;
        startRenderLoop();
      });
    }

    startRenderLoop();
  }

  // Welcome console message
  console.log(
    "%c Vijender Singh %c B.Tech Student in AI & Data Science | Portfolio Ready ",
    "background: #e63946; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 3px 0 0 3px;",
    "background: #1a1a2e; color: #f4a261; padding: 4px 8px; border-radius: 0 3px 3px 0;"
  );
});
