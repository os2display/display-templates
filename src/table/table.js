import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BaseSlideExecution from "../base-slide-execution";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../global-styles";

/**
 * Table component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {object} The component.
 */
function Table({ slide, content, run, slideDone, executionId }) {
  // Content
  const {
    table,
    title,
    text,
    fontSize,
    fontPlacement,
    separator = true,
    duration = 15000,
  } = content;
  let header;

  if (Array.isArray(table) && table.length > 0 && table[0].type === "header") {
    [header] = table;
  }

  // Image
  const rootStyle = {};
  const backgroundImageUrl = getFirstMediaUrlFromField(
    slide.mediaData,
    content.image
  );
  if (backgroundImageUrl) {
    rootStyle.backgroundImage = `url("${backgroundImageUrl}")`;
  }

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
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
      <Wrapper className="template-table" style={rootStyle}>
        <Header className="template-table-header">
          <Title className="title">
            {title}
            {separator && <HeaderUnderline className="separator" />}
          </Title>
        </Header>
        <ContentWrapper>
          {fontPlacement === "top" && (
            <Description className="text">{text}</Description>
          )}
          {header && (
            <GridTable className={fontSize} style={gridStyle}>
              {header.columns.map((headerObject) => (
                <TableHeader
                  key={headerObject.Header}
                  className="column-header"
                >
                  {headerObject.Header}
                </TableHeader>
              ))}

              {Array.isArray(table) &&
                table.map((column) =>
                  header.columns.map(
                    ({ accessor }) =>
                      column[accessor] && (
                        <Column key={column[accessor]} className="column">
                          {column[accessor]}
                        </Column>
                      )
                  )
                )}
            </GridTable>
          )}
          {fontPlacement === "bottom" && (
            <Description classes="text">{text}</Description>
          )}
        </ContentWrapper>
      </Wrapper>

      <ThemeStyles id={executionId} css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

const Wrapper = styled.div`
  /* Wrapper styling */
  font-family: var(--font-family-base);
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--background-color);
  color: var(--text-color);
  overflow: hidden;

  /* Position background from inline style */
  background-size: cover;
  background-position: center;
`;

const Header = styled.header`
  /* Header styling */
  background-color: var(--background-color-secondary);
  padding: var(--padding-size-base);
`;

const Title = styled.h1`
  /* H1 title styling */
  font-size: var(--h1-font-size);
  position: relative;
  display: inline-block;
  margin-bottom: var(--margin-size-base);
`;

const TableHeader = styled.h2`
  /* H2 tableheader styling */
  font-size: var(--h2-font-size);
  color: var(--color-primary);
`;

const HeaderUnderline = styled.div`
  /* HeaderUnderline styling */
  /*
  * TODO: Consider moving HeaderUnderline to at seperate reusable component. Maybe in combination with title.
  */
  opacity: 0;
  position: absolute;
  height: 0.2em;
  width: 100%;
  transition: width 0.3s ease-out;
  animation: 0.7s normal 0.5s forwards 1 h1-underline ease-out;
  background-color: var(--color-primary);
`;

const ContentWrapper = styled.main`
  /* Content wrapper styling */
  padding: var(--padding-size-base);
`;

const GridTable = styled.div`
  /* Grid styling */
  margin: var(--margin-size-base) 0;

  &:nth-child(even) {
    background-color: var(--background-color-secondary);
  }

  &.s {
    font-size: var(--font-size-sm);
  }
  &.m {
    font-size: var(--font-size-base);
  }
  &.l {
    font-size: var(--font-size-lg);
  }
  &.xl {
    font-size: var(--font-size-xl);
  }
`;

const Column = styled.div`
  /* Column styling */
  padding: calc(var(--padding-size-base) * 0.5) 0;
`;

const Description = styled.div`
  /* Description text styling */
  margin: var(--margin-size-base) 0;
`;

Table.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    instanceId: PropTypes.string,
    mediaData: PropTypes.objectOf(PropTypes.any),
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    fontSize: PropTypes.string,
    fontPlacement: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    table: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    image: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Table;
