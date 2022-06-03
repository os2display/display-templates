import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import Shape from "./shape.svg";
import InstagramLogo from "./instagram-logo.svg";
import { ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./instagram-feed.scss";

/**
 * Sparkle component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function InstagramFeed({ slide, content, run, slideDone, executionId }) {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const [currentPost, setCurrentPost] = useState(null);

  // Animation
  const [show, setShow] = useState(true);
  const animationDuration = 1500;

  const { feedData = [] } = slide;
  const { hashtagText, orientation, imageWidth = null } = content;

  // @TODO: should duration depend on number of instagram posts to show?
  let { entryDuration: duration } = content;
  duration = (duration || 15) * 1000; // Add a default

  const { maxEntries = 5 } = content;

  /** Setup feed entry switch and animation, if there is more than one post. */
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = feedData.indexOf(currentPost);
      const nextIndex =
        (currentIndex + 1) % Math.min(feedData.length, maxEntries);

      if (nextIndex === 0) {
        slideDone(slide);
      } else {
        setCurrentPost(feedData[nextIndex]);
        setShow(true);
      }
    }, duration);

    const animationTimer = setTimeout(() => {
      setShow(false);
    }, duration - animationDuration);

    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
      if (animationTimer !== null) {
        clearInterval(animationTimer);
      }
    };
  }, [currentPost]);

  useEffect(() => {
    if (run) {
      if (feedData?.length > 0) {
        setCurrentPost(feedData[0]);
      } else {
        setTimeout(() => slideDone(slide), 1000);
      }
    }
  }, [run]);

  const getSanitizedMarkup = (textMarkup) => {
    return parse(DOMPurify.sanitize(textMarkup, {}));
  };

  const rootStyle = {};

  if (imageWidth !== null) {
    rootStyle["--percentage-wide"] = `${imageWidth}%`;
    rootStyle["--percentage-narrow"] = `${100 - imageWidth}%`;
  }

  return (
    <>
      {currentPost && (
        <div
          style={rootStyle}
          className={`template-instagram-feed ${orientation} ${
            show ? "show" : "hide"
          }`}
        >
          <div className="media-section">
            {!currentPost.videoUrl && (
              <div
                className="image"
                style={{
                  backgroundImage: `url("${currentPost.mediaUrl}")`,
                  ...(show
                    ? { animation: `fade-in ${animationDuration}ms` }
                    : { animation: `fade-out ${animationDuration}ms` }),
                }}
              />
            )}
            {currentPost.videoUrl && (
              <div className="video-container">
                <video muted="muted" autoPlay loop src={currentPost.videoUrl}>
                  <track kind="captions" />
                </video>
              </div>
            )}
          </div>
          <div className="author-section">
            <h1 className="author">{currentPost.username}</h1>
            <div className="date">
              {dayjs(currentPost.createdTime).locale(localeDa).fromNow()}
            </div>
            <div className="description">
              {getSanitizedMarkup(currentPost.textMarkup)}
            </div>
          </div>
          <div className="shape">
            <Shape />
          </div>
          <div className="brand">
            <InstagramLogo className="brand-icon" />
            <span className="brand-tag">{hashtagText}</span>
          </div>
        </div>
      )}

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
    </>
  );
}

InstagramFeed.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
    feedData: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        textMarkup: PropTypes.string,
        mediaUrl: PropTypes.string,
        videoUrl: PropTypes.string,
        username: PropTypes.string,
        createdTime: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  content: PropTypes.shape({
    hashtagText: PropTypes.string,
    orientation: PropTypes.string,
    entryDuration: PropTypes.number,
    maxEntries: PropTypes.number,
    imageWidth: PropTypes.number,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default InstagramFeed;
