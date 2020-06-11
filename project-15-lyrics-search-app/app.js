const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term){
   const res = await fetch(`${apiURL}/suggest/${term}`);
   const data = await res.json();
   
   showData(data);
}

// Show song and artist in DOM
function showData(data){

   result.innerHTML = `
      <ul class="songs">
         ${data.data.map(song => `
               <li>
                  <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                  <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
               </li>
         `).join('')}
      </ul>
   `;

   if(data.prev || data.next){
      more.innerHTML = `
         ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
         ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
      `;
   } else {
      more.innerHTML = '';
   }
}

async function getMoreSongs(url){
   const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
   const data = await res.json();

   showData(data);
}

// Event listeners
form.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchTerm = search.value;

   if(!searchTerm){
      alert('Please type in a search term');
   } else {
      searchSongs(searchTerm);
   }
});

// Get Lyrics
async function getLyrics(artist, songTitle){
   const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
   const data = await res.json();

   const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

   console.log(data);
   

   result.innerHTML = `<h2>${artist} - ${songTitle}</h2>
   <span>${lyrics}</span>`;  

   more.innerHTML = '';
}

// Get lyrics button click
result.addEventListener('click', e => {
   const clickedEl = e.target;

   if(clickedEl.classList.contains('btn')){
      const artist = clickedEl.getAttribute('data-artist');
      const songTitle = clickedEl.getAttribute('data-songtitle');

      getLyrics(artist, songTitle);
   }
});