let movies;
const filterByTitle = (movieList, string) =>
  movieList.filter(
    (m) => m.title.toLowerCase().search(string.toLowerCase()) !== -1
  );

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Home Page ", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Base tests", () => {
    it("displays page header", () => {
      cy.task("log", `No. movies received ${movies.length} `);
      cy.get("h2").contains("No. Movies");
      cy.get(".badge").contains(20);
    });

    it("displays movie cards in correct positions", () => {
      cy.get(".card").each(($card, index) => {
        cy.wrap($card)
          .find(".card-title")
          .should("have.text", movies[index].title);
      });
    });
  });
  describe("Filtering", () => {
    describe("By movie title", () => {
      it("should display movies with 'p'  in the title", () => {
        const searchString = "p";
        const matchingMovies = filterByTitle(movies, searchString);
        cy.get("input").clear().type(searchString);
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
            .find(".card-title")
            .should("have.text", matchingMovies[index].title);
        });
      });
      it("should display movies with 'o' in the title", () => {
        const searchString = "o";
        const matchingMovies = filterByTitle(movies, searchString);
        cy.get("input").clear().type(searchString); //should("contain", 50);
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
            .find(".card-title")
            .should("have.text", matchingMovies[index].title);
        });
      });
      it("should display no movie card when the specified title substring is xyz ", () => {
        let searchString = "xyz";
        let matchingMovies = filterByTitle(movies, searchString);
        cy.get("input").clear().type(searchString); //should("contain", 50);
        cy.get(".card").should("have.length", matchingMovies.length);
      });
    });
    describe("By movie genre", () => {
      it("should display movies with the specified genre only", () => {
        let selectedGenreId = 35;
        let selectedGenreText = "Comedy";
        let matchingMovies = filterByGenre(movies, selectedGenreId);
        cy.get("select").select(selectedGenreText); 
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
            .find(".card-title")
            .should("have.text", matchingMovies[index].title);
        });
      });
    });
    describe("By a combination of title and genre", () => {
      it("should display the matching movies", () => {
        const searchString = "o";
        let selectedGenreId = 35;
        let selectedGenreText = "Comedy";
        let matchingMovies = filterByTitle( filterByGenre(movies, selectedGenreId), searchString) ;
        cy.get("select").select(selectedGenreText);
        cy.get("input").clear().type(searchString); //should("contain", 50);
        cy.get(".card").should("have.length", matchingMovies.length);
        cy.get(".card").each(($card, index) => {
          cy.wrap($card)
            .find(".card-title")
            .should("have.text", matchingMovies[index].title);
        });
      });
    });
  });
  // // describe("Navigation", () => {
  // //   it("navigate to the movie page when clicked", () => {
  // //     cy.get(".card").eq(1).find("img").click();
  // //     cy.url().should("include", `/movies/${movies[1].id}`);
  // //   });
  // // });
});
