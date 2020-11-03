import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/HomePage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";

// import LandingPage from "./pages/landingPage";
// import MoviePage from "./pages/moviePage";
// import FavoriteMoviesPage from "./pages/favoritesMoviesPage";
// import MovieReviewPage from "./pages/movieReviewPage";
// import AddMovieReviewPage from "./pages/addMovieReviewPage";

import MoviesContextProvider from "./contexts/moviesContext";
import GenresContextProvider from "./contexts/genresContext";

import SiteHeader from "./components/siteHeader";

const MoviePage = lazy(() => import("./pages/moviePage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoritesMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="jumbotron">
        <SiteHeader />
        <MoviesContextProvider>
          <GenresContextProvider>
            <div className="container-fluid">
              <Suspense fallback={<h1>Loading ....</h1>}>
                <Switch>
                  <Route
                    exact
                    path="/reviews/form"
                    component={AddMovieReviewPage}
                  />
                  <Route path="/reviews/:id" component={MovieReviewPage} />
                  <Route
                    exact
                    path="/movies/favorites"
                    component={FavoriteMoviesPage}
                  />
                  <Route
                    exact
                    path="/movies/upcoming"
                    component={UpcomingMoviesPage}
                  />                 
                  <Route path="/movies/:id" component={MoviePage} />
                  {/* <Route path="/discover" exact component={HomePage} /> */}
                  <Route path="/" exact component={HomePage} />
                  <Redirect from="*" to="/" />
                </Switch>
              </Suspense>
            </div>
          </GenresContextProvider>
        </MoviesContextProvider>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
