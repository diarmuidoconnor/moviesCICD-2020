let movies;
describe("Main View ", () => {
  beforeEach(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
    cy.visit("/");
    cy.get(".card").eq(1).as("targetcard");
  });

  it("displays page header", () => {
    cy.get("h2").contains("All Movies");
    cy.get(".badge").should("contain", 20);
  });

  it("displays movie cards in correct positions", () => {
    cy.get(".card").each(($card, index) => {
      cy.wrap($card).find(".card-title").should("contain", movies[index].title);
    });
  });
  describe("Filtering", () => {
    // Use custom commands to DRY code
    it("should display movies with the specified title substring only", () => {
      let searchString = "m";
      let displayedMovies = movies.filter((m) => {
        return m.title.toLowerCase().search(searchString) !== -1;
      });
      cy.get("input").clear().type(searchString); //should("contain", 50);
      cy.get(".card").should("have.length", displayedMovies.length);
      searchString = "o";
      displayedMovies = movies.filter((m) => {
        return m.title.toLowerCase().search(searchString) !== -1;
      });
      cy.get("input").clear().type(searchString); //should("contain", 50);
      cy.get(".card").should("have.length", displayedMovies.length);
    });
    it("should display no movie card when the specified title substring is xyz ", () => {
      let searchString = "xyz";
      let displayedMovies = movies.filter((m) => {
        return m.title.toLowerCase().search(searchString) !== -1;
      });
      cy.get("input").clear().type(searchString); //should("contain", 50);
      cy.get(".card").should("have.length", displayedMovies.length);
    });
    it("should display movies with the specified genre only", () => {
      let selectedGenreId = 35;
      let selectedGenreText = "Comedy";
      let displayedMovies = movies.filter((m) => {
        return m.genre_ids.includes(selectedGenreId);
      });
      cy.get("select").select(selectedGenreText); //should("contain", 50);
      cy.get(".card").should("have.length", displayedMovies.length);
      selectedGenreId = 12;
      selectedGenreText = "Adventure";
      displayedMovies = movies.filter((m) => {
        return m.genre_ids.includes(selectedGenreId);
      });
      cy.get("select").select(selectedGenreText); //should("contain", 50);
      cy.get(".card").should("have.length", displayedMovies.length);
    });
  });
  describe("Navigation", () => {
    it("navigate to the movie page when clicked", () => {
      cy.get("@targetcard").find("img").click();
      cy.url().should("include", `/movies/${movies[1].id}`);
    });
  });
});
