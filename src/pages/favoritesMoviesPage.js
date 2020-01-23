import React from "react";
import StubAPI from "../api/stubAPI";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddReviewButton from '../components/buttons/addReview'

const FavoriteMoviesPage = props => {

  return (
    <MovieListPageTemplate
      movies={StubAPI.getAll()}
      title={"Favorite Movies"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default FavoriteMoviesPage;
