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

  // 13. THREE.JS 3D AVATAR BACKGROUND WITH SCROLL-DRIVEN ROTATION
  const canvas3D = document.getElementById('bg-3d-canvas');
  if (canvas3D && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const isMobile = () => window.innerWidth <= 768;
    const getCameraZ = () => isMobile() ? 14 : 8;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, getCameraZ());

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas3D,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xe63946, 1.4);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2a9d8f, 1.0);
    dirLight2.position.set(-5, -3, -2);
    scene.add(dirLight2);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let isGLBLoaded = false;

    // Attempt loading custom avatar GLB model
    if (typeof THREE.GLTFLoader !== 'undefined') {
      const loader = new THREE.GLTFLoader();
      const modelPaths = ['./profile_3d.glb', './avatar.glb', './model.glb'];
      
      function tryLoadModel(index) {
        if (index >= modelPaths.length) {
          if (!isGLBLoaded) createDataAnalyst3DModel();
          return;
        }
        loader.load(
          modelPaths[index],
          (gltf) => {
            isGLBLoaded = true;
            const model = gltf.scene;
            model.scale.set(2, 2, 2);
            model.position.set(0, -1, 0);
            modelGroup.add(model);
          },
          undefined,
          () => {
            tryLoadModel(index + 1);
          }
        );
      }
      tryLoadModel(0);
    } else {
      createDataAnalyst3DModel();
    }

    let dataGlobe, globeGrid, orbitRing, barGroup;
    let dataBars = [];

    // 3D Interactive Data Charts & Globe Model (Data Analyst / Business Intelligence)
    function createDataAnalyst3DModel() {
      // 1. Central Data Globe (Solid Core + Latitude/Longitude Grid)
      const globeGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x2a9d8f,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x0a3d36,
        flatShading: true,
      });
      dataGlobe = new THREE.Mesh(globeGeo, globeMat);
      modelGroup.add(dataGlobe);

      // Globe Latitude/Longitude Wireframe Ring Grid
      const gridGeo = new THREE.SphereGeometry(1.48, 20, 20);
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0xe63946,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      globeGrid = new THREE.Mesh(gridGeo, gridMat);
      modelGroup.add(globeGrid);

      // 2. 3D Dynamic Bar Chart Columns (KPI Metrics)
      barGroup = new THREE.Group();
      modelGroup.add(barGroup);

      const barHeights = [1.2, 1.8, 2.4, 1.5, 2.1, 2.7];
      const barColors = [0xe63946, 0xf4a261, 0x2a9d8f, 0xf7c948, 0xe63946, 0x2a9d8f];
      const barCount = barHeights.length;
      const radius = 2.4;

      for (let i = 0; i < barCount; i++) {
        const h = barHeights[i];
        const barGeo = new THREE.BoxGeometry(0.32, h, 0.32);
        const barMat = new THREE.MeshStandardMaterial({
          color: barColors[i],
          metalness: 0.7,
          roughness: 0.2,
          emissive: THREE.Color.NAMES[barColors[i]] || 0x111111,
        });
        const barMesh = new THREE.Mesh(barGeo, barMat);
        const angle = (i / barCount) * Math.PI * 2;
        barMesh.position.x = Math.cos(angle) * radius;
        barMesh.position.z = Math.sin(angle) * radius;
        barMesh.position.y = h / 2 - 1.2;
        barMesh.userData = { initialY: barMesh.position.y, initialH: h, speed: 0.002 + i * 0.0008 };
        barGroup.add(barMesh);
        dataBars.push(barMesh);
      }

      // 3. Orbiting Data Ring (Horizontal Analytics Axis)
      const ringGeo = new THREE.TorusGeometry(3.3, 0.035, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xf4a261,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x4a2c11,
      });
      orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 2.5;
      modelGroup.add(orbitRing);

      // 4. Floating Data Nodes & Particles
      const nodeColors = [0xe63946, 0x2a9d8f, 0xf7c948, 0xf4a261];
      for (let i = 0; i < 16; i++) {
        const nodeGeo = new THREE.SphereGeometry(0.07 + Math.random() * 0.05, 10, 10);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: nodeColors[i % nodeColors.length],
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.6 + Math.random() * 0.9;
        nodeMesh.position.x = r * Math.sin(phi) * Math.cos(theta);
        nodeMesh.position.y = r * Math.sin(phi) * Math.sin(theta);
        nodeMesh.position.z = r * Math.cos(phi);
        modelGroup.add(nodeMesh);
      }
    }

    // Scroll & Cursor Rotation Math
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    function update3DScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;
      targetRotationY = scrollRatio * Math.PI * 4; // 2 complete 360deg spins on scroll
    }

    window.addEventListener('scroll', update3DScroll, { passive: true });
    update3DScroll();

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.position.z = getCameraZ();
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate3D() {
      requestAnimationFrame(animate3D);

      // Smooth lerp for scroll rotation and cursor parallax
      modelGroup.rotation.y += (targetRotationY + mouseX - modelGroup.rotation.y) * 0.05;
      modelGroup.rotation.x += (mouseY - modelGroup.rotation.x) * 0.05;

      // Floating sine wave bob animation
      modelGroup.position.y = Math.sin(Date.now() * 0.0012) * 0.22;

      // Globe & Ring Rotations
      if (dataGlobe) dataGlobe.rotation.y += 0.003;
      if (globeGrid) globeGrid.rotation.y -= 0.002;
      if (orbitRing) orbitRing.rotation.z += 0.004;

      // Pulsing 3D Bar Chart Height Animation (KPI Dynamics)
      const time = Date.now() * 0.0025;
      dataBars.forEach((bar, idx) => {
        const pulse = Math.sin(time + idx * 0.8) * 0.2;
        bar.scale.y = 1 + pulse * 0.3;
      });

      renderer.render(scene, camera);
    }
    animate3D();
  }

  // Welcome console message
  console.log(
    "%c Vijender Singh %c B.Tech Student in AI & Data Science | Portfolio Ready ",
    "background: #e63946; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 3px 0 0 3px;",
    "background: #1a1a2e; color: #f4a261; padding: 4px 8px; border-radius: 0 3px 3px 0;"
  );
});
