import React, { Fragment, useState } from 'react';

//function take the movie url and passes it to an image tag and
// the src of the image is the movi poster url
const MovieList = (props) => {

    const FavouriteComponent = props.favouriteComponent;
    return(
            <Fragment>
            {props.movies.map((movie, index)=>
                <div className='image-container d-flex justify-content-start m-3'>
                <img src={movie.Poster} alt='movie'>
                </img>
                <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                    <FavouriteComponent/>
                </div>
                </div>)}
            </Fragment>
    )
}
export default MovieList;