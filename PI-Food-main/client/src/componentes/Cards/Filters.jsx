import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSortedRecipes, getFilteredRecipe, filtersOff, getAllDiets, getAllRecipes } from '../../redux/actions';
import '../../css/cards.css';

const Filters = ({ diet }) => {
  const dispatch = useDispatch();

  const [selectedDiet, setSelectedDiet] = useState(localStorage.getItem('selectedDiet') || '');
  const [selectedOrigin, setSelectedOrigin] = useState(localStorage.getItem('selectedOrigin') || '');
  const [order, setOrder] = useState(true);
  const [isClicked, setIsClicked] = useState(null);

  useEffect(() => {
    localStorage.setItem('selectedDiet', selectedDiet);
    localStorage.setItem('selectedOrigin', selectedOrigin);
  }, [selectedDiet, selectedOrigin]);

  useEffect(() => {
    dispatch(getFilteredRecipe(selectedOrigin, selectedDiet))
  },[])

  const handleChange = (property) => {
    dispatch(getSortedRecipes(order, property));
    setIsClicked(prevButton => (prevButton === property ? null : property));
    setOrder(!order);
  };

  const handleFilter = (e) => {
    if (diet.includes(e.target.value)) {
      setSelectedDiet(e.target.value);
      dispatch(getFilteredRecipe(selectedOrigin, e.target.value))
    }
    if (e.target.value === 'Created Recipes' || e.target.value === 'Default Recipes' ) {
      setSelectedOrigin(e.target.value);
      dispatch(getFilteredRecipe(e.target.value, selectedDiet))
    }
  };

  const handleAllRecipes = () => {
    setSelectedDiet('');
    setSelectedOrigin('');
    dispatch(getFilteredRecipe('', ''));
    dispatch(getSortedRecipes(null, null));
    dispatch(filtersOff());
  };
  
  return (
    <div className="filter">
      <div className="filters">
        <select value={selectedDiet} onChange={handleFilter}>
          <option value="select Diet" >select Diet</option>
          {diet.map((diet) => (
            <option value={diet} key={diet} className='diets'>
              {diet}
            </option>
          ))}
        </select>

        <select value={selectedOrigin} onChange={handleFilter}>
          <option value="Select Origin" >Select Origin</option>
          <option value="Default Recipes">Default Recipes</option>
          <option value="Created Recipes">Created Recipes</option>
        </select>
        <button onClick={() => handleChange("readyInMinutes")} className={`button ${isClicked === "readyInMinutes" ? 'clicked' : ''}`}>Time </button>
        <button onClick={() => handleChange("title")} className={`button ${isClicked === "title" ? 'clicked' : ''}`}>Alphabetic </button>
        <button onClick={() => handleChange("healthScore")} className={`button ${isClicked === "healthScore" ? 'clicked' : ''}`}>Health Score </button>
        <button onClick={() => handleChange("pricePerServing")} className={`button ${isClicked === "pricePerServing" ? 'clicked' : ''}`}>Price </button>
        <button className={`button ${isClicked === "Clear" ? 'clicked' : ''}`} onClick={handleAllRecipes}> Clear </button>
      </div>
    </div>
  );
};

export default Filters;
