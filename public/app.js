const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const form = document.querySelector('.waitlist');
const emailInput = document.querySelector('#email');
const statusText = document.querySelector('.waitlist-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    statusText.textContent = 'Enter a valid email address.';
    statusText.className = 'waitlist-status error';
    emailInput.focus();
    return;
  }

  statusText.textContent = 'Saving your spot...';
  statusText.className = 'waitlist-status';

  setTimeout(() => {
    statusText.textContent = "You're in. We will send launch updates soon.";
    statusText.className = 'waitlist-status ok';
    form.reset();
  }, 600);
});
