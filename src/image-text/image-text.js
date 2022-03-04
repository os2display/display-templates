import React, { useEffect } from "react";
import "./image-text.scss";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

/**
 * ImageText component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function ImageText({ slide, content, run, slideDone }) {
  // Styling from content
  const {
    separator,
    boxAlign,
    reversed,
    boxMargin,
    halfSize,
    fontSize,
    shadow,
  } = content || {};
  const boxClasses = fontSize ? `box ${fontSize}` : "box";
  const rootClasses = ["template-image-text"];

  // Styling objects
  const rootStyle = {};
  const imageTextStyle = {};

  // Content from content
  const { title, text, textColor, boxColor, backgroundColor } = content;
  const sanitizedText = DOMPurify.sanitize(text);

  // Duration
  const { duration = 15000 } = slide;

  // Display separator depends on whether the slide is reversed.
  const displaySeparator = separator && !reversed;

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

  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, content.image);

  // Set background image.
  if (imageUrl) {
    rootStyle.backgroundImage = `url("${imageUrl}")`;
  }

  // Set background color.
  if (backgroundColor) {
    rootStyle.backgroundColor = backgroundColor;
  }

  // Set box colors.
  if (boxColor) {
    imageTextStyle.backgroundColor = boxColor;
  }
  if (textColor) {
    imageTextStyle.color = textColor;
  }

  // Position text-box.
  if (boxAlign === "left" || boxAlign === "right") {
    rootClasses.push("column");
  }
  if (boxAlign === "bottom" || boxAlign === "right") {
    rootClasses.push("flex-end");
  }
  if (reversed) {
    rootClasses.push("reversed");
  }
  if (boxMargin || reversed) {
    rootClasses.push("box-margin");
  }
  if (halfSize && !reversed) {
    rootClasses.push("half-size");
  }
  if (separator && !reversed) {
    rootClasses.push("animated-header");
  }
  if (shadow) {
    rootClasses.push("shadow");
  }

  return (
    <>
      <div className={rootClasses.join(" ")} style={rootStyle}>
        {title && (
          <div className={boxClasses} style={imageTextStyle}>
            <h1>
              {title}
              {/* Todo theme the color of the below */}
              {displaySeparator && (
                <div
                  className="separator"
                  style={{ backgroundColor: "#ee0043" }}
                />
              )}
            </h1>
            {text && <div className="text">{parse(sanitizedText)}</div>}
          </div>
        )}
      </div>
      <ThemeStyles name="template-image-text" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

ImageText.propTypes = {
  run: PropTypes.string.isRequired,
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
    image: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    boxColor: PropTypes.string,
    styling: PropTypes.shape({
      // Accepted values: top, bottom, left, right.
      boxAlign: PropTypes.string,
      boxMargin: PropTypes.bool,
      separator: PropTypes.bool,
      reversed: PropTypes.bool,
      halfSize: PropTypes.bool,
      fontSize: PropTypes.string,
    }),
  }).isRequired,
};

export default ImageText;
