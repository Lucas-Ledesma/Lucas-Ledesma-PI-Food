const { Diet } = require('../db');
const { getApiData } = require('../helpers/getApiData');

async function getDiets(req, res) {
  try {
    const diets = await Diet.findAll( {attributes: ['name'],} );

    if (diets.length === 0) {
      const data = await getApiData();
      let dietNames = [];

      data.forEach((recipe) => {
        recipe.diets.forEach((diet) => {
          dietNames.push(diet);
        });
      });
      dietNames = [...new Set(dietNames)];
    
      await Promise.all(
        dietNames.map((name) => {
          return Diet.findOrCreate({ where: { name } });
        })
      );

      const updatedDiets = await Diet.findAll({
        attributes: ['name'],
      });
      return res.status(200).json(updatedDiets.map((diet) => diet.name));
    }
    return res.status(200).json(diets.map((diet) => diet.name));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  getDiets,
};
