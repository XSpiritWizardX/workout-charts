document.body.classList.add('ready');

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const form = document.getElementById('waitlist-form');
const message = document.getElementById('form-message');
const countEl = document.getElementById('waitlist-total');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = String(form.elements.email.value || '').trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    message.className = 'form-message';

    if (!valid) {
      message.textContent = 'Enter a valid email address.';
      message.classList.add('is-err');
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const oldText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Saving...';

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = oldText;
      form.reset();
      message.textContent = 'You are on the waitlist. Invite coming soon.';
      message.classList.add('is-ok');

      if (countEl) {
        const current = Number(countEl.textContent.replace(/,/g, '')) || 0;
        countEl.textContent = (current + 1).toLocaleString();
      }
    }, 700);
  });
}
