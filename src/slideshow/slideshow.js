import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllMediaUrlsFromField,
  getFirstMediaUrlFromField,
  ThemeStyles,
} from "../slide-util";
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
 * @returns {JSX.Element} The component.
 */
function Slideshow({ slide, content, run, slideDone, executionId }) {
  const { images, imageDuration = 5, transition, animation } = content;
  const [index, setIndex] = useState(0);
  const fadeEnabled = transition === "fade";
  const fadeDuration = 1000;
  const [fade, setFade] = useState(false);
  const imageDurationInMilliseconds = imageDuration * 1000;
  // Map images to mediaData.
  const imageUrls = getAllMediaUrlsFromField(slide.mediaData, images);

  const animationName = "animationForImage";
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(
    imageDurationInMilliseconds + fadeDuration
  );

  const logo = slide?.themeData?.logo;
  const { showLogo, logoSize, logoPosition, logoMargin } = content;

  let logoUrl = "";
  // If showlogo is set, get the logo url
  if (logo && showLogo) {
    logoUrl = getFirstMediaUrlFromField(slide.mediaData, [logo]);
  }

  const logoClasses = ["logo"];

  if (logoMargin) {
    logoClasses.push("logo-margin");
  }
  if (logoSize) {
    logoClasses.push(logoSize);
  }
  if (logoPosition) {
    logoClasses.push(logoPosition);
  }

  const timeoutRef = useRef(null);
  const fadeRef = useRef(null);

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
      case "random":
        return getCurrentAnimation(
          animationTypes[random(animationTypes.length)]
        );
      default:
        return null;
    }
  }

  // Setup animation
  useEffect(() => {
    if (animation !== null) {
      // Adds the animation to the stylesheet. because there is an element of random, we cannot have it in the .scss file.
      const styleSheet = document.styleSheets[0];
      const currentAnimation = getCurrentAnimation(animation);
      if (currentAnimation !== null) {
        styleSheet.insertRule(
          getCurrentAnimation(animation),
          styleSheet.cssRules.length
        );
      }
    }
  }, []);

  // Get image style for the given image url.
  const getImageStyle = (imageUrl, localAnimation, localAnimationDuration) => {
    const imageStyle = {
      backgroundImage: `url(${imageUrl})`,
    };

    if (localAnimation) {
      imageStyle.animation = `${animationName} ${localAnimationDuration}ms`;
    }

    return imageStyle;
  };
  // Setup image progress.
  useEffect(() => {
    if (run) {
      if (imageUrls.length > 0) {
        timeoutRef.current = setTimeout(() => {
          let newIndex = index + 1;
          if (newIndex === imageUrls.length) {
            newIndex = 0;
            // No more images to show.
            slideDone(slide);
          }
          if (fadeEnabled) {
            // Fade to next image.
            setFade(true);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDurationInMilliseconds + fadeDuration * 2);
            fadeRef.current = setTimeout(() => {
              setFade(false);
              setIndex(newIndex);
            }, fadeDuration);
          } else {
            // Change to next.
            setIndex(newIndex);
            setAnimationIndex(newIndex);
            setAnimationDuration(imageDurationInMilliseconds);
          }
        }, imageDurationInMilliseconds);
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

        {showLogo && logoUrl && (
          <img className={logoClasses.join(" ")} src={logoUrl} alt="" />
        )}
      </div>

      <ThemeStyles id={executionId} css={slide?.themeData?.cssStyles} />
    </>
  );
}

Slideshow.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
    themeData: PropTypes.shape({
      cssStyles: PropTypes.string,
      logo: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    imageDuration: PropTypes.number,
    animation: PropTypes.string,
    transition: PropTypes.string,
    showLogo: PropTypes.bool,
    logoSize: PropTypes.string,
    logoMargin: PropTypes.bool,
    logoPosition: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Slideshow;
