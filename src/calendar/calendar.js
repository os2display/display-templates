import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IntlProvider, FormattedMessage } from "react-intl";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import BaseSlideExecution from "../base-slide-execution";
import "./calendar.scss";
import da from "./lang/da.json";
import { ThemeStyles } from "../slide-util";

/**
 * Calendar component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Calendar({ slide, content, run, slideDone }) {
  const [currentDate, setCurrentDate] = useState(null);
  const [translations, setTranslations] = useState();

  const { backgroundColor, hasDateAndTime, title } = content;
  const { feedData = [] } = slide;

  const classes = `template-calendar ${backgroundColor}`;

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(slide.duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  /** Imports language strings, sets localized formats and sets timer. */
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);

    let timer = null;
    if (hasDateAndTime) {
      timer = setInterval(() => setCurrentDate(new Date()), 1000);
    }
    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, []);

  // Sort events by datetime and filter away events that are done.
  const getSortedEvents = (data) => {
    const now = dayjs();
    return data
      .filter((e) => {
        const startDate = dayjs(e.startTime * 1000);

        return (
          e.startTime * 1000 > now.unix() && startDate.date() === now.date()
        );
      })
      .sort((a, b) => a - b);
  };

  /**
   * Capitalize the datestring, as it starts with the weekday.
   *
   * @param {string} s The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      <ThemeStyles name="template-book-review" css={slide?.themeData?.css} />
      <IntlProvider messages={translations} locale="da" defaultLocale="da">
        <div className={classes}>
          <div className="grid-container-title-date">
            <div className="grid-item">{title}</div>
            <div className="grid-item-end">
              {currentDate &&
                capitalize(dayjs().locale(localeDa).format("LLLL"))}
            </div>
          </div>
          <div className="grid-container">
            <div className="grid-item" key={1}>
              <FormattedMessage id="what" defaultMessage="what" />
            </div>
            <div className="grid-item" key={2}>
              <FormattedMessage id="when" defaultMessage="when" />
            </div>
            <div className="grid-item" key={3}>
              <FormattedMessage id="where" defaultMessage="where" />
            </div>
            {feedData?.length > 0 &&
              getSortedEvents(feedData).map((entry) => (
                <Fragment key={entry.id}>
                  <div className="grid-item">{entry.title}</div>
                  <div className="grid-item">
                    {dayjs(entry.startTime * 1000)
                      .locale(localeDa)
                      .format("LT")}
                  </div>
                  <div className="grid-item">
                    {entry.resourceTitle ?? entry.resourceId ?? ""}
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </IntlProvider>
    </>
  );
}

Calendar.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    events: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        resourceTitle: PropTypes.string.isRequired,
      })
    ),
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    hasDateAndTime: PropTypes.bool,
  }).isRequired,
};

export default Calendar;
