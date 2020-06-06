const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch random user and add money
// function getRandomUser(){
//    fetch('https://randomuser.me/api/')
//    .then(res => res.json())
//    .then(data => console.log(data.results));
// }

getRandomUser();
getRandomUser();

// async
async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api/');
   const data = await res.json();
   const user = data.results[0];

   const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
   }
   
   addData(newUser);
}

// Double everyone money
function doubleMoney(){
   data = data.map(user => {
      return {...user, money: user.money * 2}
   });

   updateDom();
}

// Sort users by Richest
function sortByRichest(){
   data.sort((a ,b) => b.money - a.money);
   updateDom();
}

function showMillionaires(){
   data = data.filter(item => item.money >= 1000000);
   updateDom();
}

function calculateEntireWealth(){
   const total = data.reduce((acc, item) => (acc + item.money), 0);

   const element = document.createElement('h3');
   element.innerHTML = `TOTAL <strong>${formatNumber(total)}</strong>`;

   main.appendChild(element);
   
}

// Add to array data
function addData(obj){
   data.push(obj);
   
   updateDom();
}

function updateDom(providedData = data){
   // Clear main div
   main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

   providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatNumber(item.money)}`;
      main.appendChild(element);
   });
}

// Format number as money
function formatNumber(number){
   return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateEntireWealth);