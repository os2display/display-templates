import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { getAllMediaUrlsFromField, ThemeStyles } from "../slide-util";

/**
 * Video component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Video({ slide, content, run, slideDone }) {
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
          .then(() => {
            console.log("autoplay started");
          })
          .catch((error) => {
            console.log("autoplay blocked, enabling controls");
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
      <ThemeStyles name="template-video" css={slide?.themeData?.css} />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video width="100%" height="100%" ref={videoRef}>
        {videoUrls.map((url) => (
          <source key={url} src={url} />
        ))}
      </video>
    </>
  );
}

Video.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.objectOf(PropTypes.any),
    duration: PropTypes.number.isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    video: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Video;
