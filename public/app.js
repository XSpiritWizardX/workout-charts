// Add light interactivity (reveal or waitlist)
const waitlistForm = document.getElementById('waitlist-form');

waitlistForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = waitlistForm.email.value;
  console.log(email);
});
