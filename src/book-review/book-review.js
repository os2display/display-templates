import React, { useEffect } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import "./book-review.scss";
import DOMPurify from "dompurify";
import { createGlobalStyle } from "styled-components";
import BaseSlideExecution from "../base-slide-execution";

/**
 * Setup theme vars
 */
/* @TODO: Css from theme editor goes inside `ThemeStyles` */
/* @TODO: Replace class `.template-book-review` with unique id/class from slide. */
const ThemeStyles = createGlobalStyle`
    .template-book-review {
      --bg-white: #fff;
      --bg-light: #f5f5f5;
      --bg-dark: #111;
      --text-dark: #454545;
      --image-blur: 10px;
      --h1-font-size: 1.5em;
    }
  `;

/**
 * Book review component.
 *
 * @param {object} props
 *   Props.
 * @param {object} props.slide
 *   The slide.
 * @param {object} props.content
 *   The slide content.
 * @param {boolean} props.run
 *   Whether or not the slide should start running.
 * @param {Function} props.slideDone
 *   Function to invoke when the slide is done playing.
 * @returns {object}
 *   The component.
 */
function BookReview({ slide, content, run, slideDone }) {
  const { authorText, bookText } = content;

  console.log(slide);

  const authorStyle = (content.authorImage && slide.mediaData[content.authorImage]?.assets?.uri)
    ? { backgroundImage: `url("${slide.mediaData[content.authorImage]?.assets?.uri}")` }
    : "";
  const bookStyle = (content.bookImage && slide.mediaData[content.bookImage]?.assets?.uri)
    ? { backgroundImage: `url("${slide.mediaData[content.bookImage]?.assets?.uri}")` }
    : "";
  const bookUri = content.bookImage && slide.mediaData[content.bookImage]?.assets?.uri ?
    slide.mediaData[content.bookImage]?.assets?.uri : null;
  const sanitizedParsedBookText = parse(DOMPurify.sanitize(bookText));

  /**
   * Setup slide run function.
   */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(slide.duration);
    } else {
      slideExecution.stop();
    }
  }, [run]);

  return (
    <>
      <ThemeStyles />
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
                <img src={bookUri} alt="book" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const imageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

BookReview.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
  }).isRequired,
  content: PropTypes.shape({
    authorText: PropTypes.string,
    media: PropTypes.shape({
      authorImage: imageShape,
      bookImage: imageShape,
    }).isRequired,
    bookText: PropTypes.string,
  }).isRequired,
};

export default BookReview;
