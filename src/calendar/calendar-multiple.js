import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

/* TODO: Remove themes after testing  */
//import "../themes/dokk1.css"
//import "../themes/aarhus.css"
//import "../themes/mso.css"

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
    <Wrapper className={templateClasses.join(" ")} style={templateRootStyle}>

      <Header>
        <HeaderTitle>{title}</HeaderTitle>
        {!dateAsBox &&
          <HeaderDate>
            { currentDate && capitalize(dayjs().locale(localeDa).format("dddd D. MMMM HH:mm"))}
          </HeaderDate>
        }
        {dateAsBox &&
          <HeaderDateBox>
            <Weekday>{ currentDate && capitalize(dayjs().locale(localeDa).format("ddd"))}</Weekday>
            <DateNumber>{ currentDate && capitalize(dayjs().locale(localeDa).format("D"))}</DateNumber>
            <Month>{ currentDate && capitalize(dayjs().locale(localeDa).format("MMM"))}</Month>
          </HeaderDateBox>
        }
      </Header>

      <Content>
        {displayHeaders !== false && (
            <ContentItemsWrapper>
              <ContentHeaderItem key={1}>
                <FormattedMessage id="what" defaultMessage="what" />
              </ContentHeaderItem>
              <ContentHeaderItem key={2}>
                <FormattedMessage id="when" defaultMessage="when" />
              </ContentHeaderItem>
              <ContentHeaderItem key={3}>
                <FormattedMessage id="where" defaultMessage="where" />
              </ContentHeaderItem>
            </ContentItemsWrapper>
          )}
          <ContentItemsWrapper>
            {calendarEvents?.length > 0 &&
              getSortedEvents(calendarEvents).map((entry) => (
                <Fragment key={entry.id}>
                  <ContentItem>
                    {entry.title ?? resourceUnavailableText ?? (
                      <FormattedMessage
                        id="unavailable"
                        defaultMessage="Unavailable"
                      />
                    )}
                  </ContentItem>
                  <ContentItem>
                    {dayjs(entry.startTime * 1000)
                      .locale(localeDa)
                      .format("LT")}
                  </ContentItem>
                  <ContentItem>
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
  background-color: var(--bg-transparent);
  color: var(--color-white);
  display: grid;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: 1fr 9fr;
  padding: var(--padding-size-base);

  /* TODO: We should consider using props to set css variable instead of classes for colorize and colors */
  &.colorize {
    background-blend-mode: multiply;
    background-color: var(--color-primary);
  }

  &.red {
    background-color: var(--color-red);
    color: var(--color-white);
    border-color: var(--color-white);
  }

  &.blue {
    background-color: var(--color-blue);
    color: var(--color-white);
    border-color: var(--color-white);
  }

  &.yellow {
    background-color: var(--color-yellow);
    color: var(--color-white);
    border-color: var(--color-white);
  }
`;

const Header = styled.div`
  padding: var(--padding-size-base);
  grid-area: header;
  background-color: var(--bg-transparent);
  color: var(--color-white);
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
  color: var(--color-light);
`;

const DateNumber = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
  color: var(--color-light);
`;

const Month = styled.div`
  color: var(--color-light);
`;

const Content = styled.div`
  grid-area: content;
  background-color: var(--bg-transparent);
  color: var(--color-white);
`;

const ContentItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ContentItem = styled.div`
  padding: var(--padding-size-base);
  border-bottom: var(--border-light);
  border-left: var(--border-light);

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
  border-bottom: var(--border-light);
  border-left: var(--border-light);

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
