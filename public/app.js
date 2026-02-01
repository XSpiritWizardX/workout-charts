const reveals = document.querySelectorAll('.reveal');
const demoBtn = document.getElementById('demoBtn');
const form = document.getElementById('waitlistForm');
const formNote = document.getElementById('formNote');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => observer.observe(el));

if (demoBtn) {
  demoBtn.addEventListener('click', () => {
    demoBtn.textContent = 'Demo queued — check your email soon';
    demoBtn.disabled = true;
    demoBtn.classList.add('button--primary');
  });
}

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const email = new FormData(form).get('email');
    form.reset();
    formNote.textContent = `Thanks! We'll reach out to ${email}.`;
  });
}
