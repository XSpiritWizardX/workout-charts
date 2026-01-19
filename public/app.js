document.addEventListener('DOMContentLoaded', function(){
  const hero = document.querySelector('.hero');
  if (hero.classList.contains('reveal')) {
    setTimeout(function() {
      hero.classList.add('show');
    }, 1000);
  }
});
