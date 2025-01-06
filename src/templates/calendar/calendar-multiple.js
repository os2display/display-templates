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
 * @param {Function} props.getTitle - Function to get title for event.
 * @returns {JSX.Element} - The component.
 */
function CalendarMultiple({
  content,
  calendarEvents,
  templateClasses = [],
  templateRootStyle = {},
  getTitle,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    title = "",
    hasDateAndTime,
    displayHeaders = true,
    hideGrid = false,
    dateAsBox = false /* TODO: Add this to the configuration of the slide */,
    headerOrder = "whenwhatwhere",
    mediaContain,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  // Numbers used in css to switch the order of the elements, both headers and "items"
  const orderWhere = headerOrder === "whenwhatwhere" ? 3 : 2;
  const orderWhat = headerOrder === "whenwhatwhere" ? 2 : 1;
  const orderWhen = headerOrder === "whenwhatwhere" ? 1 : 3;
  const borderStyle = {};
  if (hideGrid) {
    borderStyle["--border"] = 0;
  }

  let counterForOrder = 0;

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

        return e.endTime > now.unix() && startDate.date() === now.date();
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
    <Wrapper
      className={`template-calendar calendar-multiple ${templateClasses.join(
        " "
      )} ${mediaContain ? "media-contain" : ""}`}
      style={Object.assign(borderStyle, templateRootStyle)}
    >
      <Header className="header">
        <HeaderTitle className="header-title">{title}</HeaderTitle>
        {hasDateAndTime && (
          <>
            {!dateAsBox && (
              <HeaderDate className="header-date">
                {currentDate &&
                  capitalize(
                    dayjs().locale(localeDa).format("dddd D. MMMM HH:mm")
                  )}
              </HeaderDate>
            )}
            {dateAsBox && (
              <HeaderDateBox className="header-date-box">
                <Weekday>
                  {currentDate &&
                    capitalize(dayjs().locale(localeDa).format("ddd"))}
                </Weekday>
                <DateNumber>
                  {currentDate &&
                    capitalize(dayjs().locale(localeDa).format("D"))}
                </DateNumber>
                <Month>
                  {currentDate &&
                    capitalize(dayjs().locale(localeDa).format("MMM"))}
                </Month>
              </HeaderDateBox>
            )}
          </>
        )}
      </Header>

      <Content className="content">
        {displayHeaders !== false && (
          <ContentItemsWrapper>
            <ContentHeaderItem
              className="content-item"
              key={2}
              style={{ order: orderWhen }}
            >
              <FormattedMessage id="when" defaultMessage="when" />
            </ContentHeaderItem>
            <ContentHeaderItem
              className="content-item"
              key={1}
              style={{ order: orderWhat }}
            >
              <FormattedMessage id="what" defaultMessage="what" />
            </ContentHeaderItem>
            <ContentHeaderItem
              className="content-item"
              key={3}
              style={{ order: orderWhere }}
            >
              <FormattedMessage id="where" defaultMessage="where" />
            </ContentHeaderItem>
          </ContentItemsWrapper>
        )}
        <ContentItemsWrapper>
          {calendarEvents?.length > 0 &&
            getSortedEvents(calendarEvents).map((entry) => {
              const returnFragment = (
                <Fragment key={entry.id}>
                  <ContentItem
                    className="content-item-time"
                    style={{ order: counterForOrder + orderWhen }}
                  >
                    {dayjs(entry.startTime * 1000)
                      .locale(localeDa)
                      .format("LT")}
                    {entry.endTime && (
                      <>
                        <span> - </span>
                        {dayjs(entry.endTime * 1000)
                          .locale(localeDa)
                          .format("LT")}
                      </>
                    )}
                  </ContentItem>
                  <ContentItem
                    className="content-item-title"
                    style={{ order: counterForOrder + orderWhat }}
                  >
                    {getTitle(entry.title)}
                  </ContentItem>
                  <ContentItem
                    className="content-item-resource"
                    style={{ order: counterForOrder + orderWhere }}
                  >
                    {entry.resourceTitle ?? entry.resourceId ?? ""}
                  </ContentItem>
                </Fragment>
              );
              counterForOrder += 3;
              return returnFragment;
            })}
        </ContentItemsWrapper>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  overflow: hidden;
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
  display: grid;
  grid-template-areas:
    "header"
    "content";
  grid-template-rows: 1fr 9fr;
  padding: var(--padding-size-base);
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

const Weekday = styled.div``;

const DateNumber = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
`;

const Month = styled.div``;

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

CalendarMultiple.propTypes = {
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
    headerOrder: PropTypes.string,
    title: PropTypes.string,
    hasDateAndTime: PropTypes.bool,
    displayHeaders: PropTypes.bool,
    dateAsBox: PropTypes.bool,
    resourceUnavailableText: PropTypes.string,
    hideGrid: PropTypes.bool,
    mediaContain: PropTypes.bool,
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default CalendarMultiple;
