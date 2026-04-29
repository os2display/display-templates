import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

/**
 * BRND Idrætsanlæg dagsprogram.
 *
 * @param {object} props Component props.
 * @param {object} props.content Slide content.
 * @param {Array} props.bookings Booking entries.
 * @param {string[]} [props.templateClasses] Template class names. Default is `[]`.
 * @param {Function} props.getTitle Function to normalize displayed text.
 * @returns {JSX.Element} BRND Idrætsanlæg Dagsprogram layout.
 */
function BrndIdraetsanlaeg({
  content,
  bookings,
  templateClasses = [],
  getTitle
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { title = "" } = content;

  useEffect(() => {
    dayjs.extend(localizedFormat);
    const dateAndTimeInterval = setInterval(
      () => setCurrentDate(new Date()),
      1000
    );

    return () => clearInterval(dateAndTimeInterval);
  }, []);

  // Sort and keep only current/future bookings from today.
  const getSortedBookings = (data) => {
    const now = dayjs();

    return data
      .filter((entry) => {
        const startDate = dayjs(entry.startTime * 1000);

        return entry.endTime > now.unix() && startDate.date() === now.date();
      })
      .sort((a, b) => a.startTime - b.startTime);
  };

  const capitalize = (text) => {
    if (!text) {
      return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Wrapper
      className={`template-brnd brnd-idraetsanlaeg ${templateClasses.join(
        " "
      )}`}
    >
      <Title className="title">{title}</Title>
      <DateRow className="header-date">
        {currentDate &&
          capitalize(dayjs().locale(localeDa).format("dddd D. MMMM HH:mm"))}
      </DateRow>

      <Content className="schedule">
        <ContentItemsWrapper className="schedule-header">
          <ContentHeaderItem className="schedule-header-item">
            Hvornår
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            Hvor
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            Hvad
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            Hvem
          </ContentHeaderItem>
          <ContentHeaderItem className="schedule-header-item">
            Bemærkninger
          </ContentHeaderItem>
        </ContentItemsWrapper>

        <ContentItemsWrapper className="schedule-rows">
          {bookings?.length > 0 &&
            getSortedBookings(bookings).map((entry, rowIndex) => (
              <Fragment key={entry.bookingcode}>
                <ContentItem
                  className={`content-item content-item-time ${
                    rowIndex % 2 === 0 ? "row-even" : "row-odd"
                  }`}
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
                  className={`content-item content-item-area ${
                    rowIndex % 2 === 0 ? "row-even" : "row-odd"
                  }`}
                >
                  {getTitle(entry.area)}
                </ContentItem>
                <ContentItem
                  className={`content-item content-item-activity ${
                    rowIndex % 2 === 0 ? "row-even" : "row-odd"
                  }`}
                >
                  {getTitle(entry.activity)}
                </ContentItem>
                <ContentItem
                  className={`content-item content-item-booking-by ${
                    rowIndex % 2 === 0 ? "row-even" : "row-odd"
                  }`}
                >
                  {getTitle(entry.bookingBy)}
                </ContentItem>
                <ContentItem
                  className={`content-item content-item-remarks ${
                    rowIndex % 2 === 0 ? "row-even" : "row-odd"
                  }`}
                >
                  {entry.remarks ?? ""}
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
  font-size: var(--font-size-base);
  overflow: hidden;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--color-white);
  color: var(--color-white);
  display: grid;
  grid-template-areas:
    "title"
    "date"
    "content";
  grid-template-rows: auto auto 1fr;
  padding: 0;
`;

const DateRow = styled.div`
  grid-area: date;
  background-color: rgb(0, 12, 46);
  color: var(--color-white);
  text-align: center;
  padding: 0 calc(var(--padding-size-base) * 0.7)
    calc(var(--padding-size-base) * 0.7);
  font-size: var(--h4-font-size);
  font-weight: var(--font-weight-light);
`;

const Title = styled.div`
  background-color: rgb(0, 12, 46);
  font-size: var(--h4-font-size);
  font-weight: var(--font-weight-bold);
  text-align: center;
  text-transform: uppercase;
  color: var(--color-white);
  padding: calc(var(--padding-size-base) * 0.7);
`;

const Content = styled.div`
  background-color: rgb(0, 12, 46);
  grid-area: content;
`;

const ContentItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1fr 1.1fr 1.5fr 1.7fr;
`;

const ContentItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-black);
  padding: calc(var(--padding-size-base) * 0.55);

  &.row-even {
    background-color: #f1f3f5;
  }

  &.row-odd {
    background-color: var(--color-white);
  }
`;

const ContentHeaderItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-600);
  border-top: 1px solid var(--color-grey-600);
  background-color: rgb(0, 12, 46);
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  padding: calc(var(--padding-size-base) * 0.55);
`;

BrndIdraetsanlaeg.propTypes = {
  templateClasses: PropTypes.arrayOf(PropTypes.string),
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

export default BrndIdraetsanlaeg;
