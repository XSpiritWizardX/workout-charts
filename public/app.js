const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => observer.observe(el));

const countEl = document.getElementById('waitlist-count');
const form = document.getElementById('waitlist-form');
const statusEl = document.getElementById('waitlist-status');
const storageKey = 'workoutChartsWaitlist';

const initialCount = Number(localStorage.getItem(storageKey) || '214');
countEl.textContent = initialCount.toLocaleString();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = form.querySelector("input[name='email']");
  const email = emailInput.value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isEmail) {
    statusEl.textContent = 'Enter a valid email to join the list.';
    statusEl.classList.add('error');
    emailInput.focus();
    return;
  }

  statusEl.classList.remove('error');
  const current = Number(localStorage.getItem(storageKey) || '214');
  const next = current + 1;
  localStorage.setItem(storageKey, String(next));
  countEl.textContent = next.toLocaleString();

  statusEl.textContent = 'You are in. Early access details are on the way.';
  form.reset();
});
