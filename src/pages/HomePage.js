import React, { useState, useEffect } from "react";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import FilterControls from "../components/filterControls";
import StubAPI from "../api/stubAPI";
import { honeydew } from "color-name";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => json.results )
      .then(movies => {
        setMovies(movies);
      });
  }, []);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genre = Number(genreFilter);
  let displayedMovies = movies
    .filter(m => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter(m => {
      return genre > 0 ? m.genre_ids.includes(Number(genreFilter)) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const addToFavorites = movieId => {
    setMovies(movies => {
      const index = movies.map(m => m.id).indexOf(movieId);
      StubAPI.add(movies[index]);
      let newMoviesState = [...movies]
      newMoviesState.splice(index, 1);
      return newMoviesState;
    });
  };

  return (
    <>
      {/* {JSON.stringify(movies)} */}
      <Header numMovies={displayedMovies.length} />
      <FilterControls onUserInput={handleChange} />
      <MovieList
        movies={displayedMovies}
        buttonHandler={addToFavorites}
      ></MovieList>
    </>
  );
};

export default MovieListPage;
