import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import ImageText from "./image-text/image-text";
import slides from "./slides";
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

const renderSlide = (slide) => {
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

const Slide = () => {
  const { slideId } = useParams();
  const [selectedSlide, setSelectedSlide] = useState(null);

  const getTheme = (slide) => {
    fetch(slide.themeFile)
      .then((resp) => resp.text())
      .then((data) => {
        const newSelectedSlide = { ...slide };
        newSelectedSlide.themeData = {
          css: data,
          logo: newSelectedSlide?.themeData?.logo,
        };
        setSelectedSlide(newSelectedSlide);
      });
  };

  useEffect(() => {
    const foundSlide = slides.find((slide) => slide.id === slideId);
    setSelectedSlide(foundSlide);

    if (foundSlide?.themeFile) {
      getTheme(foundSlide);
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
        {selectedSlide && renderSlide(selectedSlide)}
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <>
      <h1>Examples</h1>

      <ul>
        {slides.map((slide) => (
          <li key={slide.id} id={slide.id}>
            <Link to={`/${slide.id}`}>{slide.id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:slideId" element={<Slide />} />
        <Route index element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
