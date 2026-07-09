import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ThemeStyles } from "../slide-util";
import useElementSize from "../use-element-size";
import "../global-styles.css";
import "../shared/fonts/kbh/font.scss";
import "./event-list.scss";

/**
 * Build a stable React key for an event object.
 *
 * @param {object} event Event data.
 * @returns {string} Unique key.
 */
function getEventKey(event) {
  if (event.externalId) {
    return String(event.externalId);
  }

  return [event.title, event.startDate, event.host, event.image]
    .filter(Boolean)
    .join("|");
}

/**
 * Parse event list JSON data from slide content.
 *
 * @param {string} jsonData JSON string with event objects.
 * @returns {Array} Parsed events.
 */
function parseEventListJson(jsonData) {
  if (!jsonData) {
    return [];
  }

  try {
    const parsed = JSON.parse(jsonData);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Event list item component.
 *
 * @param {object} props Props.
 * @param {object} props.event Event data.
 * @param {string} props.layout Layout type.
 * @returns {JSX.Element} The component.
 */
function EventListItem({ event, layout }) {
  return (
    <div className="event-list-item">
      {event.image && <img src={event.image} alt="" />}
      <div className="event-list-item__content">
        <div className="event-list-item__top">
          <h3 className="event-list-item__title">{event.title}</h3>
          {layout === "horizontal" && event.subTitle && (
            <div className="event-list-item__sub-title">{event.subTitle}</div>
          )}
          {event.host && (
            <div className="event-list-item__host">{event.host}</div>
          )}
        </div>
        {event.startDate && (
          <div className="event-list-item__date">{event.startDate}</div>
        )}
      </div>
    </div>
  );
}

EventListItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    host: PropTypes.string,
    startDate: PropTypes.string,
    image: PropTypes.string,
    externalId: PropTypes.string,
  }).isRequired,
  layout: PropTypes.string.isRequired,
};

/**
 * Event list component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function EventList({ slide, content, run, slideDone, executionId }) {
  const ref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { width, height } = useElementSize(ref);

  let layout = "vertical";
  if (height > 0 && width > 0 && width / height > 1.2) {
    layout = "horizontal";
  }

  const { pageIntervalTime = 15000, jsonData, showLogo = true } = content;

  const bgColor = content.bgColor || "#000c2e";
  const logo = slide?.theme?.logo;
  const logoUrl = showLogo && logo?.assets?.uri ? logo.assets.uri : "";

  const events = parseEventListJson(jsonData);
  const postsPerPage = layout === "vertical" ? 4 : 3;
  const totalPages = Math.max(1, Math.ceil(events.length / postsPerPage));
  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const rootClasses = [
    "template-event-list",
    "event-list",
    `layout-${layout}`,
    showLogo && logoUrl && "with-logo",
  ].filter(Boolean);

  const rootStyle = {
    backgroundColor: bgColor,
    "--width": width,
    "--height": height,
  };

  useEffect(() => {
    if (!run) {
      setCurrentPage(1);
      return undefined;
    }

    if (events.length === 0) {
      const timeout = setTimeout(() => slideDone(slide), 1000);
      return () => clearTimeout(timeout);
    }

    const pageInterval = setInterval(() => {
      setCurrentPage((page) => {
        if (page < totalPages) {
          return page + 1;
        }

        slideDone(slide);
        return 1;
      });
    }, pageIntervalTime);

    return () => clearInterval(pageInterval);
  }, [run, events.length, totalPages, pageIntervalTime, slide, slideDone]);

  const logoBlock = showLogo && logoUrl && (
    <div className="event-list__logo">
      <img src={logoUrl} alt="" />
    </div>
  );

  if (events.length === 0) {
    return <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />;
  }

  if (layout === "vertical") {
    return (
      <>
        <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
          {logoBlock}
          <div className="event-list__items">
            {currentEvents.map((event) => (
              <EventListItem
                key={getEventKey(event)}
                event={event}
                layout={layout}
              />
            ))}
          </div>
        </div>
        <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
      </>
    );
  }

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        <div className="event-list__items">
          {currentEvents.map((event) => (
            <EventListItem
              key={getEventKey(event)}
              event={event}
              layout={layout}
            />
          ))}
        </div>
        {logoBlock}
      </div>
      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </>
  );
}

EventList.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  executionId: PropTypes.string.isRequired,
  slide: PropTypes.shape({
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
      logo: PropTypes.shape({
        assets: PropTypes.shape({
          uri: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  content: PropTypes.shape({
    jsonData: PropTypes.string,
    bgColor: PropTypes.string,
    pageIntervalTime: PropTypes.number,
    showLogo: PropTypes.bool,
  }).isRequired,
};

export default EventList;
