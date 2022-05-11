import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField } from "../slide-util";
import GlobalStyles from "../GlobalStyles";
import da from "./lang/da.json";
import "./travel.scss";
/**
 * Travel component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Travel({ slide, content, run, slideDone }) {
  const {
    station,
    time_fast,
    time_moderate,
    title,
    text,
    image,
    distance,
    iframe_title,
    number_of_journeys,
    duration = 15000,
  } = content;
  let infoBoxClass = "info-box";
  let iFrameClass = "iframe";

  const [translations, setTranslations] = useState();

  // Rich text input sanitized
  const sanitizedtext = text ? parse(DOMPurify.sanitize(text, {})) : "";

  // The id for the chosen station
  let stationId;
  if (station && station.length > 0) {
    stationId = station[0].id;
  }

  const imageStyle = {};
  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, image);
  if (imageUrl) {
    imageStyle.backgroundImage = `url("${imageUrl}")`;
  } else {
    // If there is no image, the info box takes the space
    infoBoxClass = "info-box grow";
  }
  // If there is no text entries for the info box, the iframe takes the space
  if (!title && !sanitizedtext && !distance && !time_fast && !time_moderate) {
    iFrameClass = "iframe grow";
  }

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  /** Imports language strings. */
  useEffect(() => {
    setTranslations(da);
  }, []);

  return (
    <IntlProvider messages={translations} locale="da" defaultLocale="da">
      <div className="grid">
        {(title || sanitizedtext || distance || time_fast || time_moderate) && (
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
              <div className="text">{time_fast}</div>
            </div>
            <div className="time-moderat">
              <div>
                <FormattedMessage
                  id="time_moderate"
                  defaultMessage="time_moderate"
                />
              </div>
              <div className="text"> {time_moderate}</div>
            </div>
          </div>
        )}
        {imageStyle &&
          (title ||
            sanitizedtext ||
            distance ||
            time_fast ||
            time_moderate) && <div className="map" style={imageStyle} />}
        {stationId && (
          <div className={iFrameClass}>
            <iframe
              title="iframe title"
              sandbox="allow-same-origin allow-scripts"
              frameBorder="0"
              scrolling="no"
              src={`https://webapp.rejseplanen.dk/bin/help.exe/mn?L=vs_tus.vs_new&station=${stationId}&tpl=monitor&stopFrequency=low&preview=50&offsetTime=1&maxJourneys=${
                number_of_journeys || 1
              }&enableHIM=1&p1=bus&p1title=${
                iframe_title || ""
              }&p1icons=&p2icons=&`}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
      <GlobalStyles />
    </IntlProvider>
  );
}

Travel.defaultProps = {
  content: PropTypes.shape({
    station: "",
    time_fast: 0,
    time_moderate: 0,
    title: "",
    text: "",
    image: 0,
    distance: 0,
    iframe_title: "",
    number_of_journeys: 1,
    duration: 15000,
  }),
};

Travel.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number,
    station: PropTypes.arrayOf(PropTypes.any),
    time_fast: PropTypes.string,
    time_moderate: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
    distance: PropTypes.string,
    iframe_title: PropTypes.string,
    number_of_journeys: PropTypes.number,
  }),
};

export default Travel;
