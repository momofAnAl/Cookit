const baseUrl = "http://localhost:8000";


document.addEventListener("DOMContentLoaded", async () => {
  const favorites = await displayFavoriteRecipes();
  localStorage.setItem("favorites", JSON.stringify(favorites));

  const recipeUrls = JSON.parse(localStorage.getItem("favorites")) || {
    data: [],
  };
  const recipeList = document.getElementById("favoriteRecipesList");
  recipeUrls.data.forEach(({ recipe_id }) => {
    const li = document.createElement("li");
    li.textContent = `${recipe_id}`;
    li.classList.add("favorite-item");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove Favorite";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", async () => {
      await deleteFavorite(1, recipe_id);
      li.remove();
    });
    li.appendChild(deleteButton);
    recipeList.appendChild(li);
  });
});

async function deleteFavorite(userId, recipeId) {
  try {
    const encodedUrl = encodeURIComponent(recipeId);
    const url = `/api/favorites/${userId}/${encodedUrl}`;
    console.log(url);
    const response = await axios.delete(
      `/api/favorites/${userId}/${encodedUrl}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw error;
  }
}

async function displayFavoriteRecipes() {
  try {
    const response = await axios.get(`${baseUrl}/api/favorites`, {
      params: {
        userId: 1,
      },
    });
    console.log("response 100", response);
    return response;
  } catch (error) {
    console.error("Error displayFavoriteRecipes():", error);
  }
}
