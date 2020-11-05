
describe("Home Page ", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Demo", () => {
    it("Demo 1", () => {
  //     cy.get(".card").eq(0).find("span").eq(1).should("contain", "7.2");
  //     cy.get(".card").eq(0).find("svg[data-icon=star]").next();
  //     cy.get("svg[data-icon=star]").eq(1).next();
    });
  //   it("Demo 2", () => {
  //     cy.get(".card")
  //       .eq(2)
  //       .within(() => {
  //         cy.get("h4").should("have.text", "2067");
  //         cy.get("svg[data-icon=star]").next().should("contain", "5.2");
  //       });
  //   });
  //   it("Demo 3", () => {
  //     cy.get(".card").each((card, index) => {
  //       // cy.get('h4').should('have.text','2067' )
  //       cy.wrap(card).find("svg[data-icon=star]");
  //     });
  //   });
  //   it("Demo 4", () => {
  //     cy.get(".card").its("length").should("equal", 20);
  //   });
  });
});
