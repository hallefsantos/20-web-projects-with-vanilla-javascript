// Dom elements
const search = document.getElementById('search'),
      submit = document.getElementById('submit'),
      random = document.getElementById('random'),
      mealsEl = document.getElementById('meals'),
      resultHeading = document.getElementById('result-heading'),
      single_mealEl = document.getElementById('single-meal'),
      error = document.getElementById('error');


// Search meal and fetch from api
function searchMeal(e){

   e.preventDefault();

   // Clear single meal
   single_mealEl.innerHTML = '';

   // get search term
   const term = search.value;

   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   .then(res => res.json())
   .then(data => {
      console.log(data)
      resultHeading.innerHTML = `<h2>Search results for: ${term}</h2>`;

      if(data.meals === null){
         resultHeading.innerHTML = `<p>There are no search results. Try again</p>`;
      } else {
         mealsEl.innerHTML = data.meals.map(meal => {
            return `
               <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                  <div class="meal-info" data-mealid="${meal.idMeal}">
                     <h3>${meal.strMeal}</h3>
                  </div>
               </div>`;
         }).join('');

         // Clear search text
         search.value = '';
      }
   });

   // check for empty
   if(term.trim()){

   } else {
      showError('Please enter a search term');
   }
}

// Fetch meal by id
function getMealById(mealId){
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
   .then(res => res.json())
   .then(data => {
      const meal = data.meals[0];

      addMealToDom(meal);
   });
}

// Fetch random meal from API
function randomMeal(){
   // Clear meals and heading
   mealsEl.innerHTML = '';
   resultHeading.innerHTML = '';

   fetch('https://www.themealdb.com/api/json/v1/1/random.php')
   .then(res => res.json())
   .then(data => {
      const meal = data.meals[0];

      addMealToDom(meal);
   });
}

// Add Meal to DOM
function addMealToDom(meal){
   const ingredients = [];
   const videoUrlString = meal.strYoutube;
   const videoUrl = new URL(videoUrlString);
   const youtubeId = videoUrl.searchParams.get("v");

   for(let i = 1; i <= 20; i++){
      if(meal[`strIngredient${i}`]){
         ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      } else {
         break;
      }
   }

   single_mealEl.innerHTML = `
      <div class="single-meal">
         <h1>${meal.strMeal}</h1>
         <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
         <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
         </div>

         <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
               ${ingredients.map(ingrient => `<li>${ingrient}</li>`).join('')}
            </ul>
         </div>
         ${videoUrlString ? `<div class="single-meal-video"><iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : ''}
      </div>`;

   console.log(ingredients);
}

function showError(message){
   error.style.display = 'block';
   error.innerText = message;

   setTimeout(() => {
      removeError();
   }, 3000);
}

function removeError(){
   error.style.display = 'none';
   error.innerText = '';
}

// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', e => {
   const mealInfo = e.path.find(item => {
      if(item.classList){
         return item.classList.contains('meal-info');
      }else {
         return false;
      }
   });
   
   if(mealInfo){
      const mealID = mealInfo.getAttribute('data-mealid');
      getMealById(mealID);
   }
}); 