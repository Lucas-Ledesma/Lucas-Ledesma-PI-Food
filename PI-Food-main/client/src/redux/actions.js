import axios from 'axios';
import {
    GET_DIETS,
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_YOUR_RECIPES,
    GET_FILTERED_RECIPES,
    CREATED_RECIPE,
    FILTERS_OFF,
} from './actions-types';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getAllRecipes = () => async (dispatch,getState) => {
    const allRecipes = getState().allRecipes;
    const created = getState().created;
    const userRecipes = getState().userRecipes;

    if (allRecipes.length === 0 || created === true) {   
        const { data } = await instance('/recipe');
        const concatenatedData = [...data[0], ...data[1]];
        dispatch({ type: GET_RECIPES, payload: concatenatedData });
        dispatch({ type: GET_YOUR_RECIPES, payload: data[1] });
        dispatch({ type: CREATED_RECIPE });
        return
    }

    dispatch({ type: GET_RECIPES, payload: allRecipes });
    dispatch({ type: GET_YOUR_RECIPES, payload: userRecipes });
  };

export const getAllDiets = () => async (dispatch) => {
    const { data } = await instance('/diet');
    dispatch({ type: GET_DIETS, payload: data });
};

export const getRecipeDetail = (id) => async (dispatch, getState) => {
    const { data } = await instance(`/recipe/${id}`);
    dispatch({ type: GET_RECIPE_DETAIL, payload: data });
};

export const getSortedRecipes = (order, property) => async (dispatch, getState) => {

    const allRecipes = getState().allRecipes;
    const filteredRecipes = getState().filteredRecipes;
    
    if (order === null || property === null) {
        
        dispatch({ type: GET_RECIPES, payload: allRecipes });
    }

    if ( order === true) {
        filteredRecipes.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    } else {
        filteredRecipes.sort((a, b) => (a[property] > b[property] ? -1 : 1));
    }
    
    dispatch({ type: GET_FILTERED_RECIPES, payload: filteredRecipes });
}

export const postRecipe = (recipe) => async (dispatch) => {
    await instance.post('/recipe', recipe);
    dispatch({ type: CREATED_RECIPE });
}

export const getFilteredRecipe = (origin, diets) => async (dispatch, getState) => {

    const allRecipes = getState().allRecipes;
    const userRecipes = getState().userRecipes;

    let filteredRecipes = [];
  switch (origin) {
    case 'Default Recipes':
      filteredRecipes = 
        diets
        ? allRecipes.filter((recipe) => recipe.diets && recipe.diets.includes(diets))
        : allRecipes;
      break;
    case 'Created Recipes':
      filteredRecipes = 
        diets
        ? userRecipes.filter((recipe) => recipe.diet && recipe.diet.includes(diets))
        : userRecipes;
      break;
    default:
      filteredRecipes = allRecipes;
      break;
  }
  if (!origin && diets) {
    filteredRecipes = allRecipes.filter((recipe) => recipe.diets && recipe.diets.includes(diets));
  }
  
    dispatch({ type: GET_FILTERED_RECIPES, payload: filteredRecipes });
};

export const filtersOff = () => async (dispatch) => {
    dispatch({ type: FILTERS_OFF });
}