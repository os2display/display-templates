import React, { createRef, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import BaseSlideExecution from "../base-slide-execution";
import { getAllMediaUrlsFromField, ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./image-text.scss";

/**
 * ImageText component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function ImageText({ slide, content, run, slideDone, executionId }) {
  const imageTimeoutRef = useRef();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  const [themeCss, setThemeCss] = useState(null);

  // Set theme styles.
  useEffect(() => {
    if (slide?.themeData?.css) {
      setThemeCss(<ThemeStyles id={executionId} css={slide?.themeData?.css} />);
    }
  }, [slide]);

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

  let boxClasses = "box";

  // Styling objects
  const rootStyle = {};
  const imageTextStyle = {};

  // Content from content
  const {
    title,
    text,
    textColor,
    boxColor,
    backgroundColor,
    duration = 15000,
  } = content;

  const sanitizedText = DOMPurify.sanitize(text);

  // Display separator depends on whether the slide is reversed.
  const displaySeparator = separator && !reversed;

  // Set background image.
  if (!(images?.length > 0)) {
    boxClasses = `${boxClasses} full-screen`;
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

  const rootClasses = ["template-image-text", fontSize];

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

  const changeImage = (newIndex) => {
    if (newIndex < images.length) {
      setCurrentImage(images[newIndex]);

      if (newIndex < images.length - 1) {
        imageTimeoutRef.current = setTimeout(
          () => changeImage(newIndex + 1),
          duration / images.length
        );
      }
    }
  };

  useEffect(() => {
    if (slide?.mediaData) {
      const imageUrls = getAllMediaUrlsFromField(
        slide.mediaData,
        content.image
      );

      if (imageUrls?.length > 0) {
        const newImages = imageUrls.map((url) => {
          return {
            url,
            nodeRef: createRef(),
          };
        });

        setImages(newImages);
      }
    }
  }, [slide]);

  useEffect(() => {
    if (images?.length > 0 && !currentImage) {
      setCurrentImage(images[0]);
    }
    if (images?.length > 1) {
      changeImage(0);
    }
  }, [images]);

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);

  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();

      if (imageTimeoutRef.current) {
        clearTimeout(imageTimeoutRef.current);
      }
    };
  }, [run]);

  return (
    <>
      <div className={rootClasses.join(" ")} style={rootStyle}>
        <TransitionGroup component={null}>
          {currentImage && (
            <CSSTransition
              key={currentImage.url}
              timeout={1000}
              nodeRef={currentImage.nodeRef}
              classNames="background-image"
            >
              <div
                style={{
                  backgroundImage: currentImage?.url
                    ? `url("${currentImage.url}")`
                    : "",
                }}
                ref={currentImage.nodeRef}
                className="background-image"
              />
            </CSSTransition>
          )}
        </TransitionGroup>
        {(title || text) && (
          <div className={boxClasses} style={imageTextStyle}>
            {title && (
              <h1>
                {title}
                {/* Todo theme the color of the below */}
                {displaySeparator && <div className="separator" />}
              </h1>
            )}
            {sanitizedText && (
              <div className="text">{parse(sanitizedText)}</div>
            )}
          </div>
        )}
      </div>
      {themeCss}
    </>
  );
}

ImageText.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.objectOf(PropTypes.any),
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
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
  executionId: PropTypes.string.isRequired,
};

export default ImageText;
