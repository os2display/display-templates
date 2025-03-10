import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";
import { renderTimeOfDayFromUnixTimestamp } from "./helper";

/**
 * Multiple days resource calendar.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @param {Function} props.getTitle - Function to get title for event.
 * @returns {string} - The component.
 */
function CalendarMultipleDays({
  content,
  calendarEvents,
  templateClasses = [],
  templateRootStyle = {},
  getTitle,
}) {
  const { title = "", footerText = null, mediaContain } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  /**
   * Groups events by days and filter away events that are done.
   *
   * @param {Array} events Array of events.
   * @returns {object} Events grouped by day.
   */
  const groupEventsByDays = (events) => {
    const now = dayjs();
    const days = {};

    events
      .filter((e) => e.endTime > now.unix())
      .forEach((event) => {
        const startDate = dayjs(event.startTime * 1000);
        const dayTitle = startDate.locale(localeDa).format("dddd D. MMMM");
        const dateString = startDate.format("YYYY-MM-DD");

        if (!Object.prototype.hasOwnProperty.call(days, dateString)) {
          days[dateString] = {
            events: [],
            title: dayTitle,
          };
        }

        days[dateString].events.push(event);
      });

    return days;
  };

  const renderDays = (days) => {
    const sortedKeys = Object.keys(days).sort();

    return sortedKeys.map((dateString, index) => (
      <Fragment key={dateString}>
        {index < 5 && (
          <Col className="content-col">
            <ColTitle className="col-title">{days[dateString].title}</ColTitle>
            {days[dateString].events.map((event) => (
              <ColItem key={event.id} className="col-item">
                <Time className="col-item-time">
                  <div>
                    {renderTimeOfDayFromUnixTimestamp(event.startTime)} -
                  </div>
                  <div>{renderTimeOfDayFromUnixTimestamp(event.endTime)}</div>
                </Time>
                <Event className="col-item-event">
                  <EventTitle>{getTitle(event.title)}</EventTitle>
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
      className={`template-calendar calendar-multiple-days ${templateClasses.join(
        " "
      )} ${mediaContain ? "media-contain" : ""}`}
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

  @media (orientation: portrait) {
    padding: calc(var(--padding-size-base) * 1.5)
      calc(var(--padding-size-base) * 2) 0 calc(var(--padding-size-base) * 2);
    font-size: calc(var(--h1-font-size) * 2);
  }
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(5, 20%);
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      hsla(0, 0%, 18%, 1) 0%,
      hsla(0, 0%, 18%, 0) 100%
    );
    @media (orientation: portrait) {
      height: 30px;
    }
  }

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
  padding: calc(var(--padding-size-base) * 0.5) var(--padding-size-base);
  margin: 0;
  font-weight: var(--font-weight-bold);

  @media (orientation: portrait) {
    padding: calc(var(--padding-size-base) * 1.1)
      calc(var(--padding-size-base) * 2);
  }
`;

const ColItem = styled.article`
  padding: calc(var(--padding-size-base) * 0.65) var(--padding-size-base);
  display: flex;
  background-color: var(--color-grey-300);

  &:nth-child(odd) {
    background-color: var(--color-grey-400);
  }

  @media (orientation: portrait) {
    padding: calc(var(--padding-size-base) * 0.65)
      calc(var(--padding-size-base) * 2);
  }
`;

const Time = styled.div`
  line-height: 1.5;
  min-width: fit-content;

  @media (orientation: portrait) {
    div {
      display: inline-block;

      &:nth-last-of-type(1) {
        margin-left: 5px;
      }
    }
  }
`;

const Event = styled.div`
  padding: 0 calc(var(--padding-size-base) * 0.5) 0 var(--padding-size-base);
  line-height: 1.5;
  max-width: 100%;
`;

const EventTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;

  @media (orientation: portrait) {
    max-width: 740px;
  }
`;

const EventResourceTitle = styled.div`
  opacity: 0.75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;

  @media (orientation: portrait) {
    max-width: 740px;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  padding-left: var(--padding-size-base);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (orientation: portrait) {
    font-size: calc(var(--font-size-base) * 2);
  }
`;

CalendarMultipleDays.propTypes = {
  templateClasses: PropTypes.arrayOf(PropTypes.string),
  templateRootStyle: PropTypes.shape({}),
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
    mediaContain: PropTypes.bool,
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default CalendarMultipleDays;
