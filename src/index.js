import React, { useEffect } from "react";
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

const renderSlide = (slide) => {
  switch (slide.type) {
    case "book-review":
      return (
        <BookReview
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "calendar":
      return (
        <Calendar
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "contacts":
      return (
        <Contacts
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "image-text":
      return (
        <ImageText
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "iframe":
      return (
        <IFrame
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "poster":
      return (
        <Poster
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "rss":
      return (
        <RSS
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "slideshow":
      return (
        <Slideshow
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "instagram-feed":
      return (
        <InstagramFeed
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "table":
      return (
        <Table
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    case "video":
      return (
        <Video
          content={slide.content}
          slide={slide}
          run={new Date().toISOString()}
          slideDone={() => {}}
        />
      );
    default:
      return <div>Slide type not found!</div>;
  }
};

const Slide = () => {
  const { slideId } = useParams();

  const selectedSlide = slides.find((slide) => slide.id === slideId);

  useEffect(() => {
    if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("color-scheme-dark");
    } else {
      document.documentElement.classList.add("color-scheme-light");
    }
  }, []);

  return <div>{selectedSlide && <div>{renderSlide(selectedSlide)}</div>}</div>;
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
