import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext} from '../contexts/moviesContext'
import AddToFavoritesButton from '../components/buttons/addToFavorites'
 
const MovieListPage = () => {
  const context = useContext(MoviesContext);

  return (
      <PageTemplate 
        title='All Movies'
        movies={context.movies}
        action={movie => <AddToFavoritesButton movie={movie} /> } 
        // buttonHandler={context.addToFavorites}
      />
  );
};

export default MovieListPage;
