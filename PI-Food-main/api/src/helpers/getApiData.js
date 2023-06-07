const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;
const instancia = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
});
  

const getApiData = async () => {
  try {
 
      const { data } = await instancia(
        `/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );
  
      const apiRecipes = data.results.map((recipe) => {
        const { id, title, image, pricePerServing, readyInMinutes, servings, healthScore, cuisines, summary, sourceName } = recipe;
        const dietsString = recipe.diets;
        return {id, title, image, pricePerServing, readyInMinutes, servings, healthScore, cuisines, summary, diets: dietsString, sourceName };
      });
  
      return apiRecipes;
    
  } catch (error) {
    throw new Error(error);
  }
};


const getApiDataById = async (id) => {
  try {
    const [recipeData, analyzedInstructionsData] = await Promise.all([
      instancia(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`),
      instancia(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`)
    ]);

    const recipe = recipeData.data;
    const analyzedInstructions = analyzedInstructionsData.data[0]?.steps || [];

    const combinedData = {
      ...recipe,
      analyzedInstructions
    };

    return combinedData;
  } catch (error) {
    throw new Error(error);
  }
};


const getApiDataByName = async (name) => {
  try {
      const { data } = await instancia(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&addRecipeInformation=true`
      );
      return data.results;
  } catch (error) {
      throw new Error(error);
  }
};

module.exports = {
  getApiData,
  getApiDataById,
  getApiDataByName,
};