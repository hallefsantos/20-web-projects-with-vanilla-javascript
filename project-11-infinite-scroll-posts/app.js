const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 4;
let page = 1;

// Show posts from API
async function getPosts() {
   const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
   const data = await res.json();

   return data;
}

function showLoader(){
   loading.classList.add('show');

   setTimeout(() => {
      loading.classList.remove('show');

      setTimeout(() => {
         page ++;
         postsUi();
         
      }, 300);

   }, 1000);
}

// Show posts in DOM
async function postsUi(){
   const posts = await getPosts();

   // postsContainer.innerHTML = posts.map(post => `
   // <div class="post">
      // <div class="number">${post.id}</div>
      // <div class="post-info">
      //    <h2 class="post-title">${post.title}</h2>
      //    <p class="post-body">${post.body}</p>
      // </div>
   // </div>
   // `).join('');

   posts.forEach(post => {
      const postsEl = document.createElement('div');
      postsEl.classList.add('post');
      postsEl.innerHTML = `
         <div class="number">${post.id}</div>
         <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
         </div>
      `;

      postsContainer.appendChild(postsEl);
   });
}

function filterPosts(e){
   const term = e.target.value.toUpperCase();
   const posts = document.querySelectorAll('.post');

   posts.forEach(post => {
      const title = post.querySelector('.post-title').innerText.toUpperCase();
      const body = post.querySelector('.post-body').innerText.toUpperCase();

      if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
         post.style.display = 'flex';
      } else {
         post.style.display = 'none';
      }
   });
}

postsUi();

window.addEventListener('scroll', () => {
   const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
   
   if(scrollTop + clientHeight >= scrollHeight - 5){
      showLoader();
   }
});

//
filter.addEventListener('input', filterPosts);