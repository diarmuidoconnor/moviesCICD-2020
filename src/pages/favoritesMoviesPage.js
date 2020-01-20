import React from "react";
import StubAPI from "../api/stubAPI";
import MovieListPageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = props => {
  const toDo = () => true;

  return (
    <MovieListPageTemplate
      movies={StubAPI.getAll()}
      title={"Favorite Movies"}
      buttonHandler={toDo}
      // action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default FavoriteMoviesPage;
