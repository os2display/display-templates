import React, { useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";
import { renderTimeOfDayFromUnixTimestamp } from "./helper";
import "./calendar.scss";

/**
 * Single resource calendar.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @param {Function} props.getTitle - Function to get title for event.
 * @returns {string} - The component.
 */
function CalendarSingle({
  content,
  calendarEvents,
  templateClasses = [],
  templateRootStyle = {},
  getTitle,
}) {
  const {
    title = "",
    subTitle = null,
    resourceAvailableText = null,
    mediaContain,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  const renderSingle = (calendarEventsToRender) => {
    const now = dayjs();
    const elements = [];

    if (calendarEventsToRender.length > 0) {
      calendarEventsToRender
        .filter(
          (e) => e.endTime > now.unix() && e.endTime <= now.endOf("day").unix()
        )
        .forEach((event) => {
          if (elements.length < 3) {
            elements.push(
              <ContentItem
                key={event.id}
                className={
                  elements.length === 0
                    ? "content-item single--now"
                    : "content-item single--next"
                }
              >
                <Meta>
                  {renderTimeOfDayFromUnixTimestamp(event.startTime)}
                  {" - "}
                  {renderTimeOfDayFromUnixTimestamp(event.endTime)}
                </Meta>
                {getTitle(event.title)}
              </ContentItem>
            );
          }
        });
    }

    return elements.concat();
  };

  return (
    <Wrapper
      className={`template-calendar calendar-single ${templateClasses.join(
        " "
      )} ${mediaContain ? "media-contain" : ""}`}
      style={templateRootStyle}
    >
      <Title className="title">{title}</Title>
      {subTitle && <SubTitle className="subtitle">{subTitle}</SubTitle>}
      <Content className="content">
        {calendarEvents?.length === 0 && (
          <ContentItem className="content-item">
            {resourceAvailableText}
          </ContentItem>
        )}
        {calendarEvents?.length > 0 && renderSingle(calendarEvents)}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* Wrapper styling */
  font-family: var(--font-family-base);
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  /*
  --bg-color is local to this template file and is populated from configuration.
  --background-color serves as fallback to the global variable, that will serve a light og dark background color depending on the user preferences.
  */
  background-color: var(--bg-color, var(--background-color));
  background-image: var(--bg-image, none);
  color: var(--text-color);
  padding: var(--padding-size-base);
`;

const Title = styled.div`
  font-size: var(--h1-font-size);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--margin-size-base);
`;

const SubTitle = styled.div`
  font-size: var(--h2-font-size);
  margin-bottom: var(--margin-size-base);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentItem = styled.div`
  border-left: var(--border);
  padding-left: var(--padding-size-base);
  margin-bottom: var(--margin-size-base);
  font-size: var(--font-size-base);

  &:first-of-type {
    font-size: calc(var(--font-size-base) * 2);
  }
`;

const Meta = styled.div`
  color: inherit;
  opacity: 0.75;
  font-size: smaller;
`;

CalendarSingle.propTypes = {
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
    subTitle: PropTypes.string,
    resourceAvailableText: PropTypes.string,
    resourceUnavailableText: PropTypes.string,
    mediaContain: PropTypes.bool,
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default CalendarSingle;
