export const filterRecipes = (allRecipes, filterType) => {
  if (filterType === 'Diet') {
    return allRecipes;
  } else {
    return allRecipes.filter((recipe) => recipe.diets.includes(filterType));
  }
};

export const paginateRecipes = (recipes, currentPage, recipesPerPage) => {
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  return recipes.slice(startIndex, endIndex);
};

export const calculateTotalPages = (recipesPerPage, totalRecipes) => {
  return Math.ceil(totalRecipes / recipesPerPage);
};



