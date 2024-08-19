import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FormattedMessage } from "react-intl";
import IconCheck from "./icon-check.svg";
import IconExclamation from "./icon-exclamation.svg";
import {
  renderTimeOfDayFromUnixTimestamp,
  timeCountdownString,
} from "./helper";
import {
  Button,
  Content,
  ContentItem,
  DateTime,
  Header,
  IconCalendarPlusWrapper,
  Meta,
  RoomInfo,
  Status,
  StatusIcon,
  StatusText,
  SubTitle,
  Time,
  Title,
  Wrapper,
  Date,
  ButtonWrapper,
  getInstantBookingFromLocalStorage,
  setInstantBookingFromLocalStorage,
  renderFutureEvents,
} from "./calendar-single-booking-helper";

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
 * @param {string} props.run Whether or not the slide should start running.
 * @returns {React.JSX.Element} - The component.
 */
function CalendarSingleBooking({
  content,
  calendarEvents,
  templateClasses = [],
  templateRootStyle = {},
  getTitle,
  slide,
  run,
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
  const [secondsUntilNextEvent, setSecondsUntilNextEvent] = useState(null);
  const [bookingError, setBookingError] = useState(false);

  const fetchBookingIntervals = () => {
    if (!apiUrl || !slide || !token || !tenantKey) {
      setFetchingIntervals(false);
      return;
    }

    if (fetchingIntervals) {
      return;
    }

    const resources = slide?.feed?.configuration?.resources ?? [];

    if (resources.length === 1) {
      setFetchingIntervals(true);

      fetch(`${apiUrl}${slide["@id"]}/action`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Authorization-Tenant-Key": tenantKey,
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          implementationClass: "App\\InteractiveSlide\\InstantBook",
          action: "ACTION_GET_QUICK_BOOK_OPTIONS",
          data: {
            resource: resources[0],
          },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setBookableIntervals(
            data.options.map((option) => {
              return {
                resource: data.resource,
                from: data.from,
                to: option.to,
                durationMinutes: option.durationMinutes,
              };
            })
          );
        })
        .finally(() => {
          setFetchingIntervals(false);
        });
    }
  };

  const intervalChecking = () => {
    setCurrentTime(dayjs());

    // Find time until next event.
    const now = dayjs();
    let closestEvent = null;

    if (calendarEvents.length === 0) {
      setSecondsUntilNextEvent(null);
    } else {
      calendarEvents.forEach((event) => {
        const eventStartTime = dayjs(event.startTime * 1000);
        if (eventStartTime >= now) {
          if (
            closestEvent === null ||
            eventStartTime < dayjs(closestEvent.startTime * 1000)
          ) {
            closestEvent = event;
          }
        }
      });
    }

    if (closestEvent !== null) {
      setSecondsUntilNextEvent(closestEvent.startTime - now.unix());
    }

    const instantBooking = getInstantBookingFromLocalStorage(slide["@id"]);

    // Clean out old instantBookings.
    if (instantBooking) {
      if (dayjs(instantBooking.interval.to) < dayjs()) {
        setInstantBookingFromLocalStorage(slide["@id"], null);
        setBookingResult(null);
      } else {
        setBookingResult(instantBooking);
      }
    }
  };

  const clickInterval = (interval) => {
    if (!apiUrl || !slide || !token || !tenantKey) {
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
        implementationClass: "App\\InteractiveSlide\\InstantBook",
        action: "ACTION_QUICK_BOOK",
        data: {
          interval,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setBookingResult(data);
        setInstantBookingFromLocalStorage(slide["@id"], data);
      })
      .catch(() => {
        setBookingError(true);
        setTimeout(() => setBookingError(false), 10000);
      })
      .finally(() => {
        setProcessingBooking(false);
      });
  };

  useEffect(() => {
    // Imports language strings, sets localized formats.
    dayjs.extend(localizedFormat);

    intervalChecking();
    const interval = setInterval(intervalChecking, 5000);

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    fetchBookingIntervals();
  }, [run]);

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
              {!processingBooking && !bookingResult && !bookingError && (
                <>
                  {roomAvailableForInstantBooking && (
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
                            key={interval.durationMinutes}
                            onClick={() => clickInterval(interval)}
                          >
                            <IconCalendarPlusWrapper />
                            <span>{interval.durationMinutes} min</span>
                          </Button>
                        ))}
                      </ButtonWrapper>
                    </>
                  )}
                  {!roomAvailableForInstantBooking && (
                    <>
                      <p>
                        <FormattedMessage
                          id="instant_booked_not_available"
                          defaultMessage="Straksbooking ikke tilgængeligt"
                        />
                      </p>
                      <div style={{ fontSize: ".5em" }}>
                        {timeCountdownString(secondsUntilNextEvent)}
                      </div>
                    </>
                  )}
                </>
              )}
              {processingBooking && !bookingResult && !bookingError && (
                <p>
                  <FormattedMessage
                    id="instant_booking_processing"
                    defaultMessage="Booker lokale..."
                  />
                </p>
              )}
              {bookingError && (
                <p>
                  <FormattedMessage
                    id="instant_booking_error"
                    defaultMessage="Straksbooking fejlede. Prøv igen lidt senere."
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
            {renderFutureEvents(futureEvents, getTitle)}
          </>
        )}
      </Content>
    </Wrapper>
  );
}

CalendarSingleBooking.propTypes = {
  slide: PropTypes.shape({
    "@id": PropTypes.string.isRequired,
    feed: PropTypes.shape({
      configuration: PropTypes.shape({
        resources: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }).isRequired,
  run: PropTypes.string.isRequired,
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
