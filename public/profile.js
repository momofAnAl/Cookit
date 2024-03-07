const searchInput = document.querySelector("#searchInput");
const resultList = document.querySelector("#results");
const searchbtn = document.querySelector("#submit");

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=6abd27c6&app_key=a43f777d073e43c48f0a3c8860bfe0ee&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes (recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            <a type="button" id="favorite" class="btn" onclick="window.location.href ='favorite.html'">Add to Favorites</a>
        </div>   
        `
    })
    resultList.innerHTML = html;
}


