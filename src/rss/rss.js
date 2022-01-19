import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "./rss.scss";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

/**
 * RSS component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {number} props.run Timestamp of when to start run.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function RSS({ slide, content, run, slideDone }) {
  const [entryIndex, setEntryIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState(null);
  const timeoutRef = useRef(null);

  const { fontSize = "m", image } = content;
  const { feedData, feed } = slide;
  const { configuration = {} } = feed;
  const { entryDuration = 10, numberOfEntries = 5 } = configuration;

  const rootStyle = {};
  const feedLength = Math.min(numberOfEntries, feedData?.entries?.length ?? 0);
  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, image);

  // Set background image.
  if (imageUrl) {
    rootStyle.backgroundImage = `url("${imageUrl}")`;
  }

  /**
   * Capitalize the datestring, as it starts with the weekday.
   *
   * @param {string} s The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const entryDone = (index) => {
    const nextIndex = index + 1;

    if (nextIndex >= feedLength) {
      slideDone(slide);
    } else {
      setEntryIndex(nextIndex);
      setCurrentEntry(feedData?.entries[nextIndex]);
      timeoutRef.current = setTimeout(() => {
        entryDone(nextIndex);
      }, entryDuration * 1000);
    }
  };

  /** Sets localized formats (dayjs) */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    if (run) {
      entryDone(-1);
    }
  }, [run]);

  return (
    <>
      <div className={`template-rss ${fontSize}`} style={rootStyle}>
        <div className="progress">
          {slide?.feedData?.title}
          {feedLength > 0 && (
            <span className="progress-numbers">
              {entryIndex + 1} / {feedLength}
            </span>
          )}
        </div>
        {currentEntry && (
          <>
            <div className="title">{currentEntry.title}</div>
            {currentEntry.lastModified && (
              <div className="date">
                {capitalize(
                  dayjs(currentEntry.lastModified)
                    .locale(localeDa)
                    .format("LLLL")
                )}
              </div>
            )}
            <div className="description">{currentEntry.content}</div>
          </>
        )}
      </div>
      <ThemeStyles name="template-rss" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

RSS.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.shape({}),
    feed: PropTypes.shape({
      configuration: PropTypes.shape({
        numberOfEntries: PropTypes.number,
        entryDuration: PropTypes.number,
      }),
    }),
    feedData: PropTypes.shape({
      title: PropTypes.string,
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          lastModified: PropTypes.string,
          content: PropTypes.string,
        })
      ),
    }),
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    image: PropTypes.arrayOf(PropTypes.string),
    fontSize: PropTypes.string,
  }).isRequired,
};

export default RSS;
