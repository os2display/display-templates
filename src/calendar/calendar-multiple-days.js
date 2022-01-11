import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";

/**
 * Multiple days resource calendar.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @returns {string} - The component.
 */
function CalendarMultipleDays({
  content,
  calendarEvents,
  templateClasses,
  templateRootStyle,
}) {
  const {
    title = "",
    resourceUnavailableText = null,
    footerText = null,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

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

  return (
    <div className={templateClasses.join(" ")} style={templateRootStyle}>
      <>
        <h1 className="multiple-days--header">{title}</h1>
        <main className="multiple-days--content">
          {calendarEvents?.length > 0 &&
            renderDays(groupEventsByDays(calendarEvents))}
        </main>
        {footerText && (
          <footer className="multiple-days--footer">
            <span className="multiple-days--footer-text">{footerText}</span>
          </footer>
        )}
      </>
    </div>
  );
}

CalendarMultipleDays.defaultProps = {
  templateClasses: [],
  templateRootStyle: {},
};

CalendarMultipleDays.propTypes = {
  templateClasses: PropTypes.arrayOf(PropTypes.string),
  templateRootStyle: PropTypes.objectOf(PropTypes.any),
  calendarEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number,
      resourceTitle: PropTypes.string,
      resourceId: PropTypes.string,
    })
  ).isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    displayHeaders: PropTypes.bool,
    footerText: PropTypes.string,
    resourceUnavailableText: PropTypes.string,
  }).isRequired,
};

export default CalendarMultipleDays;
