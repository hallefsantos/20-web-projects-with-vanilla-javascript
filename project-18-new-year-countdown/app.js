const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const loading = document.getElementById('loading');
const year = document.getElementById('year');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 1 ${currentYear+1} 00:00`);

year.innerText = currentYear+1;

function updateCountdown(){
   const currentTime = new Date();
   const diff = newYearTime - currentTime;

   const d = Math.floor(diff / 1000 / 60 / 60 / 24);
   const h = Math.floor(diff / 1000 / 60 / 60) % 24;
   const m = Math.floor(diff / 1000 / 60) % 60;
   const s = Math.floor(diff / 1000) % 60;

   return {d, h, m, s}
   
}

function updateCountdownUI(){
   const data = updateCountdown();
   days.innerText = data.d;
   hours.innerText = data.h < 10 ? '0'+data.h : data.h;
   minutes.innerText = data.m < 10 ? '0'+data.m : data.m;
   seconds.innerText = data.s < 10 ? '0'+data.s : data.s;
}

updateCountdownUI();

setInterval(() => {
   updateCountdownUI();
}, 1000);

setTimeout(() => {
   loading.remove();
}, 2000);