import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Detail } from '../pages/Detail';
import { NotFound } from '../pages/NotFound';
import  RecipeForm  from '../pages/Form';
import '../css/index.css'

export const AppRoutes = () => {
    return ( 
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/home/:id" element={<Detail />} />
            <Route path="/form" element={<RecipeForm />} />
            <Route path="*" element={<NotFound />} /> 
        </Routes>
    );
};
