import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../redux/actions';
import { Header } from '../componentes/Header';
import '../css/Detail.css';

export const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state) || [];
  const recipe = recipes.recipe || [];
  const instructions = recipe.analyzedInstructions || [];

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours} hr ${mins} min`;
    } else if (hours > 0){
      return `${hours} hr`;
    }else {
      return `${mins} min`;
    }
  };

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, []);
  
  let ingredients = [];
  instructions.forEach((step) => {
 
    step.ingredients.forEach((ingredient) => {
      if (ingredient && ingredient.name) {
        ingredients.push(ingredient.name);
      }
    });
  
});

  const ingredientNames = [...new Set(ingredients)]

  const allInstructions = instructions.map((step) => step.step);

  return (
    <>
      <Header />
      {recipe && (
        <div className='detail-container'>
          <div className='important-info'>
            <div className='info'>
              <h5 className='id'>{recipe.id}</h5>
              <h1>{recipe.title}</h1>
              <h2 className='time'>
                {formatTime(recipe.readyInMinutes)} 
              </h2>
              <h2 className='time'>
                Health Score: {recipe.healthScore}
              </h2>
              <div className='diet'>
                <p>Diets: {recipe.diet?.map((diet)=>` ${diet + ' -'} `)}</p>
              </div>
            </div>
            <div className='image-container-detail'>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          </div>
          <div className='summary'>
            <h4>Summary</h4>
            {recipe.summary?.replace(/<[^>]+>/g, '')}
          </div>
          <div className='column'>
            <div className='ingredients'>
              <h4>Ingredient:</h4>
                {Array.from(ingredientNames).map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
            </div>
            <div className='instructions'>
              <h4>Recipe Preparation</h4>
              <ul>
                {allInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
