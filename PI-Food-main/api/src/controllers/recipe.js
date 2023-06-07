const axios = require('axios');
const { Recipe, Diet, ApiData } = require('../db');
const {data} = require('../helpers/Data');
require('dotenv').config();
const { getRecipesDbById, getRecipeDbByName } = require('../helpers/getDbData');
const { getApiDataById, getApiDataByName, getApiData } = require('../helpers/getApiData');

async function recipeGet (req, res) {	
  const { name } = req.query;
  try {
    if (!name ) {
      
      const userData = await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: [] 
          }
        }
      });
      const userRecipes = userData.map((recipe) => {
        const dataValues = recipe.dataValues;
        const diets = dataValues.diets.map((diet) => diet.dataValues.name);
        return { ...dataValues, diets };
      });
    
      const recipes = [await getApiData()]

      recipes.push([...userRecipes]);

      return res.status(200).json(recipes);
      
    }

    const recipe = await getRecipeDbByName(name);
    
    
    if (recipe.length > 0) {
      return res.status(200).json(recipe);
    }
    
    const apiRecipe = await getApiDataByName(name);
    if (apiRecipe) {
      const recipes = apiRecipe.map((recipe) => recipe.data);
      return res.status(200).json(recipes);
  }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




async function recipeGetbyId(req, res) {
  const { id } = req.params;
  try {
   
    const recipe = await getRecipesDbById(id);
    
    if (recipe) {
      return res.status(200).json(recipe);
    }
    
    const apiRecipe = await getApiDataById(id);
      if (apiRecipe) {
        const newRecipe = {
          id: apiRecipe.id,
          title: apiRecipe.title,
          image: apiRecipe.image,
          pricePerServing: apiRecipe.pricePerServing,
          readyInMinutes: apiRecipe.readyInMinutes,
          servings: apiRecipe.servings,
          healthScore: apiRecipe.healthScore,
          cuisines: apiRecipe.cuisines,
          summary: apiRecipe.summary,
          analyzedInstructions: apiRecipe.analyzedInstructions,
          diet: apiRecipe.diets,
        };
        return res.status(200).json(newRecipe);
      }
    
    } catch (error) {
      res.status(400).json({ error: error.message });
  }
}




async function recipesDelete(req, res) {
  const { id } = req.params;
  try {
    await Recipe.destroy({
      where: {
        id: id,
      },
    });
    
    res.status(200).json({ message: Recipe });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function recipesPost(req, res) {
  
  const {
    pricePerServing,
    readyInMinutes,
    healthScore,
    title,
    image,
    diet, 
    summary,
    analyzedInstructions
  } = req.body;

 
  try {
    const receta = await Recipe.create({
      pricePerServing,
      readyInMinutes,
      healthScore,
      title,
      image,
      summary,
      analyzedInstructions,
      diet,
    });
    
    res.status(201).json(receta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// async function recipeGet (req, res) {	
//   const { name } = req.query;
//   try {
//     if (!name ) {
      
//       const userData = await Recipe.findAll({
//         include: {
//           model: Diet,
//           attributes: ['name'], // Incluir solo el nombre de la dieta en lugar de todos los campos
//           through: {
//             attributes: [] // Excluir los campos adicionales de la tabla intermedia
//           }
//         }
//       });
//       const apiData = await ApiData.findAll();
//       const userRecipes = userData.map((recipe) => {
//       const dataValues = recipe.dataValues;
//       const diets = dataValues.diets.map((diet) => diet.dataValues.name);
//       return { ...dataValues, diets }; // No se necesita la desestructuración {...}
// });
//       const recipes = apiData.map((data) => data.dataValues.data);
//       recipes.push([...userRecipes]);

//       if (apiData.length === 0) {
//         await ApiData.create({ data: data });
//         const apiData = await ApiData.findOne();
//         const userRecipes = await Recipe.findAll();
//         const recipes = apiData ? [apiData.dataValues.data] : []; // Asegúrate de obtener el campo de datos
//          // Utiliza findOne para obtener un solo registro
//         recipes.push([...userRecipes]);
        
//         return res.status(200).json(recipes);
//       }
      

//       return res.status(200).json(recipes);
      
//     }

//     const recipe = await getRecipeDbByName(name);
    
    
//     if (recipe.length > 0) {
//       return res.status(200).json(recipe);
//     }
    
//     const apiRecipe = await getApiDataByName(name);
//     if (apiRecipe) {
//       const recipes = apiRecipe.map((recipe) => recipe.data);
//       return res.status(200).json(recipes);
//   }

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


module.exports = {
  recipeGetbyId,
  recipeGet,
  recipesDelete,
  recipesPost
};

