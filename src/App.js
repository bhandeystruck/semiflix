import React, { useEffect, useState } from 'react';
//Adding bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MoviesListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {

  //create a state object to hold the movies
  const [movies, setMovies] = useState([]);

  //state object for the searching part
  const [searchValue, setSearchValue] = useState('');

  //state for favourites
  const [favourites, setFavourites] = useState([]);

//Function to make a request to the api
const getMovieRequest = async (searchValue) =>{
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c7c23d9`;
  const response = await fetch(url);
  const responseJson = await response.json();

  if(responseJson.Search){
    setMovies(responseJson.Search);
  }
 
};

//This function takes place when the page loads only
//When the search Values changes do what is in []
//always runs when the app loads for the first time
useEffect(() => {
  getMovieRequest(searchValue);
},[searchValue]);

useEffect(() => {
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
  );

  setFavourites(movieFavourites);
},[]);



const saveToLocalStorage = (item) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(item));
};


//a function to take a movie parameter and add it to the favourites state array
const addFavoriteMovie = (movie) =>{
  //creates a copy of our fav array and adds in the movie we pass it to
  const newFavouriteList = [...favourites, movie]
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};

//function to remove the selected favourite movie from the favourites list
const removeFavouriteMovie = (movie) =>{
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
};

  return <div className='container-fluid movie-app'>
            {/* The row div is created to slide the movies in a row*/}

            <div className='row d-flex align-items-center mt-4 mb-4'>
              <MoviesListHeading heading="SemiFlex"/>
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
            </div>

            <div className="row">
                <MovieList movies = {movies} handleFavouritesClick={addFavoriteMovie} favouriteComponent = {AddFavourite}/>
            </div>

            <div className='row d-flex align-items-center mt-4 mb-4'>
              <MoviesListHeading heading="Favourites"/>
            </div>

            <div className="row">
               <MovieList movies = {favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent = {RemoveFavourites}/>
            </div>

          </div>;
};

export default App;
