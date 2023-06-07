import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/cards.css';
import Filters from './Filters';
import Pagination from './Pagination';
import { getAllDiets, getAllRecipes } from '../../redux/actions';
import '../../css/font.css';
import image from '../../image/tabla2.jpg'

const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state) || [];
  const diet = recipe.diets;
  const filter = recipe.filter;
  const allRecipes = recipe.allRecipes || [];
  const filteredRecipes = recipe.filteredRecipes || [];
  
  useEffect(() => {
    dispatch(getAllDiets());
    dispatch(getAllRecipes());
  }, []);

  let currentRecipes = []
  if (filter) {
    currentRecipes.push(...filteredRecipes)
  }else{
    currentRecipes.push(...allRecipes)
  }

  const handleClick = () => {
    navigate('/form')
  }
 
  return (
    <div className="body-container">
      <div className='welcome'>
        <h1>
          RECIPES
        </h1>
        <p>
          Find delicious and healthy dishes by our best chefs!
        </p>
      </div>
      <div className='body-content'>
          <Filters diet={diet} />
          <Pagination currentRecipes={currentRecipes}/>
      </div>
      <div className='baner'>
        <img src={image} alt="" />
            <button onClick={handleClick}>
              Here
            </button>
      </div>
      <div className='footer'>
        <div className='contact-info'>
          <h1>contact info:</h1>
          <h3>LinkedIn: <a href="https://www.linkedin.com/in/lucas-ledesma-915589267/">lucas ledesma</a> </h3>
          <h3>Github: <a href="https://github.com/LcuasLedesma">Lucas Ledesma</a></h3>
          <h3>Instagram: <a href="https://www.instagram.com/lucas.ledesma99/">lucas.ledesma99</a></h3>
        </div>

      </div>
    </div>
  );
};

export default Cards;