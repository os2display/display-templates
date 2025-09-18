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
      )}`}
    >
      <Header className="header" style={templateRootStyle}>
        <HeaderDate className="header-date">
          {currentDate &&
            capitalize(
              dayjs().locale(localeDa).format("dddd D. MMMM HH:mm")
            )}
        </HeaderDate>
      </Header>

      <Title className="title">{title}</Title>

      <Content className="schedule">
        <ContentItemsWrapper className="schedule-header">
          <ContentHeaderItem className="schedule-header-item">
            <FormattedMessage id="when" defaultMessage="Tid" />
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            <FormattedMessage id="booking-by" defaultMessage="Booket af" />
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            <FormattedMessage id="facility" defaultMessage="Facilitet" />
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            <FormattedMessage id="activity" defaultMessage="Aktivitet" />
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            <FormattedMessage id="remarks" defaultMessage="Bemærkning" />
          </ContentHeaderItem>
        </ContentItemsWrapper>
        <ContentItemsWrapper className="schedule-rows">
          {bookings?.length > 0 &&
            getSortedBookings(bookings).map((entry) => {
              const returnFragment = (
                <Fragment key={entry.bookingcode}>
                  <ContentItem className="content-item content-item-time">
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
                  <ContentItem className=" content-item content-item-booking-by">
                    {getTitle(entry.bookingBy)}
                  </ContentItem>
                  <ContentItem className="content-item content-item-facility">
                    {getTitle(entry.facility)}
                  </ContentItem>
                  <ContentItem className="content-item content-item-activity">
                    {getTitle(entry.activity)}
                  </ContentItem>
                  <ContentItem className="content-item content-item-remarks">
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
  color: var(--color-white);
  display: grid;
  grid-template-areas:
    "header"
    "title"
    "content";
  grid-template-rows: auto auto 1fr;
  padding: var(--padding-size-base);
`;

const Header = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-image: var(--bg-image, none);
  background-color: var(--color-white);
  padding: var(--padding-size-base);
  grid-area: header;
  display: flex;
  justify-content: flex-end; // Aligns HeaderDate to the right
  align-content: center;
`;

const HeaderDate = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-light);
`;

const Title = styled.div`
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-light);
  padding: var(--padding-size-base);
  text-align: center;
`;

const Content = styled.div`
  grid-area: content;
`;

const ContentItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const ContentItem = styled.div`
  padding: var(--padding-size-base);
  border-bottom: 1px solid var(--color-grey-600);
`;

const ContentHeaderItem = styled.div`
  padding: var(--padding-size-base);
  font-weight: var(--font-weight-bold);
  border-bottom: 1px solid var(--color-grey-600);
  border-top: 1px solid var(--color-grey-600);
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
      status: PropTypes.string.isRequired,
      checkIn: PropTypes.bool,
      bookingBy: PropTypes.string.isRequired,
      changingRooms: PropTypes.string,
    })
  ).isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default BrndSportcenterToday;
