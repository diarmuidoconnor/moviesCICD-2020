import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import MovieReviews from "../components/movieReviews";
import  useMovie from "../hooks/useMovie";
// import { Row } from "../globals/GlobalStyles";

const MoviePage = props => {
  const { id } = props.match.params;
  const [movie] = useMovie(id)
  // const [movie, setMovie] = useState(null);
  // useEffect(() => {
  //   getMovie(id).then(movie => {
  //     setMovie(movie);
  //   });
  // }, [id]);
  return (
    <>
    {/* {JSON.stringify(movie)} */}
    {movie ? (
      <>
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
        <div className="row">
          <div className="col-12 ">
            {!props.history.location.pathname.endsWith("/reviews") ? (
              <Link
                className="btn btn-primary btn-block"
                to={`/movies/${id}/reviews`}
              >
                Show Reviews
              </Link>
            ) : (
              <Link
                className="btn btn-primary btn-block"
                to={`/movies/${id}`}
              >
                Hide Reviews
              </Link>
            )}
          </div>
        </div>
        <Route
          path={`/movies/:id/reviews`}
          render={props => <MovieReviews movie={movie} {...props} />}
        />
      </>
    ) : (
      <p>Waiting for contact details</p>
    )}
  </>
  );
};

export default withRouter(MoviePage);
