import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import "./poster.scss";
import da from "./lang/da.json";
import { ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

/**
 * Poster component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Poster({ slide, content, run, slideDone }) {
  const [translations, setTranslations] = useState();

  const { feedData = [] } = slide;
  const [first] = feedData;
  const [currentEvent, setCurrentEvent] = useState(first);

  // Animation.
  const [show, setShow] = useState(true);
  const animationActive = feedData.length > 1;
  const animationDuration = 500;
  const { entryDuration = 15 } = content; // default 15s.
  const entryDurationMilliseconds = entryDuration * 1000;

  // Props from content.
  const {
    endDate,
    startDate,
    name,
    image,
    excerpt,
    ticketPriceRange,
    url,
    place,
  } = currentEvent;

  const {
    // feedType,
    // eventId,
    // occurrenceId,
    // overrideTitle,
    // overrideSubTitle,
    // overrideTicketPrice,
    readMoreText,
    // hideTime,
  } = content;

  // Dates.
  const singleDayEvent =
    endDate &&
    new Date(endDate).toDateString() === new Date(startDate).toDateString();

  /** Imports language strings, sets localized formats and sets timer. */
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);
  }, []);

  /** Setup event switch and animation, if there is more than one event. */
  useEffect(() => {
    let animationTimer;
    let timer;
    if (animationActive) {
      timer = setTimeout(() => {
        const currentIndex = feedData.indexOf(currentEvent);
        const nextIndex = (currentIndex + 1) % feedData.length;
        setCurrentEvent(feedData[nextIndex]);
        setShow(true);
      }, entryDurationMilliseconds);

      animationTimer = setTimeout(() => {
        setShow(false);
      }, entryDurationMilliseconds - animationDuration);
    }
    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
      if (animationTimer !== null) {
        clearInterval(animationTimer);
      }
    };
  }, [currentEvent]);

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(entryDurationMilliseconds);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  /**
   * Capitalize the datestring, as it starts with the weekday.
   *
   * @param {string} s The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return capitalize(
      dayjs(date).locale(localeDa).format("LLLL")
    );
  };

  return (
    <>
      {/* TODO: Adjust styling to variables from Theme */}
      <IntlProvider messages={translations} locale="da" defaultLocale="da">
        <div className="template-poster">
          <div
            className="image-area"
            style={{
              backgroundImage: `url("${image}")`,
              ...(show
                ? { animation: `fade-in ${animationDuration}ms` }
                : { animation: `fade-out ${animationDuration}ms` }),
            }}
          />
          <div className="header-area" style={{ backgroundColor: "Azure" }}>
            <div className="center">
              <h1>{name}</h1>
              <p className="lead">{excerpt}</p>
            </div>
          </div>
          <div className="info-area" style={{ backgroundColor: "Aquamarine" }}>
            <div className="center">
              {startDate && endDate && (
                <span>
                  {singleDayEvent && (
                    <span>
                      <p className="date">
                        {formatDate(startDate)}
                      </p>
                    </span>
                  )}
                  {/* todo if startdate is not equal to enddate */}
                  {!singleDayEvent && (
                    <span>
                      <p className="date">
                        {formatDate(startDate)} - {formatDate(endDate)}
                      </p>
                    </span>
                  )}
                </span>
              )}
              {place && <p className="place">{place.name}</p>}
              {!ticketPriceRange && (
                <p className="ticket">
                  <FormattedMessage id="free" defaultMessage="free" />
                </p>
              )}
              {ticketPriceRange && <p className="ticket">{ticketPriceRange}</p>}
              {readMoreText && url && (
                <p className="moreinfo">
                  {readMoreText} <span className="look-like-link">{url}</span>
                </p>
              )}
              {readMoreText && !url && (
                <p className="moreinfo">{readMoreText}</p>
              )}
            </div>
          </div>
        </div>
      </IntlProvider>

      <ThemeStyles name="template-poster" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

Poster.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
    feedData: PropTypes.arrayOf(
      PropTypes.shape({
        endDate: PropTypes.string,
        eventStatusText: PropTypes.string,
        excerpt: PropTypes.string,
        image: PropTypes.string,
        name: PropTypes.string,
        place: PropTypes.shape({
          addressLocality: PropTypes.string,
          image: PropTypes.string,
          name: PropTypes.string,
          postalCode: PropTypes.string,
          streetAddress: PropTypes.string,
          telephone: PropTypes.string,
        }),
        startDate: PropTypes.string,
        ticketPriceRange: PropTypes.string,
        ticketPurchaseUrl: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  content: PropTypes.shape({
    entryDuration: PropTypes.number,
    feedType: PropTypes.string.isRequired,
    eventId: PropTypes.string,
    occurrenceId: PropTypes.string,
    overrideTitle: PropTypes.string,
    overrideSubTitle: PropTypes.string,
    overrideTicketPrice: PropTypes.string,
    readMoreText: PropTypes.string,
    hideTime: PropTypes.bool,
  }).isRequired,
};

export default Poster;
