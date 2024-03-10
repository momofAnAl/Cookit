const searchInput = document.querySelector("#searchInput");
const resultList = document.querySelector("#results");
const searchbtn = document.querySelector("#submit");

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchRecipes();
});

async function searchRecipes() {
  const searchValue = searchInput.value.trim();
  const response = await fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=6abd27c6&app_key=a43f777d073e43c48f0a3c8860bfe0ee&from=0&to=10`
  );
  const data = await response.json();
  displayRecipes(data.hits);
}

let favoriteRecipesArray = [];

function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe, index) => {
    html += `
        <div id="recipes-${index}">
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            <a type="button" class="favoriteBtn" onclick="addtoFavorites(${index})"}>Add to Favorites</a>
        </div>   
        `;
  });
  resultList.innerHTML = html;
}

const favoriteBtn = document.querySelectorAll(".favoriteBtn");
favoriteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addtoFavorites();
});

function addtoFavorites(index) {
  const recipe = document.getElementById(`recipes-${index}`);

//   if (!favoriteRecipesArray.includes(recipe)) {
//     favoriteRecipesArray.push(recipe);
//     updateFavoriteRecipesList();
//   }
}

function updateFavoriteRecipesList() {
  const favoriteRecipesList = document.getElementById("favoriteRecipesList");
  favoriteRecipesList.innerHTML = "";

  favoriteRecipesArray.forEach((recipe) => {
    const listItem = document.createElement("li");
    listItem.textContent = recipe.recipe.label;
    favoriteRecipesList.appendChild(listItem);
  });

  // Add a remove button for each favorite recipe
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    // Call removeFavoriteRecipe function with the recipe index
    removeFavoriteRecipe(favoriteRecipesArray.indexOf(recipe));
  });
  listItem.appendChild(removeButton);
}

function removeFavoriteRecipe(index) {
  if (index > -1) {
    // Remove the recipe from favoriteRecipesArray
    favoriteRecipesArray.splice(index, 1);

    // Update the favorite recipes list
    updateFavoriteRecipesList();
  }
}
