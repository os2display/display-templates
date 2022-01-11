import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";

/**
 * Single resource calendar.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @returns {string} - The component.
 */
function CalendarSingle({
  content,
  calendarEvents,
  templateClasses,
  templateRootStyle,
}) {
  const {
    title = "",
    subTitle = null,
    resourceAvailableText = null,
    resourceUnavailableText = null,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  const renderTimeOfDay = (unixTimestamp) => {
    return dayjs(unixTimestamp * 1000)
      .locale(localeDa)
      .format("HH:mm");
  };

  const renderSingle = (calendarEventsToRender) => {
    const elements = [];

    if (calendarEventsToRender.length > 0) {
      calendarEventsToRender.forEach((event) => {
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
    <div className={templateClasses.join(" ")} style={templateRootStyle}>
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
          {calendarEvents?.length === 0 && (
            <div className="single--available">{resourceAvailableText}</div>
          )}
          {calendarEvents?.length > 0 && renderSingle(calendarEvents)}
        </div>
      </>
    </div>
  );
}

CalendarSingle.defaultProps = {
  templateClasses: [],
  templateRootStyle: {},
};

CalendarSingle.propTypes = {
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
    subTitle: PropTypes.string,
    resourceAvailableText: PropTypes.string,
    resourceUnavailableText: PropTypes.string,
  }).isRequired,
};

export default CalendarSingle;
