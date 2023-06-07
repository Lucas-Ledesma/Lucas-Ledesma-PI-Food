const { Op } = require('sequelize');
const { Recipe, Diet, ApiData } = require('../db.js');
const { getApiDataById, getApiDataByName, getApiData } = require('../helpers/getApiData');

const getRecipesDb = async () => {
  const recipes = await Recipe.findAll();
  const recipesDiets = await Promise.all(
    recipes.map(async (recipe) => {
      const diets = await recipe.getDiets();
      const dietsString = diets.map((diet) => diet.name);
      return { ...recipe.toJSON(), diets: dietsString };
    })
  );

  return recipesDiets;
};

const getRecipesDbById = async (id) => {
  if (!id) throw new Error(`The id is required`);

  let recipe = await Recipe.findByPk(id);

  if (recipe) {
    return { ...recipe.toJSON() };
  }

  let apiDat = await ApiData.findByPk(id);
  if (apiDat) {
    return apiDat;
  }
};



const getRecipeDbByName = async (name) => {
  let recipes = await Recipe.findAll(
    {
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
    },
    {
      include: {
        model: Diet, through: { attributes: [], },
      },
    }
  );

  
  if (recipes.length === 0) {
    const DbData = await ApiData.findAll();
      if (DbData.length === 0) {
        await ApiData.create({ data: await getApiData() });
        const DbData = await ApiData.findAll();
        const data = DbData[0].dataValues.data;
        recipes = data.filter((recipe) => recipe.title.toLowerCase().includes(name.toLowerCase()));
        return recipes;
      }
    recipes = DbData[0].dataValues.data.filter((recipe) => recipe.title.toLowerCase().includes(name.toLowerCase()));
    return recipes;
  }

  return recipes;
};


module.exports = {
    getRecipesDb,
    getRecipesDbById,
    getRecipeDbByName,
};