// UI Vars
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle Event
toggle.addEventListener('click', (e) => {
   document.body.classList.toggle('show-nav');

   if(document.body.classList.contains('show-nav')){
      e.target.innerHTML = '<i class="fas fa-times"></i>';
   } else {
      e.target.innerHTML = '<i class="fas fa-bars"></i>';
   }
   
});

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false)