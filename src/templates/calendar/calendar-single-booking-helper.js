import styled from "styled-components";
import dayjs from "dayjs";
import React from "react";
import IconCalendarPlus from "./icon-calendar-plus.svg";
import { renderTimeOfDayFromUnixTimestamp } from "./helper";

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

const renderFutureEvents = (eventsToRender, getTitle) => {
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

const instantBookingKey = "instantBookings";

const getInstantBookingFromLocalStorage = (slideId) => {
  const localstorageEntry = localStorage.getItem(instantBookingKey);

  if (localstorageEntry === null) {
    return null;
  }

  const instantBookings = JSON.parse(localstorageEntry);

  return instantBookings[slideId];
};

const setInstantBookingFromLocalStorage = (slideId, value) => {
  const localstorageEntry = localStorage.getItem(instantBookingKey);

  const instantBookings =
    localstorageEntry !== null ? JSON.parse(localstorageEntry) : {};

  if (value !== null) {
    instantBookings[slideId] = value;
  } else {
    delete instantBookings[slideId];
  }

  localStorage.setItem(instantBookingKey, JSON.stringify(instantBookings));
};

export {
  Wrapper,
  Header,
  RoomInfo,
  Title,
  IconCalendarPlusWrapper,
  Content,
  ContentItem,
  Meta,
  Button,
  Time,
  Date,
  DateTime,
  StatusText,
  StatusIcon,
  Status,
  SubTitle,
  ButtonWrapper,
  renderFutureEvents,
  getInstantBookingFromLocalStorage,
  setInstantBookingFromLocalStorage,
};
