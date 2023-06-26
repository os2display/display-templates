import React from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import Calendar from "../../src/calendar/calendar";

describe("Calendar", () => {
  it("Calendar multiple days", () => {
    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Calendar
          content={{
            duration: 5000,
            layout: "multipleDays",
            hasDateAndTime: true,
            title: "Kalender",
            subTitle: "Underoverskrift",
            resourceAvailableText: "Lokalet er frit.",
            displayHeaders: true,
            resourceUnavailableText: "Det er optaget",
            image: [],
            footerText: "Se mere på localhost/events",
            fontSize: "font-size-m",
          }}
          slide={{
            id: "slide2-calendar-multiple-days",
            type: "calendar",
            themeFile: "themes/dokk1.css",
            feedData: [
              {
                id: "uniqueEventMinusTwo",
                title: "Cake is in the past",
                startTime: dayjs().subtract(30, "minutes").unix(),
                endTime: dayjs().subtract(15, "minutes").unix(),
                resourceTitle: "Det fulde rum",
                resourceId: "MUendelig",
              },
              {
                id: "uniqueEventMinusOne",
                title: "Cake is gone",
                startTime: dayjs().subtract(30, "minutes").unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det fulde rum",
                resourceId: "MUendelig",
              },
              {
                id: "uniqueEvent0",
                title: "Cake is a lie",
                startTime: dayjs()
                  .subtract(1, "day")
                  .add(1, "hour")
                  .add(30, "minutes")
                  .unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det tomme rum",
                resourceId: "M0",
              },
              {
                id: "uniqueEvent1",
                title:
                  "Dette er en meget lang titel som bliver på en linje og dotter ud",
                startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle:
                  "Dette er en meget lang ressource titel som bliver på en linje og dotter ud",
                resourceId: "M1",
              },
              {
                id: "uniqueEvent2",
                //        title: "Cookies",
                startTime: dayjs().add(2, "hour").unix(),
                endTime: dayjs().add(3, "hour").unix(),
                resourceTitle: "Det andet rum",
                resourceId: "M2",
              },
              {
                id: "uniqueEvent3",
                title: "Coffee",
                startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
                endTime: dayjs().add(4, "hour").unix(),
                resourceTitle: "Det tredje rum",
                resourceId: "M3",
              },
              {
                id: "uniqueEvent4",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent5",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent6",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent7",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent8",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent9",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent10",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent11",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent12",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent13",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent14",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent15",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent16",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent17",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent18",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent19",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent20",
                title: "Tea",
                startTime: dayjs().add(1, "hour").add(1, "day").unix(),
                endTime: dayjs().add(2, "hour").add(1, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent21",
                title: "Tea",
                startTime: dayjs().add(3, "hour").add(3, "day").unix(),
                endTime: dayjs().add(4, "hour").add(3, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent22",
                title: "Tea",
                startTime: dayjs().add(2, "hour").add(6, "day").unix(),
                endTime: dayjs().add(3, "hour").add(6, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent23",
                title: "Tea",
                startTime: dayjs().add(2, "hour").add(8, "day").unix(),
                endTime: dayjs().add(3, "hour").add(8, "day").unix(),
                resourceTitle: "Test",
                resourceId: "M5",
              },
              {
                id: "uniqueEvent24",
                title: "Tea",
                startTime: dayjs().add(2, "hour").add(8, "day").unix(),
                endTime: dayjs().add(3, "hour").add(8, "day").unix(),
                resourceTitle: "Test",
                resourceId: "M5",
              },
              {
                id: "uniqueEvent25",
                title: "Tea",
                startTime: dayjs().add(2, "hour").add(8, "day").unix(),
                endTime: dayjs().add(3, "hour").add(8, "day").unix(),
                resourceTitle: "Test",
                resourceId: "M5",
              },
            ],
            mediaData: {
              "/v1/media/00000000000000000000000001": {
                assets: {
                  uri: "/fixtures/images/mountain1.jpeg",
                },
              },
            },
            content: {
              duration: 5000,
              layout: "multipleDays",
              hasDateAndTime: true,
              title: "Kalender",
              subTitle: "Underoverskrift",
              resourceAvailableText: "Lokalet er frit.",
              displayHeaders: true,
              resourceUnavailableText: "Det er optaget",
              image: [],
              footerText: "Se mere på localhost/events",
              fontSize: "font-size-m",
            },
            themeData: {
              cssStyles:
                '/*\n** DOKK1 theme css\n*/\n\n/* Import Gibson font from typekit - Used with Dokk1 theme */\n@import url("https://p.typekit.net/p.css?s=1&k=ilx8ovv&ht=tk&f=24355.24356.43309.43310&a=3352895&app=typekit&e=css");\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/l?subset_id=2&fvd=n6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/d?subset_id=2&fvd=n6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/a?subset_id=2&fvd=n6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/l?subset_id=2&fvd=i6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/d?subset_id=2&fvd=i6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/a?subset_id=2&fvd=i6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 300;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/l?subset_id=2&fvd=i3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/d?subset_id=2&fvd=i3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/a?subset_id=2&fvd=i3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 300;\n}\n\n/* Defaults */\n#SLIDE_ID {\n  --bg-light: #f1f0ef;\n  --text-dark: #222;\n  --color-primary: #003764;\n  --color-primary-opaque: hsla(207, 100%, 20%, 0.9);\n  --color-secondary: #887c76;\n  --color-success: #006c3b;\n  --color-info: #0dcaf0;\n  --color-warning: #ffb400;\n  --color-danger: #dc3545;\n\n  --color-blue: var(--color-primary);\n  --color-red: var(--color-danger);\n  --color-yellow: var(--color-warning);\n  --color-green: var(--color-success);\n\n  --color-grey-100: hsl(0deg 0% 95%);\n  --color-grey-200: hsl(0deg 0% 85%);\n  --color-grey-300: hsla(0, 0%, 69%, 1);\n  --color-grey-400: hsla(0, 0%, 52%, 1);\n  --color-grey-500: hsla(0, 0%, 35%, 1);\n  --color-grey-600: hsla(0, 0%, 20%, 1);\n  --color-grey-700: hsla(0, 0%, 18%, 1);\n  --color-grey-800: hsla(0, 0%, 13%, 1);\n  --color-grey-900: hsla(0, 0%, 9%, 1);\n\n  --font-family-base: "canada-type-gibson", Gibson, Arial, "sans-serif";\n  --font-weight-light: 300;\n  --font-weight-bold: 600;\n\n  --bg-primary: var(--color-primary);\n\n  --shadow-text-m: 0px 4px 16px hsla(0, 0%, 0%, 0.4);\n\n  /* Darkmode overrides */\n  --bg-dark: #212529;\n  --text-light: #ffffff;\n\n  font-family: var(--font-family-base);\n}\n\n/* Set seperator default color. */\n#SLIDE_ID .separator {\n  background-color: white;\n}\n\n/* Customize calender single template styling */\n#SLIDE_ID .calendar-single {\n  --h1-font-size: 5rem;\n  --h4-font-size: 3rem;\n  --font-size-base: 2rem;\n  --padding-size-base: 4rem;\n  --background-color: var(--color-primary);\n  --text-color: var(--color-light);\n  --border: 3px solid var(--color-light);\n  background-image: none;\n}\n\n/*\n*\n* Customize calender multiple template styling\n*\n*/\n#SLIDE_ID .calendar-multiple,\n#SLIDE_ID .calendar-multiple-days {\n  /* Use same colors for both light and dark */\n  --text-light: #ffffff;\n  --color-grey-100: var(--color-grey-900);\n  --color-grey-200: var(--color-grey-800);\n  --color-grey-300: var(--color-grey-700);\n  --color-grey-400: var(--color-grey-600);\n  --bg-dark: var(--color-grey-900);\n  --padding-size-base: 36px;\n  --background-color: var(--bg-dark);\n  --border: 1px solid var(--color-grey-900);\n  --color-primary: var(--color-yellow);\n  --text-color: var(--color-light);\n  background-image: none;\n}\n\n#SLIDE_ID .calendar-multiple .header-title,\n#SLIDE_ID .calendar-multiple-days .header-title {\n  color: var(--color-yellow);\n}\n\n#SLIDE_ID .calendar-multiple .content-col,\n#SLIDE_ID .calendar-multiple-days .content-col {\n  background-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .calendar-multiple .col-title,\n#SLIDE_ID .calendar-multiple-days .col-title {\n  background-color: var(--color-grey-800);\n}\n\n/*\n*\n* Customize Instagram template styling\n*\n*/\n#SLIDE_ID .template-instagram-feed {\n  --h1-font-size: calc(var(--font-size-base) * 3.5);\n  --h4-font-size: calc(var(--font-size-base) * 1.75);\n  --font-size-xl: calc(var(--font-size-base) * 2);\n\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section {\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section .date {\n  color: var(--color-grey-400);\n}\n\n#SLIDE_ID .template-instagram-feed .shape svg {\n  fill: var(--color-grey-100);\n}\n\n#SLIDE_ID .template-instagram-feed .brand {\n  color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize Book review template styling\n*\n*/\n\n#SLIDE_ID .template-book-review {\n  --text-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .template-book-review .author {\n  --text-color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize RSS template styling\n*\n*/\n\n#SLIDE_ID .template-rss {\n  --text-color: var(--text-light, hsl(0deg, 0%, 100%));\n  padding: calc(var(--spacer) * 4);\n  gap: calc(var(--spacer) * 6);\n  background-color: var(--color-primary);\n  color: var(--text-color);\n}\n\n.color-scheme-dark #SLIDE_ID .template-rss {\n  --text-color: var(--text-dark, hsl(0deg, 0%, 0%));\n}\n\n#SLIDE_ID .template-rss .feed-info--date {\n  border-right: 3px solid var(--color-white);\n  padding-right: calc(var(--spacer) * 2);\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .feed-info--title,\n#SLIDE_ID .template-rss .feed-info--date,\n#SLIDE_ID .template-rss .feed-info--progress {\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .title {\n  font-size: calc(var(--font-size-base) * 5);\n  font-weight: var(--font-weight-bold);\n}\n\n#SLIDE_ID .template-rss .description {\n  font-size: calc(var(--font-size-base) * 3);\n}\n\n/*\n*\n* Customize Image text template\n*\n*/\n\n#SLIDE_ID .template-image-text .box {\n  background-color: var(--color-primary-opaque);\n  color: var(--text-light);\n}\n\n#SLIDE_ID .template-image-text.reversed .box {\n  background-color: transparent;\n}\n#SLIDE_ID .template-image-text.reversed {\n  color: var(--text-light);\n  text-shadow: var(--shadow-text-m);\n}\n\n#SLIDE_ID .template-image-text.reversed h1 {\n  font-size: calc(var(--font-size-base) * 2);\n}\n',
            },
          }}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      </div>
    );

    // Header displayed correctly
    cy.get("h1").should("have.text", "Kalender");
    // Template themed correctly
    cy.get("h1")
      .should("have.css", "color")
      .should("include", "rgb(255, 180, 0)");

    // Correct dates in header
    cy.get("section")
      .eq(0)
      .find("p")
      .should(
        "have.text",
        new dayjs().subtract(1, "day").locale(localeDa).format("dddd D. MMMM")
      );
    cy.get("section")
      .eq(1)
      .find("p")
      .should("have.text", new dayjs().locale(localeDa).format("dddd D. MMMM"));
    cy.get("section")
      .eq(2)
      .find("p")
      .should(
        "have.text",
        new dayjs().add(1, "day").locale(localeDa).format("dddd D. MMMM")
      );
    cy.get("section")
      .eq(3)
      .find("p")
      .should(
        "have.text",
        new dayjs().add(3, "days").locale(localeDa).format("dddd D. MMMM")
      );
    cy.get("section")
      .eq(4)
      .find("p")
      .should(
        "have.text",
        new dayjs().add(6, "day").locale(localeDa).format("dddd D. MMMM")
      );

    // all events are present
    cy.get("section").eq(0).find("article").should("have.length", 1);
    cy.get("section").eq(1).find("article").should("have.length", 20);
    cy.get("section").eq(2).find("article").should("have.length", 1);
    cy.get("section").eq(3).find("article").should("have.length", 1);
    cy.get("section").eq(4).find("article").should("have.length", 1);

    // events are displayed (only one as they are displayed similarly)
    cy.get("section")
      .eq(0)
      .find("article")
      .eq(0)
      .find(".col-item-time div")
      .eq(0)
      .should(
        "have.text",
        `${new dayjs()
          .locale(localeDa)
          .add(1, "hour")
          .add(30, "minutes")
          .format("HH:mm")} -`
      );
    cy.get("section")
      .eq(0)
      .find("article")
      .eq(0)
      .find(".col-item-time div")
      .eq(1)
      .should(
        "have.text",
        `${new dayjs().locale(localeDa).add(2, "hour").format("HH:mm")}`
      );
    cy.get("section")
      .eq(0)
      .find("article")
      .eq(0)
      .find(".col-item-event div")
      .eq(0)
      .should("have.text", "Cake is a lie");
    cy.get("section")
      .eq(0)
      .find("article")
      .eq(0)
      .find(".col-item-event div")
      .eq(1)
      .should("have.text", "Det tomme rum");
  });

  it("Calendar multiple", () => {
    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Calendar
          content={{
            headerOrder: "whatwherewhen",
            duration: 5000,
            layout: "multiple",
            hasDateAndTime: true,
            title: "Møder i dag på Bautavej",
            subTitle: "Underoverskrift",
            resourceAvailableText: "Lokalet er frit.",
            displayHeaders: true,
            resourceUnavailableText: "Det er optaget",
            footerText: "Se mere på localhost/events",
            dateAsBox: false,
            hideGrid: true,
            fontSize: "font-size-xl",
          }}
          slide={{
            id: "slide2-calendar-multiple-days",
            type: "calendar",
            themeFile: "themes/dokk1.css",
            feedData: [
              {
                id: "uniqueEventMinusTwo",
                title: "Cake is in the past",
                startTime: dayjs().subtract(30, "minutes").unix(),
                endTime: dayjs().subtract(15, "minutes").unix(),
                resourceTitle: "Det fulde rum",
                resourceId: "MUendelig",
              },
              {
                id: "uniqueEventMinusOne",
                title: "Cake is gone",
                startTime: dayjs().subtract(30, "minutes").unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det fulde rum",
                resourceId: "MUendelig",
              },
              {
                id: "uniqueEvent0",
                title: "Cake is a lie",
                startTime: dayjs()
                  .subtract(1, "day")
                  .add(1, "hour")
                  .add(30, "minutes")
                  .unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det tomme rum",
                resourceId: "M0",
              },
              {
                id: "uniqueEvent1",
                title: "Cake",
                startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det første rum",
                resourceId: "M1",
              },
              {
                id: "uniqueEvent2",
                //        title: "Cookies",
                startTime: dayjs().add(2, "hour").unix(),
                endTime: dayjs().add(3, "hour").unix(),
                resourceTitle: "Det andet rum",
                resourceId: "M2",
              },
              {
                id: "uniqueEvent3",
                title: "Coffee",
                startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
                endTime: dayjs().add(4, "hour").unix(),
                resourceTitle: "Det tredje rum",
                resourceId: "M3",
              },
              {
                id: "uniqueEvent4",
                title: "Tea",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent41",
                title: "Test",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent42",
                title: "Test 2",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent43",
                title: "Test 3",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent44",
                title: "Test 4",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent45",
                title: "Test 5",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent46",
                title: "Test 6",
                startTime: dayjs().add(5, "hour").unix(),
                endTime: dayjs().add(8, "hour").unix(),
                resourceTitle: null,
                resourceId: "Room",
              },
              {
                id: "uniqueEvent5",
                title: "Tea Tomorrow",
                startTime: dayjs().add(1, "hour").add(1, "day").unix(),
                endTime: dayjs().add(2, "hour").add(1, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent6",
                title: "Tea Later",
                startTime: dayjs().add(3, "hour").add(3, "day").unix(),
                endTime: dayjs().add(4, "hour").add(3, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent7",
                title: "Tea Later again",
                startTime: dayjs().add(2, "hour").add(6, "day").unix(),
                endTime: dayjs().add(3, "hour").add(6, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
            ],
            mediaData: {
              "/v1/media/00000000000000000000000001": {
                assets: {
                  uri: "/fixtures/images/mountain1.jpeg",
                },
              },
            },
            content: {},
            themeData: {
              cssStyles:
                '/*\n** DOKK1 theme css\n*/\n\n/* Import Gibson font from typekit - Used with Dokk1 theme */\n@import url("https://p.typekit.net/p.css?s=1&k=ilx8ovv&ht=tk&f=24355.24356.43309.43310&a=3352895&app=typekit&e=css");\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/l?subset_id=2&fvd=n6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/d?subset_id=2&fvd=n6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/a?subset_id=2&fvd=n6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/l?subset_id=2&fvd=i6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/d?subset_id=2&fvd=i6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/a?subset_id=2&fvd=i6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 300;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/l?subset_id=2&fvd=i3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/d?subset_id=2&fvd=i3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/a?subset_id=2&fvd=i3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 300;\n}\n\n/* Defaults */\n#SLIDE_ID {\n  --bg-light: #f1f0ef;\n  --text-dark: #222;\n  --color-primary: #003764;\n  --color-primary-opaque: hsla(207, 100%, 20%, 0.9);\n  --color-secondary: #887c76;\n  --color-success: #006c3b;\n  --color-info: #0dcaf0;\n  --color-warning: #ffb400;\n  --color-danger: #dc3545;\n\n  --color-blue: var(--color-primary);\n  --color-red: var(--color-danger);\n  --color-yellow: var(--color-warning);\n  --color-green: var(--color-success);\n\n  --color-grey-100: hsl(0deg 0% 95%);\n  --color-grey-200: hsl(0deg 0% 85%);\n  --color-grey-300: hsla(0, 0%, 69%, 1);\n  --color-grey-400: hsla(0, 0%, 52%, 1);\n  --color-grey-500: hsla(0, 0%, 35%, 1);\n  --color-grey-600: hsla(0, 0%, 20%, 1);\n  --color-grey-700: hsla(0, 0%, 18%, 1);\n  --color-grey-800: hsla(0, 0%, 13%, 1);\n  --color-grey-900: hsla(0, 0%, 9%, 1);\n\n  --font-family-base: "canada-type-gibson", Gibson, Arial, "sans-serif";\n  --font-weight-light: 300;\n  --font-weight-bold: 600;\n\n  --bg-primary: var(--color-primary);\n\n  --shadow-text-m: 0px 4px 16px hsla(0, 0%, 0%, 0.4);\n\n  /* Darkmode overrides */\n  --bg-dark: #212529;\n  --text-light: #ffffff;\n\n  font-family: var(--font-family-base);\n}\n\n/* Set seperator default color. */\n#SLIDE_ID .separator {\n  background-color: white;\n}\n\n/* Customize calender single template styling */\n#SLIDE_ID .calendar-single {\n  --h1-font-size: 5rem;\n  --h4-font-size: 3rem;\n  --font-size-base: 2rem;\n  --padding-size-base: 4rem;\n  --background-color: var(--color-primary);\n  --text-color: var(--color-light);\n  --border: 3px solid var(--color-light);\n  background-image: none;\n}\n\n/*\n*\n* Customize calender multiple template styling\n*\n*/\n#SLIDE_ID .calendar-multiple,\n#SLIDE_ID .calendar-multiple-days {\n  /* Use same colors for both light and dark */\n  --text-light: #ffffff;\n  --color-grey-100: var(--color-grey-900);\n  --color-grey-200: var(--color-grey-800);\n  --color-grey-300: var(--color-grey-700);\n  --color-grey-400: var(--color-grey-600);\n  --bg-dark: var(--color-grey-900);\n  --padding-size-base: 36px;\n  --background-color: var(--bg-dark);\n  --border: 1px solid var(--color-grey-900);\n  --color-primary: var(--color-yellow);\n  --text-color: var(--color-light);\n  background-image: none;\n}\n\n#SLIDE_ID .calendar-multiple .header-title,\n#SLIDE_ID .calendar-multiple-days .header-title {\n  color: var(--color-yellow);\n}\n\n#SLIDE_ID .calendar-multiple .content-col,\n#SLIDE_ID .calendar-multiple-days .content-col {\n  background-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .calendar-multiple .col-title,\n#SLIDE_ID .calendar-multiple-days .col-title {\n  background-color: var(--color-grey-800);\n}\n\n/*\n*\n* Customize Instagram template styling\n*\n*/\n#SLIDE_ID .template-instagram-feed {\n  --h1-font-size: calc(var(--font-size-base) * 3.5);\n  --h4-font-size: calc(var(--font-size-base) * 1.75);\n  --font-size-xl: calc(var(--font-size-base) * 2);\n\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section {\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section .date {\n  color: var(--color-grey-400);\n}\n\n#SLIDE_ID .template-instagram-feed .shape svg {\n  fill: var(--color-grey-100);\n}\n\n#SLIDE_ID .template-instagram-feed .brand {\n  color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize Book review template styling\n*\n*/\n\n#SLIDE_ID .template-book-review {\n  --text-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .template-book-review .author {\n  --text-color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize RSS template styling\n*\n*/\n\n#SLIDE_ID .template-rss {\n  --text-color: var(--text-light, hsl(0deg, 0%, 100%));\n  padding: calc(var(--spacer) * 4);\n  gap: calc(var(--spacer) * 6);\n  background-color: var(--color-primary);\n  color: var(--text-color);\n}\n\n.color-scheme-dark #SLIDE_ID .template-rss {\n  --text-color: var(--text-dark, hsl(0deg, 0%, 0%));\n}\n\n#SLIDE_ID .template-rss .feed-info--date {\n  border-right: 3px solid var(--color-white);\n  padding-right: calc(var(--spacer) * 2);\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .feed-info--title,\n#SLIDE_ID .template-rss .feed-info--date,\n#SLIDE_ID .template-rss .feed-info--progress {\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .title {\n  font-size: calc(var(--font-size-base) * 5);\n  font-weight: var(--font-weight-bold);\n}\n\n#SLIDE_ID .template-rss .description {\n  font-size: calc(var(--font-size-base) * 3);\n}\n\n/*\n*\n* Customize Image text template\n*\n*/\n\n#SLIDE_ID .template-image-text .box {\n  background-color: var(--color-primary-opaque);\n  color: var(--text-light);\n}\n\n#SLIDE_ID .template-image-text.reversed .box {\n  background-color: transparent;\n}\n#SLIDE_ID .template-image-text.reversed {\n  color: var(--text-light);\n  text-shadow: var(--shadow-text-m);\n}\n\n#SLIDE_ID .template-image-text.reversed h1 {\n  font-size: calc(var(--font-size-base) * 2);\n}\n',
            },
          }}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      </div>
    );

    // Header displayed correctly
    cy.get(".header-title").should("have.text", "Møder i dag på Bautavej");
    // Template themed correctly
    cy.get(".header-title")
      .should("have.css", "color")
      .should("include", "rgb(255, 180, 0)");

    cy.get(".header-date").contains(
      new dayjs().locale(localeDa).format("dddd D. MMMM HH:mm"),
      { matchCase: false }
    );
    cy.get(".content-item")
      .eq(0)
      .should("have.text", "Hvornår")
      .should("have.css", "order")
      .should("include", "3");
    cy.get(".content-item")
      .eq(1)
      .should("have.text", "Hvad")
      .should("have.css", "order")
      .should("include", "1");
    cy.get(".content-item")
      .eq(2)
      .should("have.text", "Hvor")
      .should("have.css", "order")
      .should("include", "2");

    cy.get(".content-item-time").should("have.length", 11);
    cy.get(".content-item-resource").should("have.length", 11);
    cy.get(".content-item-title").should("have.length", 11);

    // Displays event
    cy.get(".content-item-time")
      .eq(0)
      .should(
        "have.text",
        `${new dayjs()
          .subtract(30, "minutes")
          .locale(localeDa)
          .format("HH:mm")} - ${new dayjs()
          .add(2, "hour")
          .locale(localeDa)
          .format("HH:mm")}`
      );
    cy.get(".content-item-resource").eq(0).should("have.text", "Det fulde rum");
    cy.get(".content-item-title").eq(0).should("have.text", "Cake is gone");

    // Font size is set
    cy.get(".font-size-xl").should("exist");
  });

  it("Calendar multiple when what where", () => {
    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Calendar
          content={{
            headerOrder: "whenwhatwhere",
            duration: 5000,
            layout: "multiple",
            hasDateAndTime: true,
            title: "Møder i dag på Bautavej",
            subTitle: "Underoverskrift",
            resourceAvailableText: "Lokalet er frit.",
            displayHeaders: true,
            resourceUnavailableText: "Det er optaget",
            footerText: "Se mere på localhost/events",
            dateAsBox: false,
            hideGrid: false,
            fontSize: "font-size-xl",
          }}
          slide={{
            id: "slide2-calendar-multiple-days",
            type: "calendar",
            themeFile: "themes/dokk1.css",
            feedData: [],
            mediaData: {
              "/v1/media/00000000000000000000000001": {
                assets: {
                  uri: "/fixtures/images/mountain1.jpeg",
                },
              },
            },
            content: {},
            themeData: {
              cssStyles:
                '/*\n** DOKK1 theme css\n*/\n\n/* Import Gibson font from typekit - Used with Dokk1 theme */\n@import url("https://p.typekit.net/p.css?s=1&k=ilx8ovv&ht=tk&f=24355.24356.43309.43310&a=3352895&app=typekit&e=css");\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/l?subset_id=2&fvd=n6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/d?subset_id=2&fvd=n6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/a?subset_id=2&fvd=n6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/l?subset_id=2&fvd=i6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/d?subset_id=2&fvd=i6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/a?subset_id=2&fvd=i6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 300;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/l?subset_id=2&fvd=i3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/d?subset_id=2&fvd=i3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/a?subset_id=2&fvd=i3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 300;\n}\n\n/* Defaults */\n#SLIDE_ID {\n  --bg-light: #f1f0ef;\n  --text-dark: #222;\n  --color-primary: #003764;\n  --color-primary-opaque: hsla(207, 100%, 20%, 0.9);\n  --color-secondary: #887c76;\n  --color-success: #006c3b;\n  --color-info: #0dcaf0;\n  --color-warning: #ffb400;\n  --color-danger: #dc3545;\n\n  --color-blue: var(--color-primary);\n  --color-red: var(--color-danger);\n  --color-yellow: var(--color-warning);\n  --color-green: var(--color-success);\n\n  --color-grey-100: hsl(0deg 0% 95%);\n  --color-grey-200: hsl(0deg 0% 85%);\n  --color-grey-300: hsla(0, 0%, 69%, 1);\n  --color-grey-400: hsla(0, 0%, 52%, 1);\n  --color-grey-500: hsla(0, 0%, 35%, 1);\n  --color-grey-600: hsla(0, 0%, 20%, 1);\n  --color-grey-700: hsla(0, 0%, 18%, 1);\n  --color-grey-800: hsla(0, 0%, 13%, 1);\n  --color-grey-900: hsla(0, 0%, 9%, 1);\n\n  --font-family-base: "canada-type-gibson", Gibson, Arial, "sans-serif";\n  --font-weight-light: 300;\n  --font-weight-bold: 600;\n\n  --bg-primary: var(--color-primary);\n\n  --shadow-text-m: 0px 4px 16px hsla(0, 0%, 0%, 0.4);\n\n  /* Darkmode overrides */\n  --bg-dark: #212529;\n  --text-light: #ffffff;\n\n  font-family: var(--font-family-base);\n}\n\n/* Set seperator default color. */\n#SLIDE_ID .separator {\n  background-color: white;\n}\n\n/* Customize calender single template styling */\n#SLIDE_ID .calendar-single {\n  --h1-font-size: 5rem;\n  --h4-font-size: 3rem;\n  --font-size-base: 2rem;\n  --padding-size-base: 4rem;\n  --background-color: var(--color-primary);\n  --text-color: var(--color-light);\n  --border: 3px solid var(--color-light);\n  background-image: none;\n}\n\n/*\n*\n* Customize calender multiple template styling\n*\n*/\n#SLIDE_ID .calendar-multiple,\n#SLIDE_ID .calendar-multiple-days {\n  /* Use same colors for both light and dark */\n  --text-light: #ffffff;\n  --color-grey-100: var(--color-grey-900);\n  --color-grey-200: var(--color-grey-800);\n  --color-grey-300: var(--color-grey-700);\n  --color-grey-400: var(--color-grey-600);\n  --bg-dark: var(--color-grey-900);\n  --padding-size-base: 36px;\n  --background-color: var(--bg-dark);\n  --border: 1px solid var(--color-grey-900);\n  --color-primary: var(--color-yellow);\n  --text-color: var(--color-light);\n  background-image: none;\n}\n\n#SLIDE_ID .calendar-multiple .header-title,\n#SLIDE_ID .calendar-multiple-days .header-title {\n  color: var(--color-yellow);\n}\n\n#SLIDE_ID .calendar-multiple .content-col,\n#SLIDE_ID .calendar-multiple-days .content-col {\n  background-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .calendar-multiple .col-title,\n#SLIDE_ID .calendar-multiple-days .col-title {\n  background-color: var(--color-grey-800);\n}\n\n/*\n*\n* Customize Instagram template styling\n*\n*/\n#SLIDE_ID .template-instagram-feed {\n  --h1-font-size: calc(var(--font-size-base) * 3.5);\n  --h4-font-size: calc(var(--font-size-base) * 1.75);\n  --font-size-xl: calc(var(--font-size-base) * 2);\n\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section {\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section .date {\n  color: var(--color-grey-400);\n}\n\n#SLIDE_ID .template-instagram-feed .shape svg {\n  fill: var(--color-grey-100);\n}\n\n#SLIDE_ID .template-instagram-feed .brand {\n  color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize Book review template styling\n*\n*/\n\n#SLIDE_ID .template-book-review {\n  --text-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .template-book-review .author {\n  --text-color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize RSS template styling\n*\n*/\n\n#SLIDE_ID .template-rss {\n  --text-color: var(--text-light, hsl(0deg, 0%, 100%));\n  padding: calc(var(--spacer) * 4);\n  gap: calc(var(--spacer) * 6);\n  background-color: var(--color-primary);\n  color: var(--text-color);\n}\n\n.color-scheme-dark #SLIDE_ID .template-rss {\n  --text-color: var(--text-dark, hsl(0deg, 0%, 0%));\n}\n\n#SLIDE_ID .template-rss .feed-info--date {\n  border-right: 3px solid var(--color-white);\n  padding-right: calc(var(--spacer) * 2);\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .feed-info--title,\n#SLIDE_ID .template-rss .feed-info--date,\n#SLIDE_ID .template-rss .feed-info--progress {\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .title {\n  font-size: calc(var(--font-size-base) * 5);\n  font-weight: var(--font-weight-bold);\n}\n\n#SLIDE_ID .template-rss .description {\n  font-size: calc(var(--font-size-base) * 3);\n}\n\n/*\n*\n* Customize Image text template\n*\n*/\n\n#SLIDE_ID .template-image-text .box {\n  background-color: var(--color-primary-opaque);\n  color: var(--text-light);\n}\n\n#SLIDE_ID .template-image-text.reversed .box {\n  background-color: transparent;\n}\n#SLIDE_ID .template-image-text.reversed {\n  color: var(--text-light);\n  text-shadow: var(--shadow-text-m);\n}\n\n#SLIDE_ID .template-image-text.reversed h1 {\n  font-size: calc(var(--font-size-base) * 2);\n}\n',
            },
          }}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      </div>
    );

    cy.get(".content-item")
      .eq(0)
      .should("have.text", "Hvornår")
      .should("have.css", "order")
      .should("include", "1");
    cy.get(".content-item")
      .eq(1)
      .should("have.text", "Hvad")
      .should("have.css", "order")
      .should("include", "2");
    cy.get(".content-item")
      .eq(2)
      .should("have.text", "Hvor")
      .should("have.css", "order")
      .should("include", "3");
  });

  it("Calendar single", () => {
    cy.mount(
      <div className="slide" id="SLIDE_ID">
        <Calendar
          content={{
            duration: 5000,
            layout: "single",
            backgroundColor: "",
            title: "Kalender",
            subTitle: "Underoverskrift",
            resourceAvailableText: "Lokalet er frit.",
            displayHeaders: true,
            resourceUnavailableText: "Det er optaget",
            image: ["/v1/media/00000000000000000000000001"],
            footerText: "Se mere på localhost/events",
            fontSize: "font-size-xs",
          }}
          slide={{
            id: "slide2-calendar-multiple-days",
            type: "calendar",
            themeFile: "themes/dokk1.css",
            feedData: [
              {
                id: "uniqueEvent0",
                title: "Cake is a lie",
                startTime: dayjs()
                  .subtract(1, "day")
                  .add(1, "hour")
                  .add(30, "minutes")
                  .unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det tomme rum",
                resourceId: "M0",
              },
              {
                id: "uniqueEvent1",
                title: "Cake",
                startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
                endTime: dayjs().add(2, "hour").unix(),
                resourceTitle: "Det første rum",
                resourceId: "M1",
              },
              {
                id: "uniqueEvent51",
                title: "Tea Tomorrow",
                startTime: dayjs().add(1, "hour").add(1, "day").unix(),
                endTime: dayjs().add(2, "hour").add(1, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent2",
                startTime: dayjs().add(2, "hour").unix(),
                endTime: dayjs().add(3, "hour").unix(),
                resourceTitle: "Det andet rum",
                resourceId: "M2",
              },
              {
                id: "uniqueEvent3",
                title: "Coffee",
                startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
                endTime: dayjs().add(4, "hour").unix(),
                resourceTitle: "Det tredje rum",
                resourceId: "M3",
              },
              {
                id: "uniqueEvent4",
                title: "Tea",
                startTime: dayjs().add(1, "hour").add(1, "day").unix(),
                endTime: dayjs().add(2, "hour").add(1, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent5",
                title: "Tea",
                startTime: dayjs().add(1, "hour").add(1, "day").unix(),
                endTime: dayjs().add(2, "hour").add(1, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent6",
                title: "Tea",
                startTime: dayjs().add(3, "hour").add(3, "day").unix(),
                endTime: dayjs().add(4, "hour").add(3, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
              {
                id: "uniqueEvent7",
                title: "Tea",
                startTime: dayjs().add(2, "hour").add(6, "day").unix(),
                endTime: dayjs().add(3, "hour").add(6, "day").unix(),
                resourceTitle: null,
                resourceId: "M4",
              },
            ],
            mediaData: {
              "/v1/media/00000000000000000000000001": {
                assets: {
                  uri: "/fixtures/images/mountain1.jpeg",
                },
              },
            },
            content: {},
            themeData: {
              cssStyles:
                '/*\n** DOKK1 theme css\n*/\n\n/* Import Gibson font from typekit - Used with Dokk1 theme */\n@import url("https://p.typekit.net/p.css?s=1&k=ilx8ovv&ht=tk&f=24355.24356.43309.43310&a=3352895&app=typekit&e=css");\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/l?subset_id=2&fvd=n6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/d?subset_id=2&fvd=n6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/6c50f4/00000000000000007735a544/30/a?subset_id=2&fvd=n6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/l?subset_id=2&fvd=i6&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/d?subset_id=2&fvd=i6&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/56af16/00000000000000007735a545/30/a?subset_id=2&fvd=i6&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 600;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/37e7f5/00000000000000007735a548/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: normal;\n  font-weight: 300;\n}\n@font-face {\n  font-family: "canada-type-gibson";\n  src: url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/l?subset_id=2&fvd=i3&v=3")\n      format("woff2"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/d?subset_id=2&fvd=i3&v=3")\n      format("woff"),\n    url("https://use.typekit.net/af/e171bf/00000000000000007735a549/30/a?subset_id=2&fvd=i3&v=3")\n      format("opentype");\n  font-display: auto;\n  font-style: italic;\n  font-weight: 300;\n}\n\n/* Defaults */\n#SLIDE_ID {\n  --bg-light: #f1f0ef;\n  --text-dark: #222;\n  --color-primary: #003764;\n  --color-primary-opaque: hsla(207, 100%, 20%, 0.9);\n  --color-secondary: #887c76;\n  --color-success: #006c3b;\n  --color-info: #0dcaf0;\n  --color-warning: #ffb400;\n  --color-danger: #dc3545;\n\n  --color-blue: var(--color-primary);\n  --color-red: var(--color-danger);\n  --color-yellow: var(--color-warning);\n  --color-green: var(--color-success);\n\n  --color-grey-100: hsl(0deg 0% 95%);\n  --color-grey-200: hsl(0deg 0% 85%);\n  --color-grey-300: hsla(0, 0%, 69%, 1);\n  --color-grey-400: hsla(0, 0%, 52%, 1);\n  --color-grey-500: hsla(0, 0%, 35%, 1);\n  --color-grey-600: hsla(0, 0%, 20%, 1);\n  --color-grey-700: hsla(0, 0%, 18%, 1);\n  --color-grey-800: hsla(0, 0%, 13%, 1);\n  --color-grey-900: hsla(0, 0%, 9%, 1);\n\n  --font-family-base: "canada-type-gibson", Gibson, Arial, "sans-serif";\n  --font-weight-light: 300;\n  --font-weight-bold: 600;\n\n  --bg-primary: var(--color-primary);\n\n  --shadow-text-m: 0px 4px 16px hsla(0, 0%, 0%, 0.4);\n\n  /* Darkmode overrides */\n  --bg-dark: #212529;\n  --text-light: #ffffff;\n\n  font-family: var(--font-family-base);\n}\n\n/* Set seperator default color. */\n#SLIDE_ID .separator {\n  background-color: white;\n}\n\n/* Customize calender single template styling */\n#SLIDE_ID .calendar-single {\n  --h1-font-size: 5rem;\n  --h4-font-size: 3rem;\n  --font-size-base: 2rem;\n  --padding-size-base: 4rem;\n  --background-color: var(--color-primary);\n  --text-color: var(--color-light);\n  --border: 3px solid var(--color-light);\n  background-image: none;\n}\n\n/*\n*\n* Customize calender multiple template styling\n*\n*/\n#SLIDE_ID .calendar-multiple,\n#SLIDE_ID .calendar-multiple-days {\n  /* Use same colors for both light and dark */\n  --text-light: #ffffff;\n  --color-grey-100: var(--color-grey-900);\n  --color-grey-200: var(--color-grey-800);\n  --color-grey-300: var(--color-grey-700);\n  --color-grey-400: var(--color-grey-600);\n  --bg-dark: var(--color-grey-900);\n  --padding-size-base: 36px;\n  --background-color: var(--bg-dark);\n  --border: 1px solid var(--color-grey-900);\n  --color-primary: var(--color-yellow);\n  --text-color: var(--color-light);\n  background-image: none;\n}\n\n#SLIDE_ID .calendar-multiple .header-title,\n#SLIDE_ID .calendar-multiple-days .header-title {\n  color: var(--color-yellow);\n}\n\n#SLIDE_ID .calendar-multiple .content-col,\n#SLIDE_ID .calendar-multiple-days .content-col {\n  background-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .calendar-multiple .col-title,\n#SLIDE_ID .calendar-multiple-days .col-title {\n  background-color: var(--color-grey-800);\n}\n\n/*\n*\n* Customize Instagram template styling\n*\n*/\n#SLIDE_ID .template-instagram-feed {\n  --h1-font-size: calc(var(--font-size-base) * 3.5);\n  --h4-font-size: calc(var(--font-size-base) * 1.75);\n  --font-size-xl: calc(var(--font-size-base) * 2);\n\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section {\n  background-color: var(--color-white);\n}\n\n#SLIDE_ID .template-instagram-feed .author-section .date {\n  color: var(--color-grey-400);\n}\n\n#SLIDE_ID .template-instagram-feed .shape svg {\n  fill: var(--color-grey-100);\n}\n\n#SLIDE_ID .template-instagram-feed .brand {\n  color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize Book review template styling\n*\n*/\n\n#SLIDE_ID .template-book-review {\n  --text-color: var(--color-grey-700);\n}\n\n#SLIDE_ID .template-book-review .author {\n  --text-color: var(--color-grey-500);\n}\n\n/*\n*\n* Customize RSS template styling\n*\n*/\n\n#SLIDE_ID .template-rss {\n  --text-color: var(--text-light, hsl(0deg, 0%, 100%));\n  padding: calc(var(--spacer) * 4);\n  gap: calc(var(--spacer) * 6);\n  background-color: var(--color-primary);\n  color: var(--text-color);\n}\n\n.color-scheme-dark #SLIDE_ID .template-rss {\n  --text-color: var(--text-dark, hsl(0deg, 0%, 0%));\n}\n\n#SLIDE_ID .template-rss .feed-info--date {\n  border-right: 3px solid var(--color-white);\n  padding-right: calc(var(--spacer) * 2);\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .feed-info--title,\n#SLIDE_ID .template-rss .feed-info--date,\n#SLIDE_ID .template-rss .feed-info--progress {\n  font-size: calc(var(--font-size-base) * 2);\n}\n\n#SLIDE_ID .template-rss .title {\n  font-size: calc(var(--font-size-base) * 5);\n  font-weight: var(--font-weight-bold);\n}\n\n#SLIDE_ID .template-rss .description {\n  font-size: calc(var(--font-size-base) * 3);\n}\n\n/*\n*\n* Customize Image text template\n*\n*/\n\n#SLIDE_ID .template-image-text .box {\n  background-color: var(--color-primary-opaque);\n  color: var(--text-light);\n}\n\n#SLIDE_ID .template-image-text.reversed .box {\n  background-color: transparent;\n}\n#SLIDE_ID .template-image-text.reversed {\n  color: var(--text-light);\n  text-shadow: var(--shadow-text-m);\n}\n\n#SLIDE_ID .template-image-text.reversed h1 {\n  font-size: calc(var(--font-size-base) * 2);\n}\n',
            },
          }}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      </div>
    );

    cy.get(".font-size-xs").should("exist");
    cy.get(".title").should("have.text", "Kalender");
    cy.get(".subtitle").should("have.text", "Underoverskrift");
    cy.get(".single--now")
      .should(
        "have.text",
        `${dayjs()
          .subtract(1, "day")
          .add(1, "hour")
          .add(30, "minutes")
          .format("HH:mm")} - ${dayjs()
          .add(2, "hour")
          .format("HH:mm")}Cake is a lie`
      )
      .should("have.css", "font-size")
      .should("include", "72px");
    cy.get(".single--next")
      .eq(0)
      .should(
        "have.text",
        `${dayjs()
          .add(1, "hour")
          .add(30, "minutes")
          .format("HH:mm")} - ${dayjs().add(2, "hour").format("HH:mm")}Cake`
      )
      .should("have.css", "font-size")
      .should("include", "36px");
    cy.get(".single--next")
      .eq(1)
      .should(
        "have.text",
        `${dayjs().add(2, "hour").format("HH:mm")} - ${dayjs()
          .add(3, "hour")
          .format("HH:mm")}Det er optaget`
      )
      .should("have.css", "font-size")
      .should("include", "36px");

    cy.get(".template-calendar").should(
      "have.attr",
      "style",
      '--bg-image:url("/fixtures/images/mountain1.jpeg");'
    );
  });
});
