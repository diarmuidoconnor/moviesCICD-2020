import React from "react";
// import { withRouter } from "react-router-dom";
import PageTemplate from '../components/templateMoviePage'
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
 
  return (
      <PageTemplate movie={props.location.state.movie}>
        <MovieReview review={props.location.state.review} /> 
      </PageTemplate>
  );
};

export default (MovieReviewPage);
