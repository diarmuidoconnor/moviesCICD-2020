import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/moviePage";
import FavoriteMoviesPage from "./pages/favoritesMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import SiteHeader from "./components/siteHeader";

const App = () => {
  return (
    <MoviesContextProvider>
      <BrowserRouter>
        <div className="jumbotron">
          <SiteHeader />      {/* New Header    */}
          <div className="container-fluid">
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
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/" component={HomePage} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </MoviesContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
