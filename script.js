  // CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.opacity = '0.15';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.5';
    });
  });

  // SCROLL ANIMATIONS
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // SKILL BARS animate on scroll
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const w = bar.style.width; bar.style.width = '0';
          setTimeout(() => bar.style.width = w, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelector('.skills-grid') && barObserver.observe(document.querySelector('.skills-grid'));

  // ACTIVE NAV HIGHLIGHTING
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });


  // ¡HOLA! GREETING + CURSOR TRAIL — wait for DOM
  const translations = {
    en: {
      navAbout: "About", navSkills: "Skills", navqualifications: "qualifications",
      navProjects: "Projects", navWhyspain: "Why Spain", navContact: "Contact",
      heroTag: "Data Analyst · Open to Relocation · Europe 🇪🇸",
      heroSub: "Turning messy data into clear decisions — <br><em>Spain</em> is the destination.",
      btnTalk: "Let us Talk", btnWork: "See My Work", btnCV: "Download CV",
      aboutLabel: "About me",
      aboutH2: "Self-taught.<br><em>Hungry.</em><br>Spain-bound.",
      aboutP1: "Data Analyst with <strong>nearly 2 years of qualifications</strong> turning messy data into clear decisions — across ABM, marketing, and operations. Started from zero, built everything through <strong>self-learning and curiosity</strong>.",
      aboutP2: "Currently at <strong>ThinkABM</strong> in Delhi, leading the full migration from PowerPoint to Power BI and building multi-year revenue analysis models. Before that, designed analytics dashboards at <strong>Parekh Integrated Services</strong> that saved 4-6 hours of manual work every week.",
      aboutP3: "Outside of data — <strong>football captain</strong>, stage performer, aspiring screenwriter, and a firm believer that the best insights come from curious people. Spain is not a plan. Spain is <strong>the plan.</strong>",
      statExp: "Years qualifications", statIelts: "IELTS Band",
      statSaved: "Manual Work Saved", statSpanish: "Spanish Level",
      skillsLabel: "Technical Arsenal", skillsH2: "Skills &amp; Tools",
      expLabel: "Work History", expH2: "qualifications", expBadge: "Current",
      expRole1: "Data Analyst", expRole2: "MIS Executive (Data Analysis)",
      expBullets1: [
        "Architected end-to-end Power BI environment — migrating from PowerPoint to interactive dashboards with DAX, calculated columns, and row-level security (RLS)",
        "Built multi-year Revenue Analysis models (FY24-FY26) using DAX time-intelligence functions — enabling YoY variance analysis for senior stakeholders",
        "Automated report pipelines using Power Query M and Dataflows Gen2 in Microsoft Fabric, cutting manual effort by 30%+",
        "Leveraged Power BI Copilot to accelerate insight generation and dashboard iteration cycles"
      ],
      expBullets2: [
        "Designed CDSCO Tender Analytics dashboard in Power BI — custom DAX KPIs for vendor performance scoring, deadline tracking, and procurement monitoring",
        "Automated Power BI reporting workflows using Power Query M transformations and scheduled refreshes, saving 4-6 hours of manual work weekly",
        "Translated stakeholder requirements into scalable, self-service BI reports across cross-functional teams"
      ],
      projectsLabel: "What I have Built", projectsH2: "Key Projects",
      proj1Title: "Customer Segmentation Dashboard",
      proj2Title: "NBA Player Performance Dashboard",
      proj1Desc: "End-to-end RFM segmentation pipeline applying K-Means clustering (k=4) to classify 10K+ customer records. Deployed as an interactive R Shiny web app with real-time filtering and dynamic cluster visualisations.",
      proj2Desc: "Data pipeline ingesting and transforming 2023 NBA season stats for 500+ players. Computed PER, True Shooting %, and Usage Rate. Deployed as a Streamlit dashboard with Plotly visualisations.",
      certsH2: "Certifications",
      cert1Name: "Google Professional Data Analytics",
      cert2Name: "PwC Switzerland Power BI Job Simulation",
      hobbyH2: "Languages",
      langLevel1: "Full Professional Proficiency", langLevel2: "A2 — Actively Learning", langLevel3: "Native",
      langNote1: "IELTS Band 8.5", langNote2: "Motivated by Spain & its culture 🇪🇸", langNote3: "Mother tongue",
      whyLabel: "The Real Reason", whyH2: "Why <em>Spain?</em>",
      whyP1: "This isn't a career move dressed up as a life choice. <strong>Spain has been the destination long before the job search began.</strong>",
      whyP2: "It started with <strong>FC Barcelona</strong> — watching Xavi, Iniesta, and Messi play a kind of football that felt like art. The tiki-taka, the pressing, the identity. It was a philosophy. And that philosophy — <em>build something beautiful through intelligence and precision</em> — is honestly how I approach data too.",
      whyP3: "Then came <em>Zindagi Na Milegi Dobara</em> — a film that painted Spain as a place where people go to truly live. La Tomatina, the running of the bulls in Pamplona, the flamenco in Granada, the sunsets over the Mediterranean.",
      whyP4: "I captained my college football team. I perform on stage. I write screenplays. I need <strong>colour, energy, and passion</strong> in my surroundings — and Spain has all of that in abundance.",
      whyP5: "<strong>Spain is not the backup plan. Spain is the only plan.</strong>",
      why1Title: "FC Barcelona", why2Title: "Zindagi Na Milegi Dobara",
      why3Title: "The Mediterranean Life", why4Title: "Learning Spanish",
      why1Desc: "Grew up watching Barca — tiki-taka taught me that intelligence beats brute force. Same philosophy I bring to data.",
      why2Desc: "The film that planted Spain in my head. La Tomatina, the bull run, the open roads — I want to live that chapter.",
      why3Desc: "The culture, the food, the pace, the warmth. Someone who performs on stage and captained a football team belongs in Spain.",
      why4Desc: "A2 and climbing — not because a job requires it, but because I genuinely want to speak the language of the country I am making home.",
      contactTag: "Open to opportunities",
      contactH2: "Let us build<br>something<br><span class='highlight'>together.</span>",
      contactSub: "Actively relocating to Spain. Available for Data Analyst roles across the country. Not exploring — <strong>relocating</strong>.",
      footerLeft: "© 2026 Shubham Acharya — Data Analyst",
      footerRight: "Delhi, India → <span style='color:var(--accent)'>Spain 🇪🇸</span>"
    },
    es: {
      navAbout: "Sobre mí", navSkills: "Habilidades", navqualifications: "Experiencia",
      navProjects: "Proyectos", navWhyspain: "Por qué España", navContact: "Contacto",
      heroTag: "Analista de Datos · Dispuesto a Reubicarse · Europa 🇪🇸",
      heroSub: "Convirtiendo datos complejos en decisiones claras — <br><em>España</em> es el destino.",
      btnTalk: "Hablemos", btnWork: "Ver mi trabajo", btnCV: "Descargar CV",
      aboutLabel: "Sobre mí",
      aboutH2: "Autodidacta.<br><em>Ambicioso.</em><br>Rumbo a España.",
      aboutP1: "Analista de Datos con <strong>casi 2 años de experiencia</strong> convirtiendo datos complejos en decisiones claras — en ABM, marketing y operaciones. Empecé desde cero, construyendo todo mediante <strong>aprendizaje autónomo y curiosidad</strong>.",
      aboutP2: "Actualmente en <strong>ThinkABM</strong> en Delhi, liderando la migración completa de PowerPoint a Power BI. Anteriormente, diseñé dashboards en <strong>Parekh Integrated Services</strong> que ahorraron 4-6 horas de trabajo manual cada semana.",
      aboutP3: "Fuera del mundo de los datos — <strong>capitán de fútbol</strong>, actor, guionista en ciernes, y firme creyente de que los mejores insights vienen de personas curiosas. España no es un plan. España es <strong>el plan.</strong>",
      statExp: "Años de Experiencia", statIelts: "Nota IELTS",
      statSaved: "Trabajo Manual Ahorrado", statSpanish: "Nivel de Español",
      skillsLabel: "Arsenal Técnico", skillsH2: "Habilidades y Herramientas",
      expLabel: "Trayectoria Profesional", expH2: "Experiencia", expBadge: "Actual",
      expRole1: "Analista de Datos", expRole2: "Ejecutivo MIS (Análisis de Datos)",
      expBullets1: [
        "Diseñé un entorno completo de Power BI — migrando de PowerPoint a dashboards interactivos con DAX, columnas calculadas y seguridad a nivel de fila (RLS)",
        "Construí modelos de análisis de ingresos plurianuales (FY24-FY26) con funciones de inteligencia temporal DAX — análisis YoY para directivos",
        "Automaticé pipelines de informes con Power Query M y Dataflows Gen2 en Microsoft Fabric, reduciendo el trabajo manual en un 30%+",
        "Utilicé Power BI Copilot para acelerar la generación de insights y los ciclos de iteración de dashboards"
      ],
      expBullets2: [
        "Diseñé el dashboard de Análisis de Licitaciones CDSCO en Power BI — KPIs personalizados para puntuación de proveedores y seguimiento de plazos",
        "Automaticé flujos de trabajo en Power BI con transformaciones Power Query M, ahorrando 4-6 horas de trabajo manual semanales",
        "Traduje requisitos de stakeholders en informes BI escalables y de autoservicio para equipos multifuncionales"
      ],
      projectsLabel: "Lo que he Construido", projectsH2: "Proyectos Clave",
      proj1Title: "Dashboard de Segmentación de Clientes",
      proj2Title: "Dashboard de Rendimiento de Jugadores NBA",
      proj1Desc: "Pipeline RFM de extremo a extremo con clustering K-Means (k=4) para clasificar más de 10.000 registros. Desplegado como app interactiva R Shiny con filtrado en tiempo real y visualizaciones dinámicas.",
      proj2Desc: "Pipeline de datos con estadísticas NBA 2023 para más de 500 jugadores. Calcula PER, True Shooting % y Usage Rate. Desplegado como dashboard Streamlit con visualizaciones Plotly.",
      certsH2: "Certificaciones",
      cert1Name: "Google Professional Data Analytics",
      cert2Name: "Simulación Laboral Power BI de PwC Suiza",
      hobbyH2: "Idiomas",
      langLevel1: "Dominio Profesional Completo", langLevel2: "A2 — Aprendiendo Activamente", langLevel3: "Lengua Materna",
      langNote1: "IELTS Banda 8.5", langNote2: "Motivado por España y su cultura 🇪🇸", langNote3: "Lengua materna",
      whyLabel: "La Verdadera Razón", whyH2: "¿Por qué <em>España?</em>",
      whyP1: "Esto no es un movimiento de carrera disfrazado de decisión de vida. <strong>España ha sido el destino mucho antes de que empezara la búsqueda de empleo.</strong>",
      whyP2: "Empezó con el <strong>FC Barcelona</strong> — viendo jugar a Xavi, Iniesta y Messi con un fútbol que parecía arte. El tiki-taka, la presión, la identidad. Era una filosofía — <em>construir algo hermoso a través de la inteligencia y la precisión</em> — igual que mi enfoque hacia los datos.",
      whyP3: "Luego llegó <em>Zindagi Na Milegi Dobara</em> — una película que pintó España como un lugar donde la gente va a vivir de verdad. La Tomatina, el encierro de Pamplona, el flamenco en Granada, los atardeceres sobre el Mediterráneo.",
      whyP4: "Fui capitán del equipo de fútbol universitario. Actúo en el escenario. Escribo guiones. Necesito <strong>color, energía y pasión</strong> en mi entorno — y España tiene todo eso en abundancia.",
      whyP5: "<strong>España no es el plan B. España es el único plan.</strong>",
      why1Title: "FC Barcelona", why2Title: "Zindagi Na Milegi Dobara",
      why3Title: "La Vida Mediterránea", why4Title: "Aprendiendo Español",
      why1Desc: "Crecí viendo al Barça — el tiki-taka me enseñó que la inteligencia supera a la fuerza bruta. La misma filosofía que aplico a los datos.",
      why2Desc: "La película que plantó España en mi cabeza. La Tomatina, el encierro, las carreteras abiertas — quiero vivir ese capítulo.",
      why3Desc: "La cultura, la comida, el ritmo, el calor humano. Alguien que actúa en escena y capitaneó un equipo de fútbol pertenece a España.",
      why4Desc: "A2 y subiendo — no porque un trabajo lo requiera, sino porque genuinamente quiero hablar el idioma del país que estoy haciendo mi hogar.",
      contactTag: "Abierto a oportunidades",
      contactH2: "Construyamos<br>algo<br><span class='highlight'>juntos.</span>",
      contactSub: "En proceso de reubicación a España. Disponible para puestos de Analista de Datos en todo el país. No estoy explorando — <strong>me estoy mudando</strong>.",
      footerLeft: "© 2026 Shubham Acharya — Analista de Datos",
      footerRight: "Delhi, India → <span style='color:var(--accent)'>España 🇪🇸</span>"
    }
  };

  let currentLang = 'en';

  function toggleLang() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    const t = translations[currentLang];
    const isES = currentLang === 'es';

    // Toggle button
    document.getElementById('lang-flag').textContent = isES ? '🇬🇧' : '🇪🇸';
    document.getElementById('lang-label').textContent = isES ? 'EN' : 'ES';

    // Nav
    const navLinks = document.querySelectorAll('.nav-links a');
    const navKeys = ['navAbout','navSkills','navqualifications','navProjects','navWhyspain','navContact'];
    navLinks.forEach((a, i) => { if(navKeys[i]) a.textContent = t[navKeys[i]]; });

    // Hero
    const heroTag = document.querySelector('.hero-tag');
    if(heroTag) heroTag.textContent = t.heroTag;
    const heroSub = document.querySelector('.hero-subtitle');
    if(heroSub) heroSub.innerHTML = t.heroSub;
    const btns = document.querySelectorAll('.hero-cta a');
    if(btns[0]) btns[0].textContent = t.btnTalk;
    if(btns[1]) btns[1].textContent = t.btnWork;

    // About
    const aboutH2 = document.querySelector('.about-heading');
    if(aboutH2) aboutH2.innerHTML = t.aboutH2;
    const aboutTexts = document.querySelectorAll('.about-text');
    if(aboutTexts[0]) aboutTexts[0].innerHTML = t.aboutP1;
    if(aboutTexts[1]) aboutTexts[1].innerHTML = t.aboutP2;
    if(aboutTexts[2]) aboutTexts[2].innerHTML = t.aboutP3;

    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = ['statExp','statIelts','statSaved','statSpanish'];
    statLabels.forEach((el, i) => { if(t[statKeys[i]]) el.textContent = t[statKeys[i]]; });

    // Section headings
    const skillsH = document.querySelector('.skills-heading');
    if(skillsH) skillsH.innerHTML = t.skillsH2;
    const expH = document.querySelector('.exp-heading');
    if(expH) expH.innerHTML = t.expH2;
    const projH = document.querySelector('.projects-heading');
    if(projH) projH.innerHTML = t.projectsH2;
    const certsH = document.querySelector('.certs-heading');
    if(certsH) certsH.innerHTML = t.certsH2;
    const hobbyH = document.querySelector('.hobby-heading');
    if(hobbyH) hobbyH.innerHTML = t.hobbyH2;
    const whyH = document.querySelector('.why-heading');
    if(whyH) whyH.innerHTML = t.whyH2;

    // Section labels (// prefix)
    const allLabels = document.querySelectorAll('.section-label');
    const labelTexts = [t.aboutLabel, t.skillsLabel, t.expLabel, t.projectsLabel, '', '', t.whyLabel, t.contactTag];
    allLabels.forEach((el, i) => { if(labelTexts[i]) el.textContent = labelTexts[i]; });

    // qualifications
    const badge = document.querySelector('.exp-badge');
    if(badge) badge.textContent = t.expBadge;
    const expRoles = document.querySelectorAll('.exp-role');
    if(expRoles[0]) expRoles[0].textContent = t.expRole1;
    if(expRoles[1]) expRoles[1].textContent = t.expRole2;
    const expBullets = document.querySelectorAll('.exp-bullets');
    try {
      if(expBullets[0] && t.expBullets1 && Array.isArray(t.expBullets1)) expBullets[0].innerHTML = t.expBullets1.map(b => '<li>' + b + '</li>').join('');
      if(expBullets[1] && t.expBullets2 && Array.isArray(t.expBullets2)) expBullets[1].innerHTML = t.expBullets2.map(b => '<li>' + b + '</li>').join('');
    } catch(e) { console.warn('expBullets error', e); }

    // Projects
    const projTitles = document.querySelectorAll('.project-title');
    if(projTitles[0] && t.proj1Title) projTitles[0].textContent = t.proj1Title;
    if(projTitles[1] && t.proj2Title) projTitles[1].textContent = t.proj2Title;
    const projDescs = document.querySelectorAll('.project-desc');
    if(projDescs[0] && t.proj1Desc) projDescs[0].textContent = t.proj1Desc;
    if(projDescs[1] && t.proj2Desc) projDescs[1].textContent = t.proj2Desc;

    // Certs
    const certNames = document.querySelectorAll('.cert-name');
    if(certNames[0]) certNames[0].textContent = t.cert1Name;
    if(certNames[1]) certNames[1].textContent = t.cert2Name;

    // Languages
    const langLevels = document.querySelectorAll('.lang-level');
    const langNotes = document.querySelectorAll('.lang-note');
    const langLevelKeys = ['langLevel1','langLevel2','langLevel3'];
    const langNoteKeys = ['langNote1','langNote2','langNote3'];
    langLevels.forEach((el, i) => { if(t[langLevelKeys[i]]) el.textContent = t[langLevelKeys[i]]; });
    langNotes.forEach((el, i) => { if(t[langNoteKeys[i]]) el.textContent = t[langNoteKeys[i]]; });

    // Why Spain cards
    const whyTitles = document.querySelectorAll('.why-card-title');
    const whyDescs = document.querySelectorAll('.why-card-desc');
    const whyTitleKeys = ['why1Title','why2Title','why3Title','why4Title'];
    const whyDescKeys = ['why1Desc','why2Desc','why3Desc','why4Desc'];
    whyTitles.forEach((el, i) => { if(t[whyTitleKeys[i]]) el.textContent = t[whyTitleKeys[i]]; });
    whyDescs.forEach((el, i) => { if(t[whyDescKeys[i]]) el.textContent = t[whyDescKeys[i]]; });

    // Why Spain text paragraphs
    const whyTexts = document.querySelectorAll('.why-text');
    const whyTextKeys = ['whyP1','whyP2','whyP3','whyP4','whyP5'];
    whyTexts.forEach((el, i) => {
      const key = whyTextKeys[i];
      if(key && t[key] && typeof t[key] === 'string') el.innerHTML = t[key];
    });

    // Contact
    const contactTag = document.querySelector('.contact-tag');
    if(contactTag) contactTag.textContent = t.contactTag;
    const contactH = document.querySelector('.contact-heading');
    if(contactH) contactH.innerHTML = t.contactH2;
    const contactSub = document.querySelector('.contact-subtext');
    if(contactSub) contactSub.innerHTML = t.contactSub;

    // Footer
    const footerLeft = document.querySelector('.footer-left');
    if(footerLeft) footerLeft.textContent = t.footerLeft;
    const footerRight = document.querySelector('.footer-right');
    if(footerRight) footerRight.innerHTML = t.footerRight;
  }

  document.addEventListener('DOMContentLoaded', function() {

  // ¡HOLA! GREETING
  (function() {
    const overlay = document.getElementById('hola-overlay');
    const flag = document.getElementById('hola-flag');
    const text = document.getElementById('hola-text');
    const sub = document.getElementById('hola-sub');
    
    // Trigger animations
    setTimeout(() => {
      flag.style.opacity = '1';
      flag.style.transform = 'scaleX(1)';
    }, 200);
    setTimeout(() => {
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)';
    }, 400);
    setTimeout(() => {
      sub.style.opacity = '1';
    }, 700);
    
    // Fade out overlay
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 900);
    }, 2200);
  })();

  // SPANISH FLAG CURSOR TRAIL
  (function() {
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const colors = ['#c60b1e', '#c60b1e', '#f1bf00', '#f1bf00', '#c60b1e'];
    const particles = [];

    document.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.7,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          decay: 0.02 + Math.random() * 0.02
        });
      }
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.97;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(animate);
    }
    animate();
  })();


  // LANGUAGE TOGGLE



  }); // end DOMContentLoaded
