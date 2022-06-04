import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IntlProvider, FormattedMessage } from "react-intl";
import da from "./lang/da.json";
import { ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./poster.scss";

/**
 * Poster component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function Poster({ slide, content, run, slideDone, executionId }) {
  const [translations, setTranslations] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [show, setShow] = useState(true);
  const timerRef = useRef(null);
  const animationTimerRef = useRef(null);

  // Imports language strings, sets localized formats and sets timer.
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);

    return function cleanup() {
      if (timerRef?.current !== null) {
        clearInterval(timerRef.current);
      }
      if (animationTimerRef?.current !== null) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  if (!slide?.feed || !slide.feedData) {
    return "";
  }

  const { feed, feedData } = slide;

  // Animation.
  const animationDuration = 500;
  const { entryDuration = 15 } = content; // default 15s.
  const entryDurationMilliseconds = entryDuration * 1000;

  // Props from currentEvent.
  const {
    endDate,
    startDate,
    name,
    image,
    excerpt,
    ticketPriceRange,
    url,
    place,
  } = currentEvent ?? {};

  const { configuration = {} } = feed;

  const {
    overrideTitle = "",
    overrideSubTitle = "",
    overrideTicketPrice = "",
    overrideReadMoreUrl = "",
    hideTime = false,
    readMoreText = "",
  } = configuration;

  // Dates.
  const singleDayEvent =
    endDate &&
    new Date(endDate).toDateString() === new Date(startDate).toDateString();

  // Setup feed entry switch and animation, if there is more than one post.
  useEffect(() => {
    if (!currentEvent) return;

    timerRef.current = setTimeout(() => {
      const currentIndex = feedData.indexOf(currentEvent);
      const nextIndex = (currentIndex + 1) % feedData.length;

      if (nextIndex === 0) {
        slideDone(slide);
      } else {
        setCurrentEvent(feedData[nextIndex]);
        setShow(true);
      }
    }, entryDurationMilliseconds);

    animationTimerRef.current = setTimeout(() => {
      setShow(false);
    }, entryDurationMilliseconds - animationDuration);
  }, [currentEvent]);

  useEffect(() => {
    if (run) {
      if (feedData && currentEvent === null && feedData?.length > 0) {
        const [first] = feedData;
        setCurrentEvent(first);
      } else {
        setTimeout(() => slideDone(slide), 1000);
      }
    } else {
      setCurrentEvent(null);
    }
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
    return capitalize(dayjs(date).locale(localeDa).format("LLLL"));
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
              <h1>
                {!overrideTitle && name}
                {overrideTitle}
              </h1>
              <p className="lead">
                {!overrideSubTitle && excerpt}
                {overrideSubTitle}
              </p>
            </div>
          </div>
          <div className="info-area" style={{ backgroundColor: "Aquamarine" }}>
            <div className="center">
              {!hideTime && startDate && (
                <span>
                  {singleDayEvent && (
                    <span>
                      <p className="date">{formatDate(startDate)}</p>
                    </span>
                  )}
                  {/* todo if startdate is not equal to enddate */}
                  {!singleDayEvent && (
                    <span>
                      <p className="date">
                        {startDate && formatDate(startDate)} -
                        {endDate && formatDate(endDate)}
                      </p>
                    </span>
                  )}
                </span>
              )}
              {place && <p className="place">{place.name}</p>}
              <p className="ticket">
                {!ticketPriceRange && (
                  <FormattedMessage id="free" defaultMessage="free" />
                )}
                {ticketPriceRange && (
                  <>
                    {!overrideTicketPrice && ticketPriceRange}
                    {overrideTicketPrice}
                  </>
                )}
              </p>
              <>
                {readMoreText && <p className="moreinfo">{readMoreText}</p>}
                {!overrideReadMoreUrl && url && (
                  <span className="look-like-link">{url}</span>
                )}
                {overrideReadMoreUrl && (
                  <span className="look-like-link">{overrideReadMoreUrl}</span>
                )}
              </>
            </div>
          </div>
        </div>
      </IntlProvider>

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
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
    feed: PropTypes.shape({
      configuration: PropTypes.shape({
        overrideTitle: PropTypes.string,
        overrideSubTitle: PropTypes.string,
        overrideTicketPrice: PropTypes.string,
        overrideReadMoreUrl: PropTypes.string,
        hideTime: PropTypes.bool,
        readMoreText: PropTypes.string,
      }),
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
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Poster;
