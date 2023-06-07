import React from 'react';
import '../css/index.css'
import '../css/landing.css'
import { useNavigate } from 'react-router-dom';
import image from '../image/FNDPANTALLA.jpg'

export const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };
  

  return (
      <div className="landing-page-content">
        <img src={image} alt="logo" className="landing-page-logo" />
        <button className="enter-button" onClick={handleClick}>Learn More</button>
      </div>
  );
};