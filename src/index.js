import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createGridArea, createGrid } from "os2display-grid-generator";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import PropTypes from "prop-types";
import ImageText from "./image-text/image-text";
import slides from "./slides";
import screens from "./screens";
import BookReview from "./book-review/book-review";
import Calendar from "./calendar/calendar";
import Contacts from "./contacts/contacts";
import Poster from "./poster/poster";
import RSS from "./rss/rss";
import Slideshow from "./slideshow/slideshow";
import InstagramFeed from "./instagram-feed/instagram-feed";
import IFrame from "./iframe/iframe";
import Table from "./table/table";
import Video from "./video/video";
import Travel from "./travel/travel";
import "./index.css";

export const renderScreen = (screen) => {
  const gridTemplateAreas = {
    gridTemplateAreas: createGrid(
      screen.screenLayout.grid.columns,
      screen.screenLayout.grid.rows
    ),
  };

  return (
    <div style={gridTemplateAreas} className="grid-index">
      {screen.screenLayout.regions.map(({ id, gridArea, title }) => (
        <div
          key={id}
          className="grid-element"
          style={{ gridArea: createGridArea(gridArea) }}
        >
          {title}
          <br />
          gridarea:
          <br />
          <div>
            {gridArea.map((area) => (
              <div>{area}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const renderSlide = (slide) => {
  switch (slide.type) {
    case "book-review":
      return (
        <BookReview
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "calendar":
      return (
        <Calendar
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "contacts":
      return (
        <Contacts
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "image-text":
      return (
        <ImageText
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "iframe":
      return (
        <IFrame
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "poster":
      return (
        <Poster
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "rss":
      return (
        <RSS
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "slideshow":
      return (
        <Slideshow
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "instagram-feed":
      return (
        <InstagramFeed
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "table":
      return (
        <Table
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "video":
      return (
        <Video
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    case "travel":
      return (
        <Travel
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
          executionId="SLIDE_ID"
        />
      );
    default:
      return <div>Slide type not found!</div>;
  }
};

export const Slide = ({ slide: inputSlide }) => {
  const [slide, setSlide] = useState(inputSlide);
  const getTheme = (s) => {
    fetch(s.themeFile)
      .then((resp) => resp.text())
      .then((data) => {
        const newSelectedSlide = { ...s };
        newSelectedSlide.themeData = {
          cssStyles: data,
          logo: newSelectedSlide?.themeData?.logo,
        };
        setSlide(newSelectedSlide);
      });
  };

  useEffect(() => {
    if (slide?.themeFile) {
      getTheme(slide);
    }

    // Apply color scheme.
    if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("color-scheme-dark");
    } else {
      document.documentElement.classList.add("color-scheme-light");
    }
  }, []);

  return (
    <div className="app">
      <div className="slide" id="SLIDE_ID">
        {slide && renderSlide(slide)}
      </div>
    </div>
  );
};

Slide.propTypes = {
  slide: PropTypes.shape({}).isRequired,
};

export const DisplayElement = () => {
  const { id } = useParams();

  const foundSlide = slides.find((slide) => slide.id === id);
  const foundScreen = screens.find((screen) => screen.id === id);
  if (foundSlide) {
    return <Slide slide={foundSlide} />;
  }
  if (foundScreen) {
    return <Screen screen={foundScreen} />;
  }
  return "";
};

export const Screen = ({ screen }) => {
  return <div className="app">{screen && renderScreen(screen)}</div>;
};

Screen.propTypes = {
  screen: PropTypes.shape({}).isRequired,
};

export const Overview = () => {
  return (
    <>
      <h1>Examples</h1>

      <h2>Slidetemplates</h2>
      <ul>
        {slides.map((slide) => (
          <li key={slide.id} id={slide.id}>
            <Link to={`/${slide.id}`}>{slide.id}</Link>
          </li>
        ))}
      </ul>
      <h2>Skærmtemplates</h2>
      <ul>
        {screens.map((screen) => (
          <li key={screen.id} id={screen.id}>
            <Link to={`/${screen.id}`}>{screen.id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path=":id" element={<DisplayElement />} />
      <Route index element={<Overview />} />
    </Routes>
  </BrowserRouter>
);
