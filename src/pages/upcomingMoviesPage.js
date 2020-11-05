import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import AddToWatchButton from "../components/buttons/addToWatchList";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMovieListPage = () => {
  const context = useContext(MoviesContext);

  return (
      <PageTemplate 
        title='Upcoming Movies'
        movies={context.upcoming}
        action={(movie) => {
          return <AddToWatchButton movie={movie} />;
        }}       
      />
  );
};

export default UpcomingMovieListPage;
