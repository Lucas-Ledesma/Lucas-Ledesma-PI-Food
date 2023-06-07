import React from 'react';
import '../../css/cards.css';
import { Link } from 'react-router-dom';

const Card = ({ recipe }) => {
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

  return (
    <div className="card">
      <Link to={`/home/${recipe.id}`} className='link'>
        <div className="link-content">
          <div className='link-content-img'>
            <img src={recipe.image} alt={recipe.title} />
          </div>
          <div className='card-info'>
            <h3>{recipe.title}</h3>
            <h3 className='card-time'>{formatTime(recipe.readyInMinutes)} </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
