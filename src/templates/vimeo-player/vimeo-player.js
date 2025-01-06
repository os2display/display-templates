import React, { useEffect } from "react";
import Vimeo from "@u-wave/react-vimeo"; // eslint-disable-line import/no-unresolved
import PropTypes from "prop-types";
import BaseSlideExecution from "../../base-slide-execution";
import { ThemeStyles } from "../../slide-util";
import "../../global-styles.css";
import "./vimeo.scss";

/**
 * Vimeo Player component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function VimeoPlayer({ slide, content, run, slideDone, executionId }) {
  const { vimeoid, duration = 15000, mediaContain } = content;

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
      <div className="template-vimeo-player">
        <Vimeo
          video={vimeoid}
          responsive
          autoplay
          muted
          controls={false}
          paused={false}
          loop
          className={`vimeo-player${mediaContain ? " media-contain" : ""}`}
        />
      </div>
      <ThemeStyles id={executionId} css={slide?.themeData?.cssStyles} />
    </>
  );
}

VimeoPlayer.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    themeData: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    vimeoid: PropTypes.string,
    mediaContain: PropTypes.bool,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default VimeoPlayer;
