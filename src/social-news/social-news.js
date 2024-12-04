import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import QRCode from "qrcode";
import { ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./social-news.scss";

/**
 * Social news slide.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function SocialNews({ slide, content, run, slideDone, executionId }) {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const [currentPost, setCurrentPost] = useState(null);
  const [qr, setQr] = useState(null);

  // Animation
  const [show, setShow] = useState(true);
  const animationDuration = 1500;

  const { feedData = [] } = slide;
  const { mediaContain, readMore } = content;

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

  useEffect(() => {
    if (currentPost) {
      QRCode.toDataURL(currentPost.link, {
        color: {
          dark: "#000000",
          light: "#ff000000",
          errorCorrectionLevel: "H",
        },
      }).then((data) => {
        setQr(data);
      });
    }
  }, [currentPost]);

  return (
    <>
      {currentPost && (
        <div className={`template-social-news ${show ? "show" : "hide"}`}>
          <div className="media-section">
            <div
              className={`image ${mediaContain ? "media-contain" : ""}`}
              style={{
                backgroundImage: `url("${currentPost.image}")`,
                ...(show
                  ? { animation: `fade-in ${animationDuration}ms` }
                  : { animation: `fade-out ${animationDuration}ms` }),
              }}
            />
          </div>
          <div className="text-section">
            <h1 className="title">{currentPost.title}</h1>
            <div className="author">
              {dayjs(currentPost.date).locale(localeDa).format("ll")} ▪{" "}
              {currentPost.author}
            </div>
            <div className="description">{currentPost.content}</div>
          </div>
          <div className="extra-section">
            {qr && <img src={qr} alt="QR code link" className="qr" />}
            <div className="read-more">{readMore ?? "Læs hele nyheden"}</div>
            <div className="link">{currentPost.link}</div>
          </div>
        </div>
      )}

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </>
  );
}

SocialNews.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
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
    mediaContain: PropTypes.bool,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default SocialNews;
