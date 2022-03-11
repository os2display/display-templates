import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";

/**
 * IFrame component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function IFrame({ slide, content, run, slideDone }) {
  const { source, duration } = content;

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  return (
    <>
      <iframe
        title="iframe title"
        sandbox="allow-same-origin allow-scripts"
        frameBorder="0"
        scrolling="no"
        src={source}
        width="100%"
        height="100%"
      />
    </>
  );
}

IFrame.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    source: PropTypes.string,
  }).isRequired,
};

export default IFrame;
