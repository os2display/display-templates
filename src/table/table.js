import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import "./table.scss";

/**
 * Table component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Table({ slide, content, run, slideDone }) {
  // Styling from content
  const { fontSize, fontPlacement } = content.styling || {};
  const textClasses = `text ${fontSize}`;

  // Content
  const { table, title, text } = content;
  let header;

  if (table.length > 0 && table[0].type === "header") {
    header = table.shift();
  }

  // Image
  const rootStyle = {};
  const backgroundImageUrl = getFirstMediaUrlFromField(
    slide.mediaData,
    content.backgroundImage
  );
  if (backgroundImageUrl) {
    rootStyle.backgroundImage = `url("${backgroundImageUrl}")`;
  }

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(slide.duration);
    } else {
      slideExecution.stop();
    }
  }, [run]);

  let gridStyle;
  if (header) {
    gridStyle = {
      gridTemplateColumns: `${"auto ".repeat(header.columns.length)}`,
      display: "grid",
    };
  }

  return (
    <>
      <ThemeStyles name="template-table" css={slide?.themeData?.css} />
      <div className="table" style={rootStyle}>
        <h1 className="header">{title}</h1>
        {fontPlacement === "top" && <div className={textClasses}>{text}</div>}

        {header && (
          <div style={gridStyle}>
            {header.columns.map((headerObject) => (
              <h2 key={headerObject.title} className="column-header">
                {headerObject.title}
              </h2>
            ))}

            {table.map((column) => (
              <Fragment key={`${column.toString()}`}>
                {header.columns.map(({ field }) => (
                  <div key={column[field]} className="column">
                    {column[field]}
                  </div>
                ))}
              </Fragment>
            ))}
            {fontPlacement === "bottom" && (
              <div classes={textClasses}>{text}</div>
            )}
          </div>
        )}
      </div>
      <ThemeStyles />
    </>
  );
}

Table.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.objectOf(PropTypes.any),
    duration: PropTypes.number.isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    styling: PropTypes.shape({
      fontSize: PropTypes.string,
      fontPlacement: PropTypes.bool,
    }),
    title: PropTypes.string,
    text: PropTypes.string,
    table: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    backgroundImage: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Table;