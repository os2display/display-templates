import React from "react";
import Iframe from "../../src/iframe/iframe";

describe("Iframe template", () => {
  it("Iframe basic", () => {
    const mock = {
      slideDone: (arg) => {
        return arg;
      },
    };
    cy.stub(mock, "slideDone").as("slideDoneStub");
    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Iframe
          content={{
            duration: 500,
            source:
              "https://images.unsplash.com/photo-1551373884-8a0750074df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
          }}
          slide={{
            id: "slide8-iframe",
            type: "iframe",
            themeFile: "themes/dokk1.css",
            mediaData: {
              "/v1/media/00000000000000000000000001": {
                assets: {
                  uri: "/fixtures/images/mountain1.jpeg",
                },
              },
            },
            content: {
              duration: 500,
              source:
                "https://images.unsplash.com/photo-1551373884-8a0750074df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
            },
          }}
          run={new Date().toISOString()}
          slideDone={mock.slideDone}
          executionId="SLIDE_ID"
        />
      </div>
    );

    // Slide done not called yet...
    cy.get("@slideDoneStub").should("not.be.called");
    cy.get("iframe")
      .should("exist")
      .should(
        "have.attr",
        "src",
        "https://images.unsplash.com/photo-1551373884-8a0750074df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80"
      );

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    // Slide done called...
    cy.get("@slideDoneStub").should("be.called");
  });
});
