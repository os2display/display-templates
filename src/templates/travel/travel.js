import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../../slide-util";
import da from "./lang/da.json";
import "../../global-styles.css";
import "./travel.scss";

/**
 * Travel component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function Travel({
  slide,
  run,
  slideDone,
  executionId,
  content = {
    station: [],
    timeFast: 0,
    timeModerate: 0,
    title: "",
    text: "",
    image: 0,
    distance: 0,
    iframeTitle: "",
    numberOfJourneys: 1,
    duration: 15000,
    monitorLayout: null,
    disableIcons: false,
  },
}) {
  const {
    station,
    timeFast,
    timeModerate,
    title,
    text,
    image,
    distance,
    iframeTitle,
    numberOfJourneys,
    busOrTram,
    monitorLayout,
    disableIcons,
    duration = 15000,
    mediaContain,
  } = content;

  let infoBoxClass = "info-box";
  let iFrameClass = "iframe";

  const [translations, setTranslations] = useState();
  const [iframeSrc, setIframeSrc] = useState("");

  // Rich text input sanitized
  const sanitizedtext = text ? parse(DOMPurify.sanitize(text, {})) : "";

  const getStationIds = () => {
    if (!(station instanceof Array) || station.length === 0) {
      return "";
    }
    return station.map(({ id }) => id).join("@");
  };

  const imageStyle = {};
  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, image);
  if (imageUrl) {
    imageStyle.backgroundImage = `url("${imageUrl}")`;
  } else {
    // If there is no image, the info box takes the space
    infoBoxClass = "info-box grow";
  }
  // If there is no text entries for the info box, the iframe takes the space
  if (!title && !sanitizedtext && !distance && !timeFast && !timeModerate) {
    iFrameClass = "iframe grow";
  }

  // Setup slide run function
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  // Create url
  useEffect(() => {
    const urlSearchParams = new URLSearchParams({
      L: "vs_tus.vs_new",
      station: getStationIds(),
      tpl: "monitor",
      stopFrequency: "low",
      preview: 50,
      offsetTime: 1,
      maxJourneys: numberOfJourneys || 1,
      enableHIM: 1,
      p1: busOrTram === "tram" ? "letbane" : "bus",
      p1title: iframeTitle || "",
    });

    if (disableIcons) {
      urlSearchParams.append("p1icons", null);
    }

    if (["auto", "night"].includes(monitorLayout)) {
      urlSearchParams.append("monitorLayout", monitorLayout);
    }

    setIframeSrc(
      `https://webapp.rejseplanen.dk/bin/help.exe/mn?${urlSearchParams}`
    );
  }, [busOrTram]);

  // Imports language strings
  useEffect(() => {
    setTranslations(da);
  }, []);

  return (
    <IntlProvider messages={translations} locale="da" defaultLocale="da">
      <div className="grid">
        {(title || sanitizedtext || distance || timeFast || timeModerate) && (
          <div className={infoBoxClass}>
            <div className="header">
              <h1>{title}</h1>
            </div>
            <div className="text">{sanitizedtext}</div>
            <div className="distance">
              <div>
                <FormattedMessage id="distance" defaultMessage="distance" />
              </div>
              <div className="text">{distance}</div>
            </div>
            <div className="time-fast">
              <div>
                <FormattedMessage id="time_fast" defaultMessage="time_fast" />
              </div>
              <div className="text">{timeFast}</div>
            </div>
            <div className="time-moderat">
              <div>
                <FormattedMessage
                  id="time_moderate"
                  defaultMessage="time_moderate"
                />
              </div>
              <div className="text"> {timeModerate}</div>
            </div>
          </div>
        )}
        {imageStyle &&
          (title || sanitizedtext || distance || timeFast || timeModerate) && (
            <div
              className={`map${mediaContain ? " media-contain" : ""}`}
              style={imageStyle}
            />
          )}
        {iframeSrc && (
          <div className={iFrameClass}>
            <iframe
              title="iframe title"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              scrolling="no"
              src={iframeSrc}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </IntlProvider>
  );
}

Travel.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number,
    station: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    timeFast: PropTypes.string,
    timeModerate: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
    distance: PropTypes.string,
    iframeTitle: PropTypes.string,
    busOrTram: PropTypes.string,
    numberOfJourneys: PropTypes.number,
    monitorLayout: PropTypes.string,
    disableIcons: PropTypes.bool,
    mediaContain: PropTypes.bool,
  }),
  executionId: PropTypes.string.isRequired,
};

export default Travel;
