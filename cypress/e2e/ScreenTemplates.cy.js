describe("template spec", () => {
  it("passes", () => {
    cy.visit("/two-split");
    cy.wait(2000);
  });
});
