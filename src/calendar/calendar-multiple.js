import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";

/**
 * Multiple resource calendar.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @returns {string} - The component.
 */
function CalendarMultiple({
  content,
  calendarEvents,
  templateClasses,
  templateRootStyle,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    title = "",
    hasDateAndTime,
    resourceUnavailableText = null,
    displayHeaders = true,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  /**
   * Capitalize the datestring, as it starts with the weekday.
   *
   * @param {string} s The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

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

  return (
    <div className={templateClasses.join(" ")} style={templateRootStyle}>
      <>
        <div className="grid-container-title-date">
          <div className="grid-item">{title}</div>
          <div className="grid-item-end">
            {currentDate && capitalize(dayjs().locale(localeDa).format("LLLL"))}
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
          {calendarEvents?.length > 0 &&
            getSortedEvents(calendarEvents).map((entry) => (
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
    </div>
  );
}

CalendarMultiple.defaultProps = {
  templateClasses: [],
  templateRootStyle: {},
};

CalendarMultiple.propTypes = {
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
    hasDateAndTime: PropTypes.bool,
    displayHeaders: PropTypes.bool,
    resourceUnavailableText: PropTypes.string,
  }).isRequired,
};

export default CalendarMultiple;
