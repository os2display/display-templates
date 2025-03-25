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
 * @returns {JSX.Element} The component.
 */
function Poster({ slide, content, run, slideDone, executionId }) {
  const [translations, setTranslations] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [show, setShow] = useState(true);
  const timerRef = useRef(null);
  const animationTimerRef = useRef(null);
  const logo = slide?.theme?.logo;
  const { showLogo, mediaContain } = content;

  const logoUrl = showLogo && logo?.assets?.uri ? logo.assets.uri : "";

  const { feed, feedData } = slide;

  // Animation.
  const animationDuration = 500;
  const { duration = 15000 } = content; // default 15s.

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

  const { configuration = {} } = feed ?? {};

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
    return capitalize(dayjs(date).locale(localeDa).format("ll"));
  };

  const formatTime = (date) => {
    if (!date) return "";
    return capitalize(dayjs(date).locale(localeDa).format("LT"));
  };

  const formatDateNoYear = (date) => {
    if (!date) return "";
    return capitalize(dayjs(date).locale(localeDa).format("DD MMM"));
  };

  const getUrlDomain = (urlString) => {
    return (
      urlString
        // Remove scheme
        .replace(/^[^:]*:\/\//, "")
        // Remove paths
        .replace(/\/.*$/, "")
    );
  };

  useEffect(() => {
    if (currentEvent) {
      setShow(true);
    }
  }, [currentEvent]);

  // Setup feed entry switch and animation, if there is more than one post.
  useEffect(() => {
    if (currentIndex === null) {
      return;
    }

    setCurrentEvent(feedData[currentIndex]);

    const nextIndex = (currentIndex + 1) % feedData.length;

    if (nextIndex > 0) {
      if (animationTimerRef?.current) {
        clearInterval(animationTimerRef.current);
      }

      animationTimerRef.current = setTimeout(() => {
        setShow(false);
      }, duration - animationDuration + 50);
    }

    if (timerRef?.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (nextIndex === 0) {
        slideDone(slide);
      } else {
        setCurrentIndex(nextIndex);
      }
    }, duration);
  }, [currentIndex]);

  useEffect(() => {
    if (run) {
      if (feedData?.length > 0) {
        setCurrentIndex(0);
      } else {
        setTimeout(() => slideDone(slide), 1000);
      }
    } else {
      setCurrentEvent(null);
      setCurrentIndex(null);
    }
  }, [run]);

  // Imports language strings, sets localized formats and sets timer.
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);

    return function cleanup() {
      if (timerRef?.current) {
        clearInterval(timerRef.current);
      }
      if (animationTimerRef?.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* TODO: Adjust styling to variables from Theme */}
      {currentEvent !== null && (
        <IntlProvider messages={translations} locale="da" defaultLocale="da">
          <div className={`template-poster ${showLogo && "with-logo"}`}>
            <div
              className={`image-area ${mediaContain ? "media-contain" : ""}`}
              style={
                image
                  ? {
                      backgroundImage: `url("${image}")`,
                      ...(show
                        ? { animation: `fade-in ${animationDuration}ms` }
                        : { animation: `fade-out ${animationDuration}ms` }),
                    }
                  : {}
              }
            />
            <div className="header-area">
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
            <div className="info-area">
              <div className="center">
                {!hideTime && startDate && (
                  <span>
                    {singleDayEvent && (
                      <span>
                        <div className="date">{formatDate(startDate)}</div>
                        <div className="date">
                          {formatTime(startDate)} - {formatTime(endDate)}
                        </div>
                      </span>
                    )}
                    {/* todo if startdate is not equal to enddate */}
                    {!singleDayEvent && (
                      <span>
                        <div className="date">
                          {startDate && formatDateNoYear(startDate)} -{" "}
                          {endDate && formatDate(endDate)}
                        </div>
                        <div className="date">
                          {formatTime(startDate)} - {formatTime(endDate)}
                        </div>
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
                    <span className="look-like-link">{getUrlDomain(url)}</span>
                  )}
                  {overrideReadMoreUrl && (
                    <span className="look-like-link">
                      {overrideReadMoreUrl}
                    </span>
                  )}
                </>
              </div>
            </div>
            {showLogo && (
              <div className="logo-area">
                <img src={logoUrl} alt="" />
              </div>
            )}
          </div>
        </IntlProvider>
      )}

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </>
  );
}

Poster.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
      logo: PropTypes.shape({
        assets: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
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
    ),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number,
    showLogo: PropTypes.bool,
    mediaContain: PropTypes.bool,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Poster;
