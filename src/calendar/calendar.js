import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { IntlProvider } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import da from "./lang/da.json";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import CalendarSingle from "./calendar-single";
import CalendarMultipleDays from "./calendar-multiple-days";
import CalendarMultiple from "./calendar-multiple";
import GlobalStyles from "../GlobalStyles";

/**
 * Calendar component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function Calendar({ slide, content, run, slideDone, executionId }) {
  const [translations, setTranslations] = useState();

  const { layout = "multiple", duration = 15000, fontSize } = content;
  const { feedData = [] } = slide;

  const classes = ["template-calendar", fontSize];
  const rootStyle = {};

  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, content.image);

  if (imageUrl) {
    rootStyle["--bg-image"] = `url("${imageUrl}")`;
  }

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  /** Imports language strings, sets localized formats. */
  useEffect(() => {
    dayjs.extend(localizedFormat);

    setTranslations(da);
  }, []);

  return (
    <>
      <IntlProvider messages={translations} locale="da" defaultLocale="da">
        {layout === "single" && (
          <CalendarSingle
            calendarEvents={feedData ?? []}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
          />
        )}
        {layout === "multiple" && (
          <CalendarMultiple
            calendarEvents={feedData ?? []}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
          />
        )}
        {layout === "multipleDays" && (
          <CalendarMultipleDays
            calendarEvents={feedData ?? []}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
          />
        )}
      </IntlProvider>

      <ThemeStyles id={executionId} css={slide?.themeData?.cssStyles} />
      <GlobalStyles />
    </>
  );
}

Calendar.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    themeData: PropTypes.shape({
      cssStyles: PropTypes.string,
    }),
    mediaData: PropTypes.shape({
      url: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    }),
    feedData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number,
        resourceTitle: PropTypes.string,
        resourceId: PropTypes.string,
      })
    ),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    layout: PropTypes.string,
    backgroundColor: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
    fontSize: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Calendar;
