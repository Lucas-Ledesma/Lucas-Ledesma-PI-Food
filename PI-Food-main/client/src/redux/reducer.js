import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    GET_YOUR_RECIPES,
    GET_FILTERED_RECIPES,
    CREATED_RECIPE,
    FILTERS_OFF,
  } from './actions-types';

const initialState = {
    allRecipes: [],
    filteredRecipes: [], // Nuevo state para las recetas filtradas
    recipe: [],
    diets: [],
    filter: false,
    userRecipes: [],
    created: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RECIPES:
        return {
          ...state,
          allRecipes: action.payload,
        };
      case GET_DIETS:
        return {
          ...state,
          diets: action.payload,
        };
      case GET_YOUR_RECIPES:
        return {
          ...state,
          userRecipes: action.payload,
        };
      case GET_RECIPE_DETAIL:
        return {
          ...state,
          recipe: action.payload,
        };
        case GET_FILTERED_RECIPES:
        return {
          ...state,
          filteredRecipes: action.payload,
          filter: true,
        };
        case CREATED_RECIPE:
        return {
          ...state,
          created: true,
        };
        case FILTERS_OFF:
        return {
          ...state,
          filter: false,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  