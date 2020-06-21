const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');

const data = [
   {
      image: './img/thirsty.jpeg',
      text: "I'm thirsty"
   },
   {
      image: './img/hungry.jpeg',
      text: "I'm hungry"
   },
   {
      image: './img/tired.jpeg',
      text: "I'm tired"
   },
   {
      image: './img/hurt.jpeg',
      text: "I'm hurt"
   },
   {
      image: './img/happy.jpeg',
      text: "I'm happy"
   },
   {
      image: './img/angry.jpeg',
      text: "I'm angry"
   },
   {
      image: './img/sad.jpeg',
      text: "I'm sad"
   },
   {
      image: './img/scared.jpeg',
      text: "I'm scared"
   },
   {
      image: './img/outside.jpeg',
      text: "I want to go outside"
   },
   {
      image: './img/house.jpeg',
      text: "I want to go home"
   },
   {
      image: './img/school.jpeg',
      text: "I want to go to school"
   },
   {
      image: './img/grandma.jpeg',
      text: "I want to go to grandmas"
   },
]

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
   const box = document.createElement('div');
   box.classList.add('box');

   const { image, text } = item;

   box.innerHTML = `
      <img src="${image}" alt="${text}" title="${text}">
      <p class="info">${text}</p>
   `;

   // @todo - speak event
   box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();

      // Add box shadow
      box.classList.add('active');
      setTimeout(() => {
         box.classList.remove('active');
      }, 1000);
   });
   main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
   voices = speechSynthesis.getVoices();
   voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`
      voiceSelect.appendChild(option);
   });
}

function setTextMessage(text){
   message.text = text;
}

// Speak text
function speakText(){
   speechSynthesis.speak(message);
}

function readText(){
   const text = textarea.value;
   setTextMessage(text);
   speakText();
} 

// Set voice
function setVoice(e){
   message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggle.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

close.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

readBtn.addEventListener('click', readText);

voiceSelect.addEventListener('change', setVoice);

getVoices();