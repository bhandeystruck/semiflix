import React from 'react';
import MovieList from './MovieList';

const MoviesListHeading = (props) =>{
    return (
        <div className='col'>
            <h1>{props.heading}</h1>
        </div>
    )
}
export default MoviesListHeading;