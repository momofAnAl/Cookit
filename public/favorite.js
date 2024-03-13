const favorites = JSON.parse(localStorage.getItem("favorites"));
console.log(favorites);

document.addEventListener("DOMContentLoaded", () => {
  const recipeUrls = JSON.parse(localStorage.getItem("favorites")) || {
    data: [],
  };
  console.log(recipeUrls);
  const recipeList = document.getElementById("favoriteRecipesList");
  recipeUrls.data.forEach(({ recipe_id }) => {
    const li = document.createElement("li");
    li.textContent = `${recipe_id}`;
    li.classList.add("favorite-item");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove Favorite";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteFavorite(recipe_id);
      li.remove(); 
    });
    li.appendChild(deleteButton);
    recipeList.appendChild(li);
  });
});

