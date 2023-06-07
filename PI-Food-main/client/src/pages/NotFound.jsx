import React from 'react';
import '../css/notFound.css'

export const NotFound = () => {
    return (
        <div className='errorN'>
          <div className='error-message'>
            <h1>
              Error: 404 
            </h1>
            <h2>
              Page not found
            </h2>
          </div>
        </div>
    );
};