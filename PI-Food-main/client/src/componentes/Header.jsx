import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  image  from '../image/COOK TEXTO.png'
import {MdSearch} from 'react-icons/md'
import '../css/header.css';

export const Header = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const recipes = useSelector((state) => state) || [];
  const allRecipes = recipes.allRecipes || [];
  const navigate = useNavigate();

  const matchedTitles = allRecipes.filter((recipe) => recipe.title.includes(searchTerm)).map((recipe) => recipe.title);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (recipe) => {
    const selectedRecipe = allRecipes.find((r) => r.title === recipe);
    if (selectedRecipe) {
      const recipeId = selectedRecipe.id;
      navigate(`/home/${recipeId}`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setSearchTerm('')
    }
    window.addEventListener('click', handleOutsideClick)
  }, [])

  const handleHome = () => {
    navigate('/home')
  }
  
  return (
    <div className="header">
      <img src={image} alt="" onClick={handleHome}/>
      <div className="search-bar">
        <div className='search'>
          <input
            type="text"
            placeholder=" Search recipes"
            value={searchTerm}
            onChange={handleSearch}
            className='search-input'
          />
          <MdSearch className='lupa'/>
        </div>
        {searchTerm.length > 0 && (
          <div className="search-results">
            {matchedTitles ? (
              matchedTitles.map((recipe) => (
              <button onClick={()=>handleClick(recipe)} >
                {recipe}
              </button>
            ))
            ):(
            <button>
              No results
            </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
