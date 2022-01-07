import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import "./calendar.scss";
import da from "./lang/da.json";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [translations, setTranslations] = useState();

  const {
    backgroundColor = "",
    hasDateAndTime,
    title,
    displayHeaders = true,
    layout = "multiple",
    footerText = null,
    subTitle = null,
    resourceAvailableText = null,
    colorize = false,
    colorizeColorClass = "",
    resourceUnavailableText = null,
  } = content;
  const { feedData = [] } = slide;

  const classes = ["template-calendar"];
  const rootStyle = {};

  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, content.image);

  if (imageUrl) {
    rootStyle.backgroundImage = `url("${imageUrl}")`;
  }

  if (colorize && colorizeColorClass !== "") {
    classes.push("colorize", colorizeColorClass);
  } else {
    rootStyle.backgroundColor = backgroundColor;
  }

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

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);
  }, []);

  useEffect(() => {
    let dateAndTimeInterval = null;

    if (hasDateAndTime) {
      dateAndTimeInterval = setInterval(() => setCurrentDate(new Date()), 1000);
    }

    return function cleanup() {
      if (dateAndTimeInterval !== null) {
        clearInterval(dateAndTimeInterval);
      }
    };
  }, [hasDateAndTime]);

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

  const groupEventsByDays = (events) => {
    const days = {};

    events.forEach((event) => {
      const dayString = dayjs(event.startTime * 1000)
        .locale(localeDa)
        .format("dddd D. MMMM");

      if (!Object.prototype.hasOwnProperty.call(days, dayString)) {
        days[dayString] = [];
      }

      days[dayString].push(event);
    });

    return days;
  };

  const renderTimeOfDay = (unixTimestamp) => {
    return dayjs(unixTimestamp * 1000)
      .locale(localeDa)
      .format("HH:mm");
  };

  const renderDays = (days) => {
    return Object.keys(days).map((dayString, index) => (
      <Fragment key={dayString}>
        {index < 5 && (
          <section className="multiple-days--group">
            <h3 className="multiple-days--group-header">{dayString}</h3>
            {days[dayString].map((event) => (
              <article key={event.id} className="multiple-days--group-item">
                <div>
                  {renderTimeOfDay(event.startTime)} -{" "}
                  {renderTimeOfDay(event.endTime)}
                </div>
                <div>
                  {event.title ?? resourceUnavailableText ?? (
                    <FormattedMessage
                      id="unavailable"
                      defaultMessage="Unavailable"
                    />
                  )}
                </div>
                <div>{event.resourceTitle ?? event.resourceId}</div>
              </article>
            ))}
          </section>
        )}
      </Fragment>
    ));
  };

  const renderSingle = (events) => {
    const elements = [];

    if (events.length > 0) {
      events.forEach((event) => {
        if (elements.length < 3) {
          elements.push(
            <div
              key={event.id}
              className={elements.length === 0 ? "single--now" : "single--next"}
            >
              <div className="single--meta">
                {renderTimeOfDay(event.startTime)}
                {" - "}
                {renderTimeOfDay(event.endTime)}
              </div>
              {event?.title ?? resourceUnavailableText ?? (
                <FormattedMessage
                  id="unavailable"
                  defaultMessage="Unavailable"
                />
              )}
            </div>
          );
        }
      });
    }

    return elements.concat();
  };

  return (
    <>
      <ThemeStyles name="template-calendar" css={slide?.themeData?.css} />
      <IntlProvider messages={translations} locale="da" defaultLocale="da">
        <div className={classes.join(" ")} style={rootStyle}>
          {/* Layout: Single resource */}
          {layout === "single" && (
            <>
              <div className="single--header">
                {title}
                {subTitle && (
                  <>
                    <br />
                    <div className="single--meta">{subTitle}</div>
                  </>
                )}
              </div>
              <div className="single--content">
                {feedData?.length === 0 && (
                  <div className="single--available">
                    {resourceAvailableText}
                  </div>
                )}
                {feedData?.length > 0 && renderSingle(feedData)}
              </div>
            </>
          )}
          {/* Layout: Multiple resources grouped by day */}
          {layout === "multipleDays" && (
            <>
              <h1 className="multiple-days--header">{title}</h1>
              <main className="multiple-days--content">
                {feedData?.length > 0 &&
                  renderDays(groupEventsByDays(feedData))}
              </main>
              {footerText && (
                <footer className="multiple-days--footer">
                  <span className="multiple-days--footer-text">
                    {footerText}
                  </span>
                </footer>
              )}
            </>
          )}
          {/* Layout: Multiple resources */}
          {layout === "multiple" && (
            <>
              <div className="grid-container-title-date">
                <div className="grid-item">{title}</div>
                <div className="grid-item-end">
                  {currentDate &&
                    capitalize(dayjs().locale(localeDa).format("LLLL"))}
                </div>
              </div>
              <div className="grid-container">
                {displayHeaders !== false && (
                  <>
                    <div className="grid-item header" key={1}>
                      <FormattedMessage id="what" defaultMessage="what" />
                    </div>
                    <div className="grid-item header" key={2}>
                      <FormattedMessage id="when" defaultMessage="when" />
                    </div>
                    <div className="grid-item header" key={3}>
                      <FormattedMessage id="where" defaultMessage="where" />
                    </div>
                  </>
                )}
                {feedData?.length > 0 &&
                  getSortedEvents(feedData).map((entry) => (
                    <Fragment key={entry.id}>
                      <div className="grid-item">
                        {entry.title ?? resourceUnavailableText ?? (
                          <FormattedMessage
                            id="unavailable"
                            defaultMessage="Unavailable"
                          />
                        )}
                      </div>
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
            </>
          )}
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
    mediaData: PropTypes.objectOf(PropTypes.any),
    feedData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number,
        resourceTitle: PropTypes.string,
        resourceId: PropTypes.string,
      })
    ),
  }).isRequired,
  content: PropTypes.shape({
    layout: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    colorize: PropTypes.bool,
    colorizeColorClass: PropTypes.string,
    backgroundColor: PropTypes.string,
    hasDateAndTime: PropTypes.bool,
    image: PropTypes.arrayOf(PropTypes.string),
    displayHeaders: PropTypes.bool,
    footerText: PropTypes.string,
    resourceAvailableText: PropTypes.string,
    resourceUnavailableText: PropTypes.string,
  }).isRequired,
};

export default Calendar;
