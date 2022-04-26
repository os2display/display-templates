import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from '../GlobalStyles';
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

  const sanitizedtext = text ? parse(DOMPurify.sanitize(text, {})) : "";
  const [translations, setTranslations] = useState();

  const stationId = station[0].id

  const imageStyle = {};
  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, image);
  if (imageUrl) {
    imageStyle.backgroundImage = `url("${imageUrl}")`;
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
        <div className="info-box">
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
        <div className="map" style={imageStyle} />
        <div className="iframe">
          <iframe
            title="iframe title"
            sandbox="allow-same-origin allow-scripts"
            frameBorder="0"
            scrolling="no"
            src={`https://webapp.rejseplanen.dk/bin/help.exe/mn?L=vs_tus.vs_new&station=${stationId}&tpl=monitor&stopFrequency=low&preview=50&offsetTime=1&maxJourneys=${number_of_journeys}&enableHIM=1&p1=bus&p1title=${iframe_title}&p1icons=&p2icons=&`}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <ThemeStyles name="template-image-text" css={slide?.themeData?.css} />
      <GlobalStyles />
    </IntlProvider>
  );
}

Travel.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    source: PropTypes.string,
  }).isRequired,
};

export default Travel;
