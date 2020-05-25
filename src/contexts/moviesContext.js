import React, { useState, useEffect, createContext } from "react";

import StubAPI from "../api/stubAPI";
import { getMovies } from "../api/tmdb-api";

export const MoviesContext = createContext(null)

const MoviesContextProvider = props => {
  const [movies, setMovies] = useState([]);

  const addToFavorites = movieId => {
    const index = movies.map(m => m.id).indexOf(movieId);
    StubAPI.add(movies[index]);
    const updatedList = [...movies]
    updatedList.splice(index, 1);
    setMovies(updatedList)
    // setMovies(movies => {
    //   const index = movies.map(m => m.id).indexOf(movieId);
    //   StubAPI.add(movies[index]);
    //   movies.splice(index, 1);
    //   return [...movies];
    // });
  };
  useEffect(() => {
    console.log('movies context')
    getMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: movies,
        addToFavorites: addToFavorites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider