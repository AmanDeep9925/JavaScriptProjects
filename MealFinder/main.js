const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMeal = document.getElementById('single-meal');

// * functions

// * search meal from API

function searchMeal(e) {
    e.preventDefault();

    // * Clear single meal
    singleMeal.innerHTML = '';

    // * get search term
    const term = search.value;

    // check submit

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for <span>${term}</span>: </h2>`;

                if (data.meals == null) {
                    resultHeading.innerHTML = `<h2>There are no search results. Try again! </h2>`;
                } else {
                    meals.innerHTML = data.meals
                        .map(
                            (meal) => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `
                        )
                        .join('');
                }
            });
        // Clear search text
        search.value = '';
    } else {
        alert('please enter a search value');
    }
}

// * Fetch meal by id

function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

// * Fetch random meal

function getRandomMeal() {
    // * clear meals and heading

    meals.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    let mealInstructions = new Array();
    console.log(meal.strInstructions);
    mealInstructions = meal.strInstructions.split('.');
    const index = mealInstructions.length - 1;

    singleMeal.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<h1>${meal.strCategory}</h1>` : ''}
            ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <div className="instructions">
                ${mealInstructions
                    .slice(0, index)
                    .map((inst) => `<p>${inst}.</p>`)
                    .join('')}
            </div>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `;
}

// * Event Listenters

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', (e) => {
    const mealInfo = e.path.find((item) => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID);
    }
});
