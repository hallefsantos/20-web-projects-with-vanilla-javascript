const word = document.getElementById('word'),
      text = document.getElementById('text'),
      scoreEl = document.getElementById('score'),
      timeEl = document.getElementById('time'),
      endgameEl = document.getElementById('end-game-container'),
      settingsBtn = document.getElementById('settings-btn'),
      settings = document.getElementById('settings'),
      settingsForm = document.getElementById('settings-form'),
      difficultySelect = document.getElementById('difficulty');


// List words for game
let words;


// Init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();


const randomWords = async () => {
   const res = await fetch('https://random-word-api.herokuapp.com/word?number=200');
   const data = await res.json();
   return data; 
}

async function initApp () {
   words = await randomWords();
   addWordToDom(); 
   console.log(words);
}

function getRandomWord(){
   return words[Math.floor(Math.random() * words.length)];
}

initApp();


// Start Time
function startTime(){
   startTime = function(){}; // kill it as soon as it was called
   // Starting counting down
   const timeInterval = setInterval(updateTime, 1000);
};

// console.log(getRandomWord());
// add word to DOM
function addWordToDom(){
   randomWord = getRandomWord();
   word.innerHTML = randomWord;
}

function clearText(){
   text.value = '';
}

// Update Score
function updateScore(){
   score++;
   scoreEl.innerHTML = score;
}

// Update Time
function updateTime(){
   time --;
   timeEl.innerHTML = time + 's';

   if(time === 0) {
      clearInterval();
      // End game
      gameOver();
   }
}

function gameOver(){
   endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
   `;

   endgameEl.style.display = 'flex';
}

// Event Listeners
text.addEventListener('input', e => {
   const insertedText = e.target.value;
   startTime();
   
   if(insertedText === randomWord){
      // Add new word to dom
      addWordToDom();

      // update score
      updateScore();

      // clear text
      clearText();

      if(difficulty === 'hard'){
         time += 2;
      } else if(difficulty === 'medium'){
         time += 3;
      } else {
         time += 5;
      }
   }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (e) => {
   difficulty = e.target.value;

   localStorage.setItem('difficulty', difficulty);
});
