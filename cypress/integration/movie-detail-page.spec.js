import { excerpt } from "../../src/util";

let movieId = 605116; // Project Power
let movie;
let reviews;
describe("Main View ", () => {
  beforeEach(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        return response.results[2].id;
      })
      // Remove above code - hard wired movie Id
      .then((movieIdignored) => {
        return cy
          .request(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Cypress.env(
              "TMDB_KEY"
            )}`
          )
          .its("body");
      })
      .then((movieDetails) => {
        movie = movieDetails;
        return movieDetails.id;
      })
      .then((movieId) => {
        return cy
          .request(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
              "TMDB_KEY"
            )}`
          )
          .its("body");
      })
      .then((response) => {
        reviews = response.results;
        cy.visit(`/movies/${movie.id}`);
      });
  });

  it("displays page header", () => {
    cy.get("h2").contains(movie.title);
  });

  it("displays the movie's details", () => {
    cy.get("h4").contains("Overview");
    cy.get("h4").next().contains(movie.overview);
    cy.get("ul")
      .eq(1)
      .within(() => {
        cy.get("li").eq(0).contains("Runtime");
        cy.get("li").eq(1).contains(movie.runtime);
        cy.get("li").eq(2).contains("Release Date");
        cy.get("li").eq(3).contains(movie.release_date);
      });
  });
  describe("Reviews", () => {
    it("should show and hide reviews table via button", () => {
      cy.get(".row").eq(2).find("a").click();
      cy.get("table")
        .find("thead")
        .within(() => {
          cy.get("th").eq(0).contains("Author");
          cy.get("th").eq(1).contains("Excerpt");
        });
      cy.get(".row").eq(2).find("a").click();
      cy.get("table").should("not.exist");
    });
    it("should display all the review excerptss", () => {
      cy.get(".row").eq(2).find("a").click();
      cy.get("table")
        .find("tbody")
        .find("tr")
        .its("length")
        .should("equal", reviews.length);
      cy.get("table")
        .find("tbody")
        .find("tr")
        .each(($tr, index) => {
          cy.wrap($tr).find("td").eq(0).contains(reviews[index].author);
          console.log(excerpt(reviews[index].content));
          cy.wrap($tr)
            .find("td")
            .eq(1) //.contains(`${excerpt(reviews[index].content)}`)
            .should('have.text', excerpt(reviews[index].content))
        });
    });
  });
});
