describe("template spec", () => {
  it("Two split screen template", () => {
    cy.visit("/two-split");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", "a b");
    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / a / a");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "b / b / b / b");
  });

  it("Two split vertical screen template", () => {
    cy.visit("/two-split-vertical");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", '"a" "b" "c" "d" "e"');

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / c / c");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "d / d / e / e");
  });
});
