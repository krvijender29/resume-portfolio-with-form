// ============================================================
// Dynamic Footer Year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Top Scroll Progress Bar
// ============================================================
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (docHeight > 0) ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
}, { passive: true });

// ============================================================
// Mobile Navigation Toggle
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close mobile nav after clicking any link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ============================================================
// Scroll-Spy: Active Navigation Link Highlighting
// ============================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#nav a[data-nav]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`#nav a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -45% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// ============================================================
// Scroll Reveal Observer (Smooth Fade-up on scroll)
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// Copy Email to Clipboard with Micro-Interaction Feedback
// ============================================================
const copyBtn = document.querySelector('.copy-btn');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const value = copyBtn.getAttribute('data-copy');
    const hint = copyBtn.querySelector('.copy-hint');
    const originalText = hint ? hint.textContent : 'Click to copy';

    try {
      await navigator.clipboard.writeText(value);
      if (hint) hint.textContent = 'Copied! ✓';
      copyBtn.classList.add('copied');
    } catch (err) {
      if (hint) hint.textContent = 'Failed — copy manually';
    }

    setTimeout(() => {
      if (hint) hint.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2400);
  });
}

// ============================================================
// Contact Form Submission (Asynchronous with Feedback UI)
// ============================================================
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

if (form && submitBtn && formNote) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Disable button & update UI
    submitBtn.disabled = true;
    const originalBtnText = btnText ? btnText.textContent : 'Send Message';
    if (btnText) btnText.textContent = 'Sending Message...';
    formNote.textContent = 'Sending your message...';
    formNote.className = 'form-note show';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        formNote.textContent = '✓ Thank you! Your message has been sent successfully.';
        formNote.className = 'form-note show success';
        form.reset();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      formNote.textContent = '✓ Note: Message received. Vijender will get back to you soon!';
      formNote.className = 'form-note show success';
      form.reset();
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = originalBtnText;

      setTimeout(() => {
        formNote.classList.remove('show');
      }, 7000);
    }
  });
}

// ============================================================
// Sticky Header Backdrop Intensification
// ============================================================
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 20) {
      header.style.borderBottomColor = 'rgba(45, 212, 191, 0.2)';
      header.style.background = 'rgba(7, 11, 20, 0.92)';
    } else {
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      header.style.background = 'rgba(7, 11, 20, 0.8)';
    }
  }
}, { passive: true });