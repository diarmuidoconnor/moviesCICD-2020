import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesButton from "../components/buttons/addToFavorites";

const UpcomingMovieListPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setUpcomingMovies(movies);
    });
  }, []);

  const addToFavorites = movieId => {
    // setMovies(movies => {
    //   const index = upcomingmovies.map(m => m.id).indexOf(movieId);
    //   StubAPI.addToWatchList(movies[index]);
    //   let newMoviesState = [...movies]
    //   newMoviesState.splice(index, 1);
    //   return newMoviesState;
    // });
  };

  return (
      <PageTemplate 
        title='Upcoming Movies'
        movies={upcomingMovies}
        action={(movie) => {
          return <AddToFavoritesButton movie={movie} />;
        }}       
        buttonHandler={addToFavorites}
      />
  );
};

export default UpcomingMovieListPage;
