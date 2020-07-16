import React, { useEffect, createContext, useReducer } from "react";
import { getMovies } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  // console.log(state)
  // console.log(action)

  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.filter((m) => m.id !== action.payload.movie.id),
        favorites: [...state.favorites, action.payload.movie],
      };
    case "load":
      return { movies: [...action.payload.movies], favorites: [] };
    case "add-review":
      return {
        movies: [...state.movies],
        favorites: [
          ...state.favorites.filter((m) => m.id !== action.payload.movie.id),
          { ...action.payload.movie, review: action.payload.review },
        ],
      };

    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  // const [movies, setMovies] = useState([]);
  const [state, dispatch] = useReducer(reducer, { movies: [], favorites: [] });

  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
    // StubAPI.add(movies[index]);
    // const updatedList = [...movies]
    // updatedList.splice(index, 1);
    // setMovies(updatedList)
    // setMovies(movies => {
    //   const index = movies.map(m => m.id).indexOf(movieId);
    //   StubAPI.add(movies[index]);
    //   movies.splice(index, 1);
    //   return [...movies];
    // });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };
  useEffect(() => {
    getMovies().then((movies) => {
      dispatch({ type: "load", payload: { movies } });
      // setMovies(movies);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        favorites: state.favorites,
        addToFavorites: addToFavorites,
        addReview: addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
