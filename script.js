const typingText = document.getElementById("typing");
const phrases = [
   "AI & Data Science Student",
  "Data Science Learner",
  "Aspiring Data Scientist",
  "Python & AI Explorer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  typingText.textContent = currentPhrase.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

reveals.forEach((el) => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbx7qfZZwpzuVCyWFV7AH9JjB22tvXlfrsKd6K9bvyLnwZA6p9kUENS_vXa6ortFz2kD/exec", {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    });

    statusText.textContent = "Message sent successfully!";
    form.reset();
  } catch (error) {
    statusText.textContent = "Something went wrong. Please try again.";
  }
});