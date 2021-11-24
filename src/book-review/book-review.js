import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import "./book-review.scss";
import DOMPurify from "dompurify";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";

/**
 * Book review component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function BookReview({ slide, content, run, slideDone }) {
  const { authorText, bookText } = content;
  const [sanitizedParsedBookText, setSanitizedParsedBookText] = useState("");

  const authorImageUrl = getFirstMediaUrlFromField(
    slide.mediaData,
    content.authorImage
  );
  const bookImageUrl = getFirstMediaUrlFromField(
    slide.mediaData,
    content.bookImage
  );

  const authorStyle = authorImageUrl
    ? { backgroundImage: `url("${authorImageUrl}")` }
    : "";
  const bookStyle = bookImageUrl
    ? { backgroundImage: `url("${bookImageUrl}")` }
    : "";

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(slide.duration);
    } else {
      slideExecution.stop();
    }
  }, [run]);

  useEffect(() => {
    setSanitizedParsedBookText(parse(DOMPurify.sanitize(bookText)));
  }, []);

  return (
    <>
      <ThemeStyles name="template-book-review" css={slide?.themeData?.css} />
      <div className="template-book-review">
        <div className="text-area">
          <div>{sanitizedParsedBookText}</div>
        </div>
        <div className="author-area">
          {authorStyle && <div className="author-image" style={authorStyle} />}
          <div className="author">{authorText}</div>
        </div>
        <div className="book-image-area">
          {bookStyle && (
            <>
              <div className="image-blurry-background" style={bookStyle} />
              <div className="book-image">
                <img src={bookImageUrl} alt="book" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
BookReview.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    mediaData: PropTypes.objectOf(PropTypes.any),
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    authorText: PropTypes.string,
    bookText: PropTypes.string,
    authorImage: PropTypes.arrayOf(PropTypes.string),
    bookImage: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BookReview;
