import React from "react";
import Instagram from "../../src/instagram-feed/instagram-feed";

describe("Instagram", () => {
  it("Instagram basics", () => {
    const mock = {
      slideDone: (arg) => {
        return arg;
      },
    };
    cy.stub(mock, "slideDone").as("slideDoneStub");

    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Instagram
          slide={{
            id: "slide7-instagram",
            type: "instagram-feed",
            themeFile: "themes/dokk1.css",
            content: {
              duration: 500,
              hashtagText: "#myhashtag",
              orientation: "landscape",
              imageWidth: 40,
              entryDuration: 500,
              maxEntries: 5,
            },
            feedData: [
              {
                text: "#mountains #horizon",
                textMarkup:
                  '<div class="text">Sed nulla lorem, varius sodales justo ac, ultrices placerat nunc.</div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> Lorem ipsum ...</div>',
                mediaUrl: "./fixtures/images/mountain1.jpeg",
                videoUrl: null,
                username: "username",
                createdTime: "2022-02-03T08:50:07",
              },
              {
                text: "#video",
                textMarkup:
                  '<div class="text">Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rhoncus metus nec consequat commodo. Duis a rhoncus lorem. Vestibulum nec blandit ipsum, ut lobortis purus. In ultrices mauris vel felis pellentesque imperdiet. Sed ultricies mauris vel nisi mattis, tincidunt dictum nisl finibus. Nunc in ultrices dui.</div>\n<div class="tags"><span class="tag">#video</span> Lorem ipsum and video ...</div>',
                mediaUrl: null,
                videoUrl: "./fixtures/videos/test.mp4",
                username: "username2",
                createdTime: "2022-01-03T08:50:07",
              },
            ],
            theme: {
              cssStyles:
                '/*\n** DOKK1 theme css\n*/\n\n/* Import Gibson font from typekit - Used with Dokk1 theme */\n@import url("https://p.typekit.net/p.css?s=1&k=ilx8ovv&ht=tk&f=24355.24356.43309.43310&a=3352895&app=typekit&e=css");\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/l?subset_id=2&fvd=n6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/d?subset_id=2&fvd=n6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/a?subset_id=2&fvd=n6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/l?subset_id=2&fvd=i6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/d?subset_id=2&fvd=i6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/a?subset_id=2&fvd=i6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 300;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/l?subset_id=2&fvd=i3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/d?subset_id=2&fvd=i3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/a?subset_id=2&fvd=i3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 300;\n}\n\n/* Defaults */\n#SLIDE_ID {\n  --bg-light: #f1f0ef;\n  --text-dark: #222;\n  --color-primary: #003764;\n  --color-primary-opaque: hsla(207, 100%, 20%, 0.9);\n  --color-secondary: #887c76;\n  --color-success: #006c3b;\n  --color-info: #0dcaf0;\n  --color-warning: #ffb400;\n  --color-danger: #dc3545;\n\n  --color-blue: var(--color-primary);\n  --color-red: var(--color-danger);\n  --color-yellow: var(--color-warning);\n  --color-green: var(--color-success);\n\n  --color-grey-100: hsl(0deg 0% 95%);\n  --color-grey-200: hsl(0deg 0% 85%);\n  --color-grey-300: hsla(0, 0%, 69%, 1);\n  --color-grey-400: hsla(0, 0%, 52%, 1);\n  --color-grey-500: hsla(0, 0%, 35%, 1);\n  --color-grey-600: hsla(0, 0%, 20%, 1);\n  --color-grey-700: hsla(0, 0%, 18%, 1);\n  --color-grey-800: hsla(0, 0%, 13%, 1);\n  --color-grey-900: hsla(0, 0%, 9%, 1);\n\n  --font-family-base: "canada-type-gibson", Gibson, Arial, "sans-serif";\n  --font-weight-light: 300;\n  --font-weight-bold: 600;\n\n  --bg-primary: var(--color-primary);\n\n  --shadow-text-m: 0px 4px 16px hsla(0, 0%, 0%, 0.4);\n\n  /* Darkmode overrides */\n  --bg-dark: #212529;\n  --text-light: #ffffff;\n\n  font-family: var(--font-family-base);\n}\n\n/* Set seperator default color. */\n#SLIDE_ID .separator {\n  background-color: white;\n}\n\n/* Customize calender single template styling */\n#SLIDE_ID .calendar-single {\n  --h1-font-size: 5rem;\n  --h4-font-size: 3rem;\n  --font-size-base: 2rem;\n  --padding-size-base: 4rem;\n  --background-color: var(--color-primary);\n  --text-color: var(--color-light);\n  --border: 3px solid var(--color-light);\n  background-image: none;\n}\n\n/*\n*\n* Customize calender multiple template styling\n*\n*/\n#SLIDE_ID .calendar-multiple,\n#SLIDE_ID .calendar-multiple-days {\n  /* Use same colors for both light and dark */\n  --text-light: #ffffff;\n  --color-grey-100: var(--color-grey-900);\n  --color-grey-200: var(--color-grey-800);\n  --color-grey-300: var(--color-grey-700);\n  --color-grey-400: var(--color-grey-600);\n  --bg-dark: var(--color-grey-900);\n  --padding-size-base: 36px;\n  --background-color: var(--bg-dark);\n  --border: 1px solid var(--color-grey-900);\n  --color-primary: var(--color-yellow);\n  --text-color: var(--color-light);\n  background-image: none;\n}\n\n#SLIDE_ID .calendar-multiple .header-title,\n#SLIDE_ID .calendar-multiple-days .header-title {\n  color: var(--color-yellow);\n}\n\n#SLIDE_ID .calendar-multiple .content-col,\n#SLIDE_ID .calendar-multiple-days .content-col {\n  background-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .calendar-multiple .col-title,\n#SLIDE_ID .calendar-multiple-days .col-title {\n  background-color: var(--color-grey-800);\n}\n\n/*\n*\n* Customize Instagram template styling\n*\n*/\n#SLIDE_ID .template-instagram-feed {\n  --h1-font-size: calc(var(--font-size-base) * 3.5);\n  --h4-font-size: calc(var(--font-size-base) * 1.75);\n  --font-size-xl: calc(var(--font-size-base) * 2);\n\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section {\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section .date {\n  color: var(--color-grey-400);\n}\n\n#SLIDE_ID .template-instagram-feed .shape svg {\n  fill: var(--color-grey-100);\n}\n\n#SLIDE_ID .template-instagram-feed .brand {\n  color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize Book review template styling\n*\n*/\n\n#SLIDE_ID .template-book-review {\n  --text-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .template-book-review .author {\n  --text-color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize RSS template styling\n*\n*/\n\n#SLIDE_ID .template-rss {\n  --text-color: var(--text-light, hsl(0deg, 0%, 100%));\n  padding: calc(var(--spacer) * 4);\n  gap: calc(var(--spacer) * 6);\n  background-color: var(--color-primary);\n  color: var(--text-color);\n}\n\n.color-scheme-dark #SLIDE_ID .template-rss {\n  --text-color: var(--text-dark, hsl(0deg, 0%, 0%));\n}\n\n#SLIDE_ID .template-rss .feed-info--date {\n  border-right: 3px solid var(--color-white);\n  padding-right: calc(var(--spacer) * 2);\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .feed-info--title,\n#SLIDE_ID .template-rss .feed-info--date,\n#SLIDE_ID .template-rss .feed-info--progress {\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .title {\n  font-size: calc(var(--font-size-base) * 5);\n  font-weight: var(--font-weight-bold);\n}\n\n#SLIDE_ID .template-rss .description {\n  font-size: calc(var(--font-size-base) * 3);\n}\n\n/*\n*\n* Customize Image text template\n*\n*/\n\n#SLIDE_ID .template-image-text .box {\n  background-color: var(--color-primary-opaque);\n  color: var(--text-light);\n}\n\n#SLIDE_ID .template-image-text.reversed .box {\n  background-color: transparent;\n}\n#SLIDE_ID .template-image-text.reversed {\n  color: var(--text-light);\n  text-shadow: var(--shadow-text-m);\n}\n\n#SLIDE_ID .template-image-text.reversed h1 {\n  font-size: calc(var(--font-size-base) * 2);\n}\n',
            },
          }}
          content={{
            duration: 500,
            hashtagText: "#myhashtag",
            orientation: "landscape",
            imageWidth: 40,
            entryDuration: 1,
            maxEntries: 5,
          }}
          run={new Date().toISOString()}
          slideDone={mock.slideDone}
          executionId="SLIDE_ID"
        />
      </div>
    );

    // Slide done not called yet...
    cy.get("@slideDoneStub").should("not.be.called");

    // font size is set
    cy.get(".template-instagram-feed").should("exist");
    cy.get(".template-instagram-feed")
      .should("have.css", "font-family")
      .should("include", 'canada-type-gibson, Gibson, Arial, "sans-serif"');
    cy.get(".landscape").should("exist");
    // Image is set
    cy.get(".image")
      .should("have.css", "background-image")
      .should("include", "/fixtures/images/mountain1.jpeg");
    // author is set
    cy.get(".author").should("have.text", "username");

    // time is set
    cy.get(".date").invoke("text").should("not.be.empty");

    // text is set
    cy.get(".text").should(
      "have.text",
      "Sed nulla lorem, varius sodales justo ac, ultrices placerat nunc."
    );
    // tags is set
    cy.get(".tags .tag").should("have.length", 2);
    cy.get(".tags .tag").eq(0).should("have.text", "#mountains");
    cy.get(".tags .tag").eq(1).should("have.text", "#horizon");
    cy.get(".tags").should("have.text", "#mountains #horizon Lorem ipsum ...");

    // Shape and brand is set
    cy.get(".shape").find("svg").should("exist");
    cy.get(".brand").find("svg").should("exist");
    cy.get(".brand-tag").should("have.text", "#myhashtag");
    // So, wait is bad practice,
    // But seeing as we actually have to wait for a new feed entry,
    // I am not sure how to do this in another way.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    // Slide done not called yet...
    cy.get("@slideDoneStub").should("not.be.called");

    // video is set
    cy.get("video")
      .should("have.attr", "src")
      .should("include", "/fixtures/videos/test.mp4");
    // author is set
    cy.get(".author").should("have.text", "username2");

    // time is set
    cy.get(".date").invoke("text").should("not.be.empty");

    // text is set
    cy.get(".text").should(
      "have.text",
      "Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rhoncus metus nec consequat commodo. Duis a rhoncus lorem. Vestibulum nec blandit ipsum, ut lobortis purus. In ultrices mauris vel felis pellentesque imperdiet. Sed ultricies mauris vel nisi mattis, tincidunt dictum nisl finibus. Nunc in ultrices dui."
    );
    // tags is set
    cy.get(".tags .tag").should("have.length", 1);
    cy.get(".tags .tag").eq(0).should("have.text", "#video");
    cy.get(".tags").should("have.text", "#video Lorem ipsum and video ...");

    // Shape and brand is set
    cy.get(".shape").find("svg").should("exist");
    cy.get(".brand").find("svg").should("exist");
    cy.get(".brand-tag").should("have.text", "#myhashtag");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    // Slide done called...
    cy.get("@slideDoneStub").should("be.called");
  });
});
