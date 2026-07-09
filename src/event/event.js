import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import { ThemeStyles } from "../slide-util";
import useElementSize from "../use-element-size";
import "../global-styles.css";
import "../shared/fonts/kbh/font.scss";
import "./event.scss";

/**
 * Event details component.
 *
 * @param {object} props Props.
 * @param {string} props.title The title.
 * @param {string} props.subTitle The subtitle.
 * @returns {JSX.Element} The component.
 */
function EventDetails({ title, subTitle }) {
  return (
    <div className="event-details">
      <div className="event-details__title">
        <h1>{title}</h1>
      </div>
      {subTitle && (
        <div className="event-details__sub-title">
          <h2>{subTitle}</h2>
        </div>
      )}
    </div>
  );
}

EventDetails.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

/**
 * Event component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function Event({ slide, content, run, slideDone, executionId }) {
  const ref = useRef(null);
  const { width, height } = useElementSize(ref);

  let layout = "horizontal";
  if (height > 0 && width > 0 && height / width > 0.8) {
    layout = "vertical";
  }

  const {
    host,
    startDate,
    endDate,
    title,
    subTitle,
    image,
    duration = 10000,
    showLogo = true,
  } = content;

  const bgColor = content.bgColor || "#000c2e";
  const textColor = content.textColor || "#fff";
  const logo = slide?.theme?.logo;
  const logoUrl = showLogo && logo?.assets?.uri ? logo.assets.uri : "";

  const rootClasses = [
    "template-event",
    "event",
    `layout-${layout}`,
    showLogo && logoUrl && "with-logo",
  ].filter(Boolean);

  const rootStyle = {
    backgroundColor: bgColor,
    color: textColor,
    "--width": width,
    "--height": height,
  };

  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  const dateBlock = (
    <div className="event__date">
      {startDate && <span>{startDate}</span>}
      {endDate && <span>{endDate}</span>}
    </div>
  );

  const logoBlock = showLogo && logoUrl && (
    <div className="event__logo">
      <img src={logoUrl} alt="" />
    </div>
  );

  if (layout === "vertical") {
    return (
      <>
        <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
          <div className="event-top">
            <div className="event-top__text">
              {host && <div className="event__host event-top__host">{host}</div>}
              {dateBlock}
            </div>
            {logoBlock}
          </div>
          {image && (
            <div className="event-top__image">
              <img src={image} alt="" />
            </div>
          )}
          <EventDetails title={title} subTitle={subTitle} />
        </div>
        <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
      </>
    );
  }

  return (
    <>
      <div ref={ref} className={rootClasses.join(" ")} style={rootStyle}>
        {image && (
          <div className="event__image">
            <img src={image} alt="" />
          </div>
        )}
        <div className="event-info">
          <div className="event-info__top">
            <div className="event-top__text">
              {host && <div className="event__host event-info__host">{host}</div>}
              {dateBlock}
            </div>
            {logoBlock}
          </div>
          <EventDetails title={title} subTitle={subTitle} />
        </div>
      </div>
      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </>
  );
}

Event.propTypes = {
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
    host: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    image: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    duration: PropTypes.number,
    showLogo: PropTypes.bool,
  }).isRequired,
};

export default Event;
