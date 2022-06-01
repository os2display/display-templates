import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { getAllMediaUrlsFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../global-styles";

/**
 * Video component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function Video({ slide, content, run, slideDone, executionId }) {
  const videoUrls = getAllMediaUrlsFromField(slide.mediaData, content.video);
  const videoRef = useRef();

  const onEnded = () => {
    slideDone(slide);
  };

  const onError = () => {
    slideDone(slide);
  };

  useEffect(() => {
    if (run) {
      videoRef?.current?.load();
      videoRef?.current?.addEventListener("ended", onEnded);
      videoRef?.current?.addEventListener("error", onError);

      const promise = videoRef.current.play();

      if (promise !== undefined) {
        promise
          .then(() => {})
          .catch(() => {
            if (videoRef?.current) {
              videoRef.current.controls = true;
            }
          });
      }
    }

    return () => {
      videoRef?.current?.removeEventListener("ended", onEnded);
      videoRef?.current?.removeEventListener("error", onError);
    };
  }, [run]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video width="100%" height="100%" ref={videoRef}>
        {videoUrls.map((url) => (
          <source key={url} src={url} />
        ))}
      </video>

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

Video.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.objectOf(PropTypes.any),
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    video: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Video;
