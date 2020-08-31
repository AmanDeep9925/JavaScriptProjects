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
                    meals.innerHTML = data.meals.map((meal)=>
                    `
                        <div class="meal">
                            <img src = "${meal.strMealThumb}" alt="$    {meal.strMeal}"/>
                            <div class="meal-info" data-mealID = "${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `
                    ).join();
                }
            });
            // Clear search text
            search.value = '';
    } else {
        alert('please enter a search value');
    }
}

// * Event Listenters

submit.addEventListener('submit', searchMeal);
