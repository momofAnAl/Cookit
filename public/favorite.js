const baseUrl = "http://localhost:8000";
async function getFavoritesbyId () {
    try {
        const response = await axios.get(`${baseUrl}/api/favorites`, {
            params: {
                userId: userId,
            }
        });
        const favorites = response.data;
        console.log("Favorites:", favorites);
    } catch (error) {
        // Handle errors
        console.error("Error fetching favorites:", error);
    }
}
getFavoritesbyId(1);
    
    // const recipeUrl = await axios.get((`${baseUrl}/api/favorites`, {
    //     param: {
    //         userId: 1,
    
//return an array of recipesId
//using recipesId to call api 