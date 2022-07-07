import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

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
          <Col className="content-col">
            <ColTitle className="col-title">{dayString}</ColTitle>
            {days[dayString].map((event) => (
              <ColItem key={event.id} className="col-item">
                <Time className="col-item-time">
                  <div>{renderTimeOfDay(event.startTime)} - </div>
                  <div>{renderTimeOfDay(event.endTime)}</div>
                </Time>
                <Event className="col-item-event">
                  <div>
                    {event.title ?? resourceUnavailableText ?? (
                      <FormattedMessage
                        id="unavailable"
                        defaultMessage="Unavailable"
                      />
                    )}
                  </div>
                  <EventResourceTitle>
                    {event.resourceTitle ?? event.resourceId}
                  </EventResourceTitle>
                </Event>
              </ColItem>
            ))}
          </Col>
        )}
      </Fragment>
    ));
  };

  return (
    <Wrapper
      className={`calendar-multiple-days ${templateClasses.join(" ")}`}
      style={templateRootStyle}
    >
      <>
        <Title className="title">{title}</Title>
        <Content className="content">
          {calendarEvents?.length > 0 &&
            renderDays(groupEventsByDays(calendarEvents))}
        </Content>
        {footerText && <Footer className="footer">{footerText}</Footer>}
      </>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  /*
  --bg-color is local to this template file and is populated from configuration.
  --background-color serves as fallback to the global variable, that will serve a light og dark background color depending on the user preferences.
  */
  background-color: var(--bg-color, var(--background-color));
  background-image: var(--bg-image, none);
  color: var(--text-color);
  display: grid;
  grid-template-areas:
    "title"
    "content"
    "footer";
  grid-template-rows: 1fr 14fr 1fr;
`;

const Title = styled.h1`
  grid-area: title;
  color: var(--color-primary);
  padding: 0 var(--padding-size-base);
  font-weight: var(--font-weight-light);
  font-size: var(--h2-font-size);
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(4, 25%);

  @media (orientation: portrait) {
    grid-template-rows: repeat(1fr, auto);
    grid-template-columns: revert;
    font-size: calc(var(--font-size-base) * 2);
  }
`;

const Col = styled.section`
  background-color: var(--color-grey-200);
`;

const ColTitle = styled.p`
  background-color: var(--color-grey-100);
  padding: calc(var(--padding-size-base) * 1.5) var(--padding-size-base);
  margin: 0;
  font-weight: var(--font-weight-bold);
`;

const ColItem = styled.article`
  padding: var(--padding-size-base);
  display: flex;
  background-color: var(--color-grey-300);

  &:nth-child(odd) {
    background-color: var(--color-grey-400);
  }
`;

const Time = styled.div`
  line-height: 1.5;
`;

const Event = styled.div`
  padding-left: calc(var(--padding-size-base) * 2);
  line-height: 1.5;
`;

const EventResourceTitle = styled.div`
  opacity: 0.75;
`;

const Footer = styled.div`
  grid-area: footer;
  padding-left: var(--padding-size-base);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
