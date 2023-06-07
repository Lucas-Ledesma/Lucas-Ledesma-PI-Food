import React from 'react';
import { Header } from '../componentes/Header';
import  Cards  from '../componentes/Cards/Cards';
import '../css/home.css';

export const Home = () => {
    return (
        <div className='home'>
          <Header />
          <Cards />
        </div>
    );
};