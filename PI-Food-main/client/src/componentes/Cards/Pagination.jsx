import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginateRecipes, calculateTotalPages} from '../../helpers/dataFilter';
import { renderPageNumbers } from '../../helpers/renderPageNumbers';
import leftArrow from '../../image/left-arrow-backup-2-svgrepo-com.svg'
import rightArrow from '../../image/right-arrow-backup-2-svgrepo-com.svg'
import CardList from './CardList';
import '../../css/cards.css';

const Pagination = ({ currentRecipes }) => {
  const recipe = useSelector((state) => state) || [];
  const filteredRecipes = recipe.filteredRecipes || [];
  const recipesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  
  const currentRecipe = paginateRecipes(currentRecipes, currentPage, recipesPerPage);
  const totalPages = calculateTotalPages(recipesPerPage, currentRecipes.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRecipes]);
  

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const pageNumbers = renderPageNumbers(currentPage, totalPages, setCurrentPage);
  
  
  return (
    <div className='cards-container'>
        <CardList recipes={currentRecipe} />
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <img src={leftArrow} alt="" className={currentPage === 1 ? 'arrow disabled' : 'arrow'}/>
        </button>
        {pageNumbers}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          <img src={rightArrow} alt="" className={currentPage === totalPages ? 'arrow disabled' : 'arrow'}/>
        </button>
      </div>
    </div>
  );
  };

  export default Pagination;