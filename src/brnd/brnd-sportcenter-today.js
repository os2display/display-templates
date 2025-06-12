import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

/**
 * Todays bookings for sportcenter.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.bookings - The bookings.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @param {Function} props.getTitle - Function to get title for event.
 * @returns {JSX.Element} - The component.
 */
function BrndSportcenterToday({
  content,
  bookings,
  templateClasses = [],
  templateRootStyle = {},
  getTitle,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    title = "",
    mediaContain,
  } = content;

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  const borderStyle = {
    "--border-bottom": "1px solid #ccc",
    "--border-left": 0,
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

  // Sort events by datetime and filter away events that are done.
  const getSortedBookings = (data) => {
    const now = dayjs();

    return data
      .filter((e) => {
        const startDate = dayjs(e.startTime * 1000);

        return e.endTime > now.unix() && startDate.date() === now.date();
      })
      .sort((a, b) => a.startTime - b.startTime);
  };

  useEffect(() => {
    const dateAndTimeInterval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(dateAndTimeInterval);
  }, []);

  return (
    <Wrapper
      className={`template-brnd brnd-sportcenter-today ${templateClasses.join(
        " "
      )} ${mediaContain ? "media-contain" : ""}`}
      style={Object.assign(borderStyle, templateRootStyle)}
    >
      <Header className="header">
        <HeaderTitle className="header-title">{title}</HeaderTitle>
        <HeaderDate className="header-date">
          {currentDate &&
            capitalize(
              dayjs().locale(localeDa).format("dddd D. MMMM HH:mm")
            )}
        </HeaderDate>
      </Header>

      <Content className="content">
        <ContentItemsWrapper>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="when" defaultMessage="Tid" />
          </ContentHeaderItem>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="booking-by" defaultMessage="Booket af" />
          </ContentHeaderItem>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="facility" defaultMessage="Facilitet" />
          </ContentHeaderItem>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="activity" defaultMessage="Aktivitet" />
          </ContentHeaderItem>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="team" defaultMessage="Hold" />
          </ContentHeaderItem>
          <ContentHeaderItem className="content-item">
            <FormattedMessage id="remarks" defaultMessage="Bemærkning" />
          </ContentHeaderItem>
        </ContentItemsWrapper>
        <ContentItemsWrapper>
          {bookings?.length > 0 &&
            getSortedBookings(bookings).map((entry) => {
              const returnFragment = (
                <Fragment key={entry.bookingcode}>
                  <ContentItem className="content-item-time">
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
                  <ContentItem className="content-item-booking-by">
                    {getTitle(entry.bookingBy)}
                  </ContentItem>
                  <ContentItem className="content-item-facility">
                    {getTitle(entry.facility)}
                  </ContentItem>
                  <ContentItem className="content-item-activity">
                    {getTitle(entry.activity)}
                  </ContentItem>
                  <ContentItem className="content-item-team">
                    {entry.team ?? entry.team ?? ""}
                  </ContentItem>
                  <ContentItem className="content-item-remarks">
                    {entry.remarks ?? entry.remarks ?? ""}
                  </ContentItem>
                </Fragment>
              );
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

const Content = styled.div`
  grid-area: content;
`;

const ContentItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const ContentItem = styled.div`
  padding: var(--padding-size-base);
  border-bottom: var(--border-bottom, 1px solid #ccc);
  border-left: var(--border-left, 0);

  // Remove border left.
  &:nth-of-type(6n + 1) {
    border-left: 0;
  }

  // Remove border from bottom.
  &:nth-last-child(-n + 6) {
    border-bottom: 0;
  }
`;

const ContentHeaderItem = styled.div`
  padding: var(--padding-size-base);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
  border-bottom: var(--border-bottom, 1px solid #ccc);
  border-left: var(--border-left, 0);

  // Remove border left.
  &:nth-of-type(6n + 1) {
    border-left: 0;
  }
`;

BrndSportcenterToday.propTypes = {
  templateClasses: PropTypes.arrayOf(PropTypes.string),
  templateRootStyle: PropTypes.shape({}),
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      bookingcode: PropTypes.string.isRequired,
      remarks: PropTypes.string,
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number,
      complex: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      facility: PropTypes.string.isRequired,
      activity: PropTypes.string.isRequired,
      team: PropTypes.string,
      status: PropTypes.string.isRequired,
      checkIn: PropTypes.bool,
      bookingBy: PropTypes.string.isRequired,
      changingRooms: PropTypes.string,
    })
  ).isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    mediaContain: PropTypes.bool,
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default BrndSportcenterToday;
