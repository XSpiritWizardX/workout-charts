// Add interactivity to the waitlist form
var waitlistForm = document.getElementById('waitlist-form');
waitlistForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.querySelector('#waitlist-form input').value;
  console.log(email);
});
// Add interactivity to the reveal button
var revealButton = document.querySelector('.button');
revealButton.addEventListener('click', function() {
  console.log('Reveal button clicked!');
});
