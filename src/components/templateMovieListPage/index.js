import React, { useState } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterControls from "../filterControls";
import GenresContextProvider from "../../contexts/genresContext";

const MovieListPageTemplate = ({ movies, title, action }) => {
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

  return (
    <>
      {/* {JSON.stringify(movies[0])} */}
      <Header title={title} numMovies={displayedMovies.length} />
      <GenresContextProvider>
        <FilterControls
          onUserInput={handleChange}
          numMovies={displayedMovies.length}
        />
      </GenresContextProvider>
      <MovieList
              action={action}
        // buttonHandler={buttonHandler}
        movies={displayedMovies}
      ></MovieList>
    </>
  );
};

export default MovieListPageTemplate;
