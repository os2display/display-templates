import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import "./slideshow.scss";
import { getAllMediaUrlsFromField } from "../slide-util";

/**
 * Slideshow component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Slideshow({ slide, content, run, slideDone }) {
  const {
    images,
    imageDuration = 5000,
    transitions,
    animations,
    // @TOOD: Add when logo is available from theme
    // , logoEnabled, logoSize, logoPosition
  } = content;
  const [animationName] = useState("animationForImage");
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const fade = transitions === "fade";
  const fadeDuration = 500; // @TODO: check if this is the correct number

  // @TODO: Get logo from theme.
  // const logoImageUrl = null;
  // const logoClasses = `logo ${logoPosition} ${logoSize}`;

  // Map images to mediaData.
  const imageUrls = getAllMediaUrlsFromField(slide.mediaData, images);

  // @TODO: Duration should not be based on a calculated number, but instead on going a full round of all the images.
  const duration = imageUrls.length * imageDuration;

  // If it does not fade, the opacity should just be 1.
  const [imageOneFadeContainerStyle, setImageOneFadeContainerStyle] = useState({
    opacity: 1,
  });

  // If it does not fade, the opacity should just be 1.
  const [imageTwoFadeContainerStyle, setImageTwoFadeContainerStyle] = useState({
    opacity: 0,
  });

  const [imageOneStyle, setImageOneStyle] = useState();
  const [imageTwoStyles, setImageTwoStyles] = useState();

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration !== 0 ? duration : 5000);
    } else {
      slideExecution.stop();
    }
  }, [run]);

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
        return getCurrentAnimation(
          animationTypes[random(animationTypes.length)]
        );
    }
  }

  // Setup animation
  useEffect(() => {
    // Adds the animation to the stylesheet. because there is an element of random, we cannot have it in the .scss file.
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      getCurrentAnimation(animations),
      styleSheet.cssRules.length
    );
  }, []);

  /** Sets animations and background images for image one. */
  function updateImageOne() {
    // If it fades, then fadeout the previous image.
    if (fade) {
      setImageTwoFadeContainerStyle({ animation: `fadeOut ${fadeDuration}ms` });
    }

    // The duration depends on the fade. If it fades, it gets fadeDuration added. If it doesnt fade, it is just the duration of the image.
    const durationOfAnimation = fade
      ? (imageDuration + fadeDuration * 2) / 1000
      : imageDuration / 1000;

    // Sets the animation and background image to the next image, according to the index
    setImageOneStyle({
      backgroundImage: `url(${imageUrls[index]})`,
      animation: `${animationName} ${durationOfAnimation}s`,
    });

    // If it fades, set image one to fade in
    if (fade) {
      setImageOneFadeContainerStyle({ animation: `fadeIn ${fadeDuration}ms` });
    }

    setTimeout(() => {
      // Remove animation of image two
      setImageTwoStyles({ animation: "none" });

      if (fade) {
        // If it faded in, set the opacity to 1.
        setImageOneFadeContainerStyle({ opacity: 1 });
      }
    }, fadeDuration);
  }

  /** Sets animations and background images for image two. */
  function updateImageTwo() {
    // If it fades, then fadeout the previous image.
    if (fade) {
      setImageOneFadeContainerStyle({ animation: `fadeOut ${fadeDuration}ms` });
    }

    // The duration depends on the fade. If it fades, it gets fadeDuration added. If it doesnt fade, it is just the duration of the image.
    const durationOfAnimation = fade
      ? (imageDuration + fadeDuration * 2) / 1000
      : imageDuration / 1000;

    // Sets the animation and background image to the next image, according to the index
    setImageTwoStyles({
      backgroundImage: `url(${imageUrls[index]})`,
      animation: `${animationName} ${durationOfAnimation}s`,
    });

    // If it fades, set image two to fade in
    if (fade) {
      setImageTwoFadeContainerStyle({ animation: `fadeIn ${fadeDuration}ms` });
    }

    setTimeout(() => {
      // Remove animation of image one
      setImageOneStyle({ animation: "none" });

      if (fade) {
        // If it faded in, set the opacity to 1.
        setImageTwoFadeContainerStyle({ opacity: 1 });
      }
    }, fadeDuration);
  }

  /** Reset the timeout. */
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // Creates index and reset the timeout.
  useEffect(() => {
    // Index only necessary if more than one image
    if (imageUrls.length === 0) {
      return false;
    }

    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      // sets the index of the next image, if there is no more images in the array, loop it to the beginning.
      setIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, imageDuration);

    return () => {
      resetTimeout();
    };
  }, [index]);

  // Shift images
  useEffect(() => {
    if (imageUrls.length > 0) {
      if (index % 2 === 0) {
        updateImageOne();
      } else {
        updateImageTwo();
      }
    }
  }, [index]);

  return (
    <div className="template-slideshow">
      <div className="fade-container" style={imageOneFadeContainerStyle}>
        <div style={imageOneStyle} className="image" />
      </div>
      <div className="fade-container" style={imageTwoFadeContainerStyle}>
        <div style={imageTwoStyles} className="image" />
      </div>
      {/* @TODO: { logoImageUrl && <img className={logoClasses} alt="slide" src={logoImageUrl} /> } */}
    </div>
  );
}

Slideshow.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
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
};

export default Slideshow;
