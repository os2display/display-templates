import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import IconCheck from "./icon-check.svg";
import IconExclamation from "./icon-exclamation.svg";
import IconCalendarPlus from "./icon-calendar-plus.svg";

/**
 * Single resource calendar with booking.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The content.
 * @param {Array} props.calendarEvents - The calendar events.
 * @param {Array} props.templateClasses - The template classes.
 * @param {object} props.templateRootStyle - The template root style.
 * @param {Function} props.getTitle - Function to get title for event.
 * @param {object} props.slide - The slide.
 * @returns {JSXElement} - The component.
 */
function CalendarSingleBooking({
  content,
  calendarEvents,
  templateClasses,
  templateRootStyle,
  getTitle,
  slide,
}) {
  const { title = "", subTitle = null } = content;

  // Get values from client localstorage.
  const token = localStorage.getItem("apiToken");
  const tenantKey = localStorage.getItem("tenantKey");
  const apiUrl = localStorage.getItem("apiUrl");

  const [bookableIntervals, setBookableIntervals] = useState([]);
  const [fetchingIntervals, setFetchingIntervals] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [bookingResult, setBookingResult] = useState(null);
  const [processingBooking, setProcessingBooking] = useState(false);

  const fetchBookingIntervals = () => {
    if (!apiUrl || !slide || !token || !tenantKey) {
      console.info(
        "Required values not available. Aborting getting booking intervals."
      );
      setFetchingIntervals(false);
      return;
    }

    if (fetchingIntervals) {
      console.info("Already fetching intervals...");
      return;
    }

    setFetchingIntervals(true);

    const resources = slide?.feed?.configuration?.resources ?? [];

    if (resources.length === 1) {
      fetch(`${apiUrl}${slide["@id"]}/action`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Authorization-Tenant-Key": tenantKey,
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          implementationClass: "App\\Interactive\\MicrosoftGraphQuickBook",
          action: "ACTION_GET_QUICK_BOOK_OPTIONS",
          data: {
            resource: resources[0],
          },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setBookableIntervals(
            data.filter((interval) => interval.available === true)
          );
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setFetchingIntervals(false);
        });
    }
  };

  const renderTimeOfDayFromUnixTimestamp = (unixTimestamp) =>
    dayjs(unixTimestamp * 1000)
      .locale(localeDa)
      .format("HH:mm");

  const renderFutureEvents = (eventsToRender) => {
    const now = dayjs();
    const elements = [];

    if (eventsToRender.length > 0) {
      eventsToRender
        .filter(
          (e) => e.endTime > now.unix() && e.endTime <= now.endOf("day").unix()
        )
        .forEach((event) => {
          if (elements.length < 3) {
            elements.push(
              <ContentItem key={event.id} className="content-item">
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

  useEffect(() => {
    // Imports language strings, sets localized formats.
    dayjs.extend(localizedFormat);

    fetchBookingIntervals();

    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 5000);

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, []);

  const clickInterval = (interval) => {
    if (!apiUrl || !slide || !token || !tenantKey) {
      console.info("Required values not available. Aborting create booking.");
      return;
    }

    setProcessingBooking(true);

    fetch(`${apiUrl}${slide["@id"]}/action`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Authorization-Tenant-Key": tenantKey,
        "Content-Type": "application/ld+json",
      },
      body: JSON.stringify({
        implementationClass: "App\\Interactive\\MicrosoftGraphQuickBook",
        action: "ACTION_QUICK_BOOK",
        data: {
          interval,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setBookingResult(data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setProcessingBooking(false);
      });
  };

  const currentEvents = calendarEvents.filter(
    (cal) =>
      cal.startTime <= currentTime.unix() && cal.endTime >= currentTime.unix()
  );

  const futureEvents = calendarEvents.filter(
    (el) => !currentEvents.includes(el)
  );

  const roomInUse = currentEvents.length > 0;

  const roomAvailableForInstantBooking =
    !roomInUse && fetchingIntervals ? null : bookableIntervals?.length > 0;

  const headerColor = roomInUse
    ? "var(--color-red-900)"
    : "var(--color-green-900)";

  const dateTimeColor = roomInUse
    ? "var(--color-red-50)"
    : "var(--color-green-50)";

  return (
    <Wrapper
      className={`calendar-single-booking ${templateClasses.join(" ")}`}
      style={templateRootStyle}
    >
      <Header
        style={{
          backgroundColor: headerColor,
        }}
      >
        <RoomInfo>
          {subTitle && <SubTitle className="subtitle">{subTitle}</SubTitle>}
          <Title className="title">{title}</Title>
        </RoomInfo>
        <Status>
          <StatusIcon>
            {roomInUse ? (
              <IconExclamation style={{ color: "var(--color-red-600)" }} />
            ) : (
              <IconCheck style={{ color: "var(--color-green-600)" }} />
            )}
          </StatusIcon>
          <StatusText>
            {roomInUse ? (
              <FormattedMessage id="room_in_use" defaultMessage="Optaget" />
            ) : (
              <FormattedMessage id="room_available" defaultMessage="Ledigt" />
            )}
          </StatusText>
        </Status>
        <DateTime
          style={{
            backgroundColor: dateTimeColor,
          }}
        >
          <Date>{currentTime.locale(localeDa).format("dddd D. MMMM")}</Date>
          <Time>{currentTime.locale(localeDa).format("HH:mm")}</Time>
        </DateTime>
      </Header>
      <Content className="content">
        {roomInUse &&
          currentEvents.map((event) => (
            <ContentItem key={event.id} className="content-item">
              <Meta>
                {renderTimeOfDayFromUnixTimestamp(event.startTime)}
                {" - "}
                {renderTimeOfDayFromUnixTimestamp(event.endTime)}
              </Meta>
              <h1>{getTitle(event.title)}</h1>
            </ContentItem>
          ))}
        {!roomInUse && (
          <>
            <ContentItem className="content-item">
              {!processingBooking && !bookingResult && (
                <>
                  {fetchingIntervals && (
                    <p>
                      <FormattedMessage
                        id="instant_booking_checking"
                        defaultMessage="Undersøger om lokalet kan straksbookes..."
                      />
                    </p>
                  )}
                  {!fetchingIntervals && roomAvailableForInstantBooking && (
                    <>
                      <h1>
                        <FormattedMessage
                          id="instant_booking_available"
                          defaultMessage="Lokalet er ledigt"
                        />
                      </h1>
                      <p>
                        <FormattedMessage
                          id="instant_booked_available_text"
                          defaultMessage="Straksbook lokalet. Vælg varighed."
                        />
                      </p>
                      <ButtonWrapper>
                        {bookableIntervals.map((interval) => (
                          <Button
                            key={interval.title}
                            onClick={() => clickInterval(interval)}
                          >
                            <IconCalendarPlusWrapper />
                            <span>{interval.title}</span>
                          </Button>
                        ))}
                      </ButtonWrapper>
                    </>
                  )}
                  {!fetchingIntervals && !roomAvailableForInstantBooking && (
                    <p>
                      <FormattedMessage
                        id="instant_booked_not_available"
                        defaultMessage="Straksbooking ikke tilgængeligt"
                      />
                    </p>
                  )}
                </>
              )}
              {processingBooking && !bookingResult && (
                <p>
                  <FormattedMessage
                    id="instant_booking_processing"
                    defaultMessage="Booker lokale..."
                  />
                </p>
              )}
              {bookingResult?.status === 201 && (
                <p>
                  <FormattedMessage
                    id="instant_booked_until"
                    defaultMessage="Lokalet er straksbooket indtil"
                  />{" "}
                  {dayjs(bookingResult.interval.to)
                    .locale(localeDa)
                    .format("HH:mm")}
                </p>
              )}
            </ContentItem>
          </>
        )}
        {futureEvents.length > 0 && (
          <>
            <h3>
              <FormattedMessage
                id="coming_events"
                defaultMessage="Kommende begivenheder"
              />
            </h3>
            {renderFutureEvents(futureEvents)}
          </>
        )}
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
  overflow: hidden;
`;

const Header = styled.div`
  /* Header styling */
  display: flex;
`;

const RoomInfo = styled.div`
  /* RoomInfo styling */
  padding: calc(var(--padding-size-base) * 2);
  flex-grow: 2;
  color: var(--text-light);
`;

const Title = styled.div`
  font-size: var(--h2-font-size);
  font-weight: var(--font-weight-bold);
`;

const SubTitle = styled.div`
  font-size: calc(var(--font-size-base) * 1.25);
`;

const Status = styled.div`
  /* Status styling */
  padding: var(--padding-size-base);
  padding-right: calc(var(--padding-size-base) * 3);
  display: flex;
  column-gap: var(--spacer);
  align-items: center;
`;

const StatusIcon = styled.div`
  /* StatusIcon styling */
  height: var(--h2-font-size);
  width: var(--h2-font-size);
`;

const StatusText = styled.div`
  /* StatusText styling */
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
  color: var(--text-light);
`;

const DateTime = styled.div`
  /* DateTime styling */
  flex-basis: 25%;
  text-align: right;
  padding: var(--padding-size-base);
  color: var(--text-dark);
`;

const Date = styled.div`
  /* Date styling */
  font-size: calc(var(--font-size-base) * 1.25);
  text-transform: capitalize;
`;

const Time = styled.div`
  /* Time styling */
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight-bold);
`;

const ButtonWrapper = styled.div`
  /* ButtonWrapper styling */
  display: flex;
  column-gap: calc(var(--spacer) * 2);
`;

const Button = styled.button`
  /* Button styling */
  display: flex;
  column-gap: var(--spacer);
  font-size: var(--font-size-base);
  white-space: nowrap;
  align-items: center;
  padding: calc(var(--font-size-base) * 0.75) calc(var(--font-size-base) * 1.75);
  background-color: var(--color-green-600);
  border-color: var(--color-green-600);
  border-radius: var(--border-radius-md);
  border-style: solid;
  color: var(--text-light);
`;

const IconCalendarPlusWrapper = styled(IconCalendarPlus)`
  /* IconCalendarPlus styling */
  width: var(--font-size-xl);
  height: var(--font-size-xl);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: calc(var(--padding-size-base) * 2);
`;

const ContentItem = styled.div`
  border-left: calc(var(--border-size) * 2) var(--border-style)
    var(--text-color);
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

CalendarSingleBooking.defaultProps = {
  templateClasses: [],
  templateRootStyle: {},
};

CalendarSingleBooking.propTypes = {
  slide: PropTypes.shape({
    "@id": PropTypes.string.isRequired,
    feed: PropTypes.shape({
      configuration: PropTypes.shape({
        resources: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }).isRequired,
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
  }).isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default CalendarSingleBooking;
