import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext} from '../contexts/moviesContext'

const MovieListPage = () => {
  const context = useContext(MoviesContext);

  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   getMovies().then(movies => {
  //     setMovies(movies);
  //   });
  // }, []);

  // const addToFavorites = movieId => {
  //   setMovies(movies => {
  //     const index = movies.map(m => m.id).indexOf(movieId);
  //     StubAPI.add(movies[index]);
  //     let newMoviesState = [...movies]
  //     newMoviesState.splice(index, 1);
  //     return newMoviesState;
  //   });
  // };

  return (
      <PageTemplate 
        title='All Movies'
        movies={context.movies}
        buttonHandler={context.addToFavorites}
      />
  );
};

export default MovieListPage;
