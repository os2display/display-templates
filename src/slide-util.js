import { createGlobalStyle } from "styled-components";
import React from "react";
import PropTypes from "prop-types";

/**
 * Get the first media url of a media field.
 *
 * @param {object} mediaData The object of media objects.
 * @param {Array} field The field to get the first media url from.
 * @returns {string | any | null} The first media url of the field.
 */
function getFirstMediaUrlFromField(mediaData, field) {
  if (Array.isArray(field) && field.length > 0) {
    const media = mediaData[field[0]];

    if (media?.assets?.uri) {
      return media.assets.uri;
    }
    if (media?.url) {
      return media.url;
    }
    return null;
  }

  return null;
}

/**
 * Get the all media urls of a media field.
 *
 * @param {object} mediaData The object of media objects.
 * @param {Array} field The field to get the all media urls from.
 * @returns {string | any | null} Media urls for the given field.
 */
function getAllMediaUrlsFromField(mediaData, field) {
  if (Array.isArray(field)) {
    return field.reduce((previous, current) => {
      const media = mediaData[current];

      if (media?.assets?.uri) {
        previous.push(media.assets.uri);
      } else if (media?.url) {
        previous.push(media.url);
      }

      return previous;
    }, []);
  }

  return [];
}

/**
 * Create a theme style for a slide.
 *
 * @param {object} props Props.
 * @param {string} props.id Slide execution id.
 * @param {string | null} props.css Css as a string.
 * @returns {object} The component.
 */
function ThemeStyles({ id, css = null }) {
  if (!css) return <></>;

  const slideCss = css.replaceAll("#SLIDE_ID", `#${id}`);

  const ThemeComponent = createGlobalStyle`${slideCss}`;
  return <ThemeComponent />;
}

ThemeStyles.propTypes = {
  id: PropTypes.string.isRequired,
  css: PropTypes.string,
};

const LOGO_POSITIONS = ["top-right", "top-left", "bottom-right", "bottom-left"];

/**
 * Normalize logo position values from admin or mock data.
 *
 * @param {string | undefined} logoPosition Raw logo position value.
 * @returns {string} Valid logo position.
 */
function resolveLogoPosition(logoPosition) {
  const normalized = String(logoPosition || "")
    .trim()
    .replace(/^logo-position-/, "")
    .replace(/\s+/g, "-");

  return LOGO_POSITIONS.includes(normalized) ? normalized : "top-right";
}

/**
 * Resolve image object-fit from admin or mock data.
 *
 * @param {string | undefined} imageFit Raw image fit value.
 * @returns {"cover" | "contain"} Valid object-fit value.
 */
function resolveImageFit(imageFit) {
  return imageFit === "contain" ? "contain" : "cover";
}

export {
  getAllMediaUrlsFromField,
  getFirstMediaUrlFromField,
  resolveImageFit,
  resolveLogoPosition,
  ThemeStyles,
};
