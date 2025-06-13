import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import QRCode from "qrcode";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import "../global-styles.css";
import "./news-feed.scss";

/**
 * News feed slide.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function NewsFeed({ slide, content, run, slideDone, executionId }) {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const [currentPost, setCurrentPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [qr, setQr] = useState(null);
  const transitionRef = useRef(null);

  const timerRef = useRef();

  const { feedData = [], mediaData = {} } = slide;
  const {
    entryDuration = 10,
    mediaContain = false,
    readMore,
    fallbackImage,
  } = content;

  const fallbackImageUrl = getFirstMediaUrlFromField(mediaData, fallbackImage);

  const duration = entryDuration * 1000;

  // Setup feed entry switch, if there is more than one post.
  useEffect(() => {
    if (currentPost) {
      timerRef.current = setTimeout(() => {
        const currentIndex = posts.indexOf(currentPost);
        const nextIndex = (currentIndex + 1) % posts.length;

        if (nextIndex === 0) {
          slideDone(slide);
        } else {
          setCurrentPost(posts[nextIndex]);
        }
      }, duration);

      if (!currentPost?.link) {
        setQr(null);
      } else {
        QRCode.toDataURL(currentPost.link, {
          color: {
            dark: "#000000",
            light: "#ffffff00",
          },
        }).then((data) => {
          setQr(data);
        });
      }
    }

    return function cleanup() {
      if (timerRef?.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentPost]);

  useEffect(() => {
    if (posts.length > 0) {
      setCurrentPost(posts[0]);
    }
  }, [posts]);

  useEffect(() => {
    if (feedData?.entries?.length > 0) {
      setPosts(feedData.entries);
    } else if (!transitionRef.current) {
      // If no content, wait 5 seconds and continue to next slide.
      transitionRef.current = setTimeout(() => {
        slideDone(slide);
      }, 5000);
    }
  }, [feedData]);

  useEffect(() => {
    if (run) {
      if (posts?.length > 0) {
        setCurrentPost(posts[0]);
      }
    }
  }, [run]);

  useEffect(() => {
    return () => {
      if (transitionRef.current) {
        clearInterval(transitionRef.current);
      }
    };
  }, []);

  const getImageUrl = (post) => {
    let imageUrl = fallbackImageUrl ?? null;

    if (post?.medias instanceof Array) {
      const medias = [...post?.medias];

      if (medias?.length > 0) {
        const first = medias.pop();

        if (first?.url) {
          imageUrl = first.url;
        }
      }
    }

    return imageUrl;
  };

  const imageUrl = currentPost ? getImageUrl(currentPost) : null;

  return (
    <>
      {currentPost && (
        <div className="template-news-feed">
          <div
            className={`media-section ${mediaContain ? "media-contain" : ""}`}
            style={{
              backgroundImage: imageUrl ? `url("${imageUrl}")` : "",
            }}
          />
          <div className="text-section">
            <h1 className="title">{currentPost.title}</h1>
            <div className="author">
              {currentPost.lastModified
                ? dayjs(currentPost.lastModified).locale(localeDa).format("ll")
                : ""}
              {currentPost.lastModified && currentPost?.author?.name && " ▪ "}
              {currentPost?.author?.name}
            </div>
            <div className="description">{currentPost.summary}</div>
            <div className="description-fade" />
          </div>
          <div className="extra-section">
            {qr && <img src={qr} alt="QR code link" className="qr" />}
            {currentPost.link && (
              <>
                <div className="read-more">
                  {readMore || "Læs hele nyheden"}
                </div>
                <div className="link">{currentPost.link}</div>
              </>
            )}
          </div>
        </div>
      )}

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
    </>
  );
}

NewsFeed.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    theme: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
    feedData: PropTypes.shape({
      title: PropTypes.string,
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          content: PropTypes.string,
          author: PropTypes.shape({
            name: PropTypes.string,
          }),
          medias: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
            })
          ),
          lastModified: PropTypes.string,
          link: PropTypes.string,
        })
      ),
    }).isRequired,
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
  }).isRequired,
  content: PropTypes.shape({
    readMore: PropTypes.string,
    entryDuration: PropTypes.number,
    mediaContain: PropTypes.bool,
    fallbackImage: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default NewsFeed;
