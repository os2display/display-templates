import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

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
    dateAsBox = false, /* TODO: Add this to the configuration of the slide */
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
    <Wrapper className={"calendar-multiple " + templateClasses.join(" ")} style={{ '--bg-image': templateRootStyle.backgroundImage, '--bg-color': templateRootStyle.backgroundColor }}>

      <Header className="header">
        <HeaderTitle className="header-title">{title}</HeaderTitle>
        {!dateAsBox &&
          <HeaderDate className="header-date">
            { currentDate && capitalize(dayjs().locale(localeDa).format("dddd D. MMMM HH:mm"))}
          </HeaderDate>
        }
        {dateAsBox &&
          <HeaderDateBox className="header-date-box">
            <Weekday>{ currentDate && capitalize(dayjs().locale(localeDa).format("ddd"))}</Weekday>
            <DateNumber>{ currentDate && capitalize(dayjs().locale(localeDa).format("D"))}</DateNumber>
            <Month>{ currentDate && capitalize(dayjs().locale(localeDa).format("MMM"))}</Month>
          </HeaderDateBox>
        }
      </Header>

      <Content className="content">
        {displayHeaders !== false && (
            <ContentItemsWrapper>
              <ContentHeaderItem className="content-item" key={1}>
                <FormattedMessage id="what" defaultMessage="what" />
              </ContentHeaderItem>
              <ContentHeaderItem className="content-item" key={2}>
                <FormattedMessage id="when" defaultMessage="when" />
              </ContentHeaderItem>
              <ContentHeaderItem className="content-item" key={3}>
                <FormattedMessage id="where" defaultMessage="where" />
              </ContentHeaderItem>
            </ContentItemsWrapper>
          )}
          <ContentItemsWrapper>
            {calendarEvents?.length > 0 &&
              getSortedEvents(calendarEvents).map((entry) => (
                <Fragment key={entry.id}>
                  <ContentItem className="content-item-title">
                    {entry.title ?? resourceUnavailableText ?? (
                      <FormattedMessage
                        id="unavailable"
                        defaultMessage="Unavailable"
                      />
                    )}
                  </ContentItem>
                  <ContentItem className="content-item-time">
                    {dayjs(entry.startTime * 1000)
                      .locale(localeDa)
                      .format("LT")}
                  </ContentItem>
                  <ContentItem className="content-item-resouce">
                    {entry.resourceTitle ?? entry.resourceId ?? ""}
                  </ContentItem>
                </Fragment>
              ))}
          </ContentItemsWrapper>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: var(--font-family-base);
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--bg-color, var(--background-color));
  background-image: var(--bg-image, none);
  color: var(--text-color);
  display: grid;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: 1fr 9fr;
  padding: var(--padding-size-base);

  /* TODO: We should consider using props to set css variable instead of classes for colorize and colors */
  &.colorize {
    background-blend-mode: multiply;
    background-color: var(--background-color);
  }

  /* &.red {
    background-color: var(--color-red);
  }

  &.blue {
    background-color: var(--color-blue);
  }

  &.yellow {
    background-color: var(--color-yellow);
  } */


`;

const Header = styled.div`
  padding: var(--padding-size-base);
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const HeaderTitle = styled.div`
  font-size: var(--h1-font-size);
`;

const HeaderDate = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-light);
`;

const HeaderDateBox = styled.div`
  padding: var(--padding-size-base) calc(var(--padding-size-base) * 2);
  background-color: var(--color-primary);
  line-height: 1;
`;

const Weekday = styled.div`

`;

const DateNumber = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);

`;

const Month = styled.div`

`;

const Content = styled.div`
  grid-area: content;
`;

const ContentItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ContentItem = styled.div`
  padding: var(--padding-size-base);
  border-bottom: var(--border);
  border-left: var(--border);

  // Remove border left.
  &:nth-of-type(3n + 1) {
    border-left: 0;
  }

  // Remove border from bottom.
  &:nth-last-child(-n + 3) {
    border-bottom: 0;
  }
`;

const ContentHeaderItem = styled.div`
  padding: var(--padding-size-base);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
  border-bottom: var(--border);
  border-left: var(--border);

  // Remove border left.
  &:nth-of-type(3n + 1) {
    border-left: 0;
  }
`;

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
