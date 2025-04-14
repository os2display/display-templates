import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";
import {capitalize, getFirstMediaUrlFromField, ThemeStyles} from "../slide-util";
import GlobalStyles from "../GlobalStyles";
import "./rss.scss";

/**
 * RSS component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {number} props.run Timestamp of when to start run.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function RSS({ slide, content, run, slideDone, executionId }) {
  const [entryIndex, setEntryIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState(null);
  const timeoutRef = useRef(null);
  const [running, setRunning] = useState(false);

  const { fontSize = "m", image, mediaContain } = content;
  const { feedData = [], feed = {} } = slide;
  const { configuration = {} } = feed;
  const { entryDuration = 10, numberOfEntries = 5 } = configuration;

  const rootStyle = {};
  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, image);

  // Set background image.
  if (imageUrl) {
    rootStyle.backgroundImage = `url("${imageUrl}")`;
  }

  const entryDone = (index) => {
    const nextIndex = index + 1;
    const feedLength = Math.min(numberOfEntries, feedData?.length ?? 0);

    if (nextIndex >= feedLength) {
      setRunning(false);
      slideDone(slide);
    } else {
      setEntryIndex(nextIndex);
      setRunning(true);
      setCurrentEntry(feedData[nextIndex]);
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

  useEffect(() => {
    if (!running) {
      entryDone(-1);
    }
  }, [slide]);

  return (
    <>
      <Wrapper
        className={`template-rss ${fontSize} ${
          mediaContain ? "media-contain" : ""
        }`}
        style={rootStyle}
      >
        <FeedInfo className="feed-info">
          {currentEntry && (
            <>
              {currentEntry.lastModified && (
                <FeedDate className="feed-info--date">
                  {capitalize(
                    dayjs(currentEntry.lastModified)
                      .locale(localeDa)
                      .format("LLLL")
                  )}
                </FeedDate>
              )}
            </>
          )}
          <FeedTitle className="feed-info--title">
            {currentEntry && currentEntry.publisher}
          </FeedTitle>
          {slide?.feed.configuration.showFeedProgress && (
            <FeedProgress className="feed-info--progress">
              {feedLength > 0 && (
                <span className="feed-info--progress-numbers">
                  {entryIndex + 1} / {feedLength}
                </span>
              )}
            </FeedProgress>
          )}
        </FeedInfo>
        <Content className="content">
          {currentEntry && (
            <>
              <Title className="title">{currentEntry.title}</Title>
              <Description className="description">
                {currentEntry.content}
              </Description>
            </>
          )}
        </Content>
      </Wrapper>

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
      <GlobalStyles />
    </>
  );
}

const Wrapper = styled.div`
  --template-font-size: calc(var(--font-size-base) * 2.5);

  /* Wrapper styling */
  font-family: var(--font-family-base);
  font-size: var(--template-font-size);
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--background-color);
  color: var(--text-color);
  overflow: hidden;
  padding: var(--spacer);
  display: flex;
  position: relative;
  flex-direction: column;
  gap: calc(var(--spacer) * 3);

  /* Position background from inline style */
  background-position: center;
`;

const FeedInfo = styled.div`
  display: flex;
  gap: var(--spacer);
`;

const FeedTitle = styled.div`
  && {
    // Override h1 font-size form styles applied with former class
    font-size: calc(var(--template-font-size) * 0.75);
  }
`;

const FeedDate = styled.div`
  && {
    // Override h1 font-size form styles applied with former class
    font-size: calc(var(--template-font-size) * 0.75);
  }
`;

const FeedProgress = styled.div`
  && {
    // Override h1 font-size form styles applied with former class
    font-size: calc(var(--template-font-size) * 0.75);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer);
`;

const Title = styled.h1`
  && {
    // Override h1 font-size form styles applied with former class
    font-size: calc(var(--template-font-size) * 2);
  }
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  a,
  a:link,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: var(--text-color);
  }
`;

RSS.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
    feed: PropTypes.shape({
      configuration: PropTypes.shape({
        numberOfEntries: PropTypes.number,
        entryDuration: PropTypes.number,
        showFeedProgress: PropTypes.bool,
      }),
    }),
    feedData: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        lastModified: PropTypes.string,
        content: PropTypes.string,
      })
    ),
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    image: PropTypes.arrayOf(PropTypes.string),
    fontSize: PropTypes.string,
    mediaContain: PropTypes.bool,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default RSS;
