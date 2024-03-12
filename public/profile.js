const baseUrl = "http://localhost:8000";

const searchInput = document.querySelector("#searchInput");
const resultList = document.querySelector("#results");
const searchbtn = document.getElementById("searchbtn");

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
  console.log(data.hits);
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
            <a type="button" class="favoriteBtn" onclick="addtoFavorites('${recipe.recipe.url}')">Add to Favorites</a>
        </div>
        `;
  });
  resultList.innerHTML = html;
}

async function addtoFavorites(recipe_url) {
  const payload = {
    recipe_id: recipe_url,user_id:1
  };
  const response = await axios.post(`${baseUrl}/api/favorites`, payload).then((response)=> {
    console.log("response48:", response);
    return response;
  });
  if (response.status === 200) {
    window.location.href = "favorite.html";
  }
}
