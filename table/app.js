document.querySelector('.leia-mais').addEventListener('click', (e) => {
   const tableEl = e.target.parentElement;
   if(tableEl.classList.contains('desc-esclarecimento')){
      tableEl.classList.toggle('ativo');
      e.target.innerHTML = 'Esconder texto';
   }
});