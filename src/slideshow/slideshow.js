import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllMediaUrlsFromField, ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./slideshow.scss";

/**
 * Slideshow component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function Slideshow({ slide, content, run, slideDone, executionId }) {
  const {
    images,
    imageDuration = 5000,
    transitions,
    animations,
    // @TODO: Add when logo is available from theme
    // , logoEnabled, logoSize, logoPosition
  } = content;
  const [index, setIndex] = useState(0);
  const fadeEnabled = transitions === "fade";
  const fadeDuration = 1000;
  const [fade, setFade] = useState(false);

  // Map images to mediaData.
  const imageUrls = getAllMediaUrlsFromField(slide.mediaData, images);

  const animationName = "animationForImage";
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(
    imageDuration + fadeDuration
  );

  const timeoutRef = useRef(null);
  const fadeRef = useRef(null);

  // @TODO: Get logo from theme.
  // const logoImageUrl = null;
  // const logoClasses = `logo ${logoPosition} ${logoSize}`;

  /**
   * A random function to simplify the code where random is used
   *
   * @param {number} multiplier The multiplier.
   * @returns {number} Random number.
   */
  function random(multiplier) {
    return Math.floor(Math.random() * multiplier);
  }

  /**
   * Creates the animation
   *
   * @param {boolean} grow Grow boolean.
   * @param {string} transform The transform.
   * @returns {string} The animation.
   */
  function createAnimation(grow, transform = "50% 50%") {
    const transformOrigin = transform;
    const startSize = grow ? 1 : 1.2;
    const finishSize = grow ? 1.2 : 1;

    return `@keyframes ${animationName} {
      0% {
        transform: scale(${startSize});
        transform-origin: ${transformOrigin};
      }
      5% {
        transform: scale(${startSize});
        transform-origin: ${transformOrigin};
      }
      95% {
        transform: scale(${finishSize});
        transform-origin: ${transformOrigin};
      }
      100% {
        transform: scale(${finishSize});
        transform-origin: ${transformOrigin};
      }
    }`;
  }

  /**
   * Determines which animation should be used
   *
   * @param {string} animationType The animation type.
   * @returns {string} The current animation.
   */
  function getCurrentAnimation(animationType) {
    const animationTypes = [
      "zoom-in-middle",
      "zoom-out-middle",
      "zoom-out-random",
      "zoom-in-random",
    ];

    const randomPercent = `${random(100) + 1}% ${random(100) + 1}%`;

    switch (animationType) {
      case "zoom-in-middle":
        return createAnimation(true);
      case "zoom-out-middle":
        return createAnimation(false);
      case "zoom-in-random":
        return createAnimation(true, randomPercent);
      case "zoom-out-random":
        return createAnimation(false, randomPercent);
      default:
      case "random":
        return getCurrentAnimation(
          animationTypes[random(animationTypes.length)]
        );
    }
  }

  // Setup animation
  useEffect(() => {
    if (animations !== null) {
      // Adds the animation to the stylesheet. because there is an element of random, we cannot have it in the .scss file.
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(
        getCurrentAnimation(animations),
        styleSheet.cssRules.length
      );
    }
  }, []);

  // Get image style for the given image url.
  const getImageStyle = (imageUrl, animation, localAnimationDuration) => {
    const imageStyle = {
      backgroundImage: `url(${imageUrl})`,
    };

    if (animation) {
      imageStyle.animation = `${animationName} ${localAnimationDuration}ms`;
    }

    return imageStyle;
  };

  // Setup image progress.
  useEffect(() => {
    if (run) {
      if (imageUrls.length > 0) {
        timeoutRef.current = setTimeout(() => {
          const newIndex = index + 1;

          if (newIndex > imageUrls.length - 1) {
            // No more images to show.
            slideDone(slide);
          } else if (fadeEnabled) {
            // Fade to next image.
            setFade(true);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDuration + fadeDuration * 2);
            fadeRef.current = setTimeout(() => {
              setFade(false);
              setIndex(newIndex);
            }, fadeDuration);
          } else {
            // Change to next.
            setIndex(newIndex);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDuration);
          }
        }, imageDuration);
      } else {
        // If there are no images in slide, wait for 2s before continuing to avoid crashes.
        setTimeout(() => {
          slideDone(slide);
        }, 2000);
      }
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(fadeRef.current);
    };
  }, [run, index]);

  return (
    <>
      <div className="template-slideshow">
        {imageUrls &&
          imageUrls.map((imageUrl, imageUrlIndex) => {
            const className = "fade-container";
            const current = imageUrlIndex === index;
            const containerStyle = {
              opacity: 0,
              zIndex: imageUrls.length - imageUrlIndex,
            };

            if (current) {
              if (fade) {
                // Fade out current slide.
                containerStyle.animation = `fadeOut ${fadeDuration}ms`;
              } else {
                containerStyle.opacity = 1;
              }
            } else if (imageUrlIndex === index + 1) {
              if (fade) {
                // Fade in next slide.
                containerStyle.animation = `fadeIn ${fadeDuration}ms`;
              }
            }

            return (
              <div
                className={className}
                key={imageUrl}
                data-index={imageUrlIndex}
                style={containerStyle}
                data-active={current}
              >
                <div
                  style={getImageStyle(
                    imageUrl,
                    animationIndex === imageUrlIndex,
                    animationDuration
                  )}
                  className="image"
                />
              </div>
            );
          })}
      </div>

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
    </>
  );
}

Slideshow.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    imageDuration: PropTypes.number,
    logoEnabled: PropTypes.bool,
    logoSize: PropTypes.string,
    logoPosition: PropTypes.string,
    animations: PropTypes.string,
    transitions: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Slideshow;
