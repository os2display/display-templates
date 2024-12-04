import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createGridArea,
  createGrid,
  determineGridArea,
} from "os2display-grid-generator";
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
import VimeoPlayer from "./vimeo-player/vimeo-player";
import "./index.css";;
import SocialNews from "./social-news/social-news";

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

const slideDone = () => {
  // eslint-disable-next-line no-console
  console.log("slide done");
};

export const renderSlide = (slide) => {
  switch (slide.type) {
    case "book-review":
      return (
        <BookReview
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "calendar":
      return (
        <Calendar
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "contacts":
      return (
        <Contacts
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "image-text":
      return (
        <ImageText
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "iframe":
      return (
        <IFrame
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "poster":
      return (
        <Poster
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "rss":
      return (
        <RSS
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "slideshow":
      return (
        <Slideshow
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "instagram-feed":
      return (
        <InstagramFeed
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "social-news":
      return (
        <SocialNews
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "table":
      return (
        <Table
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "video":
      return (
        <Video
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "travel":
      return (
        <Travel
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
          executionId="SLIDE_ID"
        />
      );
    case "vimeo-player":
      return (
        <VimeoPlayer
          content={slide.content}
          slide={slide}
          run="1234"
          slideDone={slideDone}
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
        newSelectedSlide.theme = {
          cssStyles: data,
          logo: newSelectedSlide?.theme?.logo,
        };
        setSlide(newSelectedSlide);
      });
  };

  useEffect(() => {
    if (slide?.themeFile) {
      getTheme(slide);
    }

    if (slide?.darkModeEnabled !== false) {
      // Apply color scheme.
      if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("color-scheme-dark");
      } else {
        document.documentElement.classList.add("color-scheme-light");
      }
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
      <h2>Lav en skærm</h2>
      <Link to="/create-screen">Lav en skærmtemplate</Link>
    </>
  );
};

const CreateScreenTemplate = () => {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [displayJSON, setDisplayJSON] = useState(false);
  const [regions, setRegions] = useState([]);

  /**
   * Generate JSON from regions.
   *
   * @returns {Array} Array of objects.
   */
  function getRegionsForJson() {
    return regions.map(({ gridArea }) => {
      return {
        id: "generate an ulid",
        title: "gives til block a great name",
        gridArea,
      };
    });
  }

  const [data, setData] = useState({});
  const [areasToBeMerged, setAreasToBeMerged] = useState("");
  const gridTemplateAreas = {
    gridTemplateAreas: createGrid(Number(columns), Number(rows)),
  };

  useEffect(() => {
    const alphabet = determineGridArea(columns, rows);
    const regionsFromRowsColumns = [];
    Array.from(Array(rows * columns).keys()).forEach((e, index) => {
      regionsFromRowsColumns.push({
        gridArea: [alphabet[index]],
        title: alphabet[index],
      });
    });
    setRegions(regionsFromRowsColumns);
  }, [rows, columns]);

  useEffect(() => {
    setData({
      title: "Give template a title",
      id: "Generate ulid for template",
      grid: {
        rows,
        columns,
      },
      regions: getRegionsForJson(),
    });
  }, [regions]);

  /** Merge grid areas from input. */
  function mergeGridAreas() {
    const regionsCopy = [...regions];
    areasToBeMerged.split(",").forEach((element) => {
      const index = regionsCopy.findIndex((e) => e.title === element);
      regionsCopy.splice(index, 1);
    });

    const lastGridCharacter =
      areasToBeMerged.split(",")[areasToBeMerged.split(",").length - 1];
    const firstGridCharacter = areasToBeMerged.split(",")[0];
    regionsCopy.push({
      gridArea: [`${firstGridCharacter}`, `${lastGridCharacter}`],
      title: `${firstGridCharacter} / ${firstGridCharacter} / ${lastGridCharacter} / ${lastGridCharacter}`,
    });
    setRegions(regionsCopy);
  }

  return (
    <>
      <div style={gridTemplateAreas} className="grid-index">
        {regions.map(({ gridArea, title }) => (
          <div
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
      <div className="inputs-container">
        <label htmlFor="rows">
          Rows
          <input
            id="rows"
            min="1"
            max="50" // I dunnoman
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            type="number"
          />
        </label>
        <label htmlFor="columns">
          Columns
          <input
            id="columns"
            min="1"
            max="50" // I dunnoman
            onChange={(e) => setColumns(e.target.value)}
            value={columns}
            type="number"
          />
        </label>
        <label htmlFor="merge">
          Merge grid areas (seperate with comma)
          <input
            id="merge"
            onChange={(e) => setAreasToBeMerged(e.target.value)}
            type="text"
          />
        </label>
        <button type="button" onClick={() => mergeGridAreas()}>
          Merge grid areas
        </button>
        <button type="button" onClick={() => setDisplayJSON(!displayJSON)}>
          {displayJSON && <>Remove json from screen</>}
          {!displayJSON && <> Display json</>}
        </button>
      </div>
      {displayJSON && (
        <pre
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2),
          }}
        />
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path=":id" element={<DisplayElement />} />
      <Route path="create-screen" element={<CreateScreenTemplate />} />
      <Route index element={<Overview />} />
    </Routes>
  </BrowserRouter>
);
