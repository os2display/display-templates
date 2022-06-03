import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import { ThemeStyles } from "../slide-util";
import "../global-styles.css";

/**
 * IFrame component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function IFrame({ slide, content, run, slideDone, executionId }) {
  const { source, duration = 15000 } = content;

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
      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
    </>
  );
}

IFrame.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    source: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default IFrame;
