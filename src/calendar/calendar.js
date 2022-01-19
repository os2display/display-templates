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
 * @returns {object} The component.
 */
function Calendar({ slide, content, run, slideDone }) {
  const [translations, setTranslations] = useState();

  const {
    backgroundColor = "",
    layout = "multiple",
    colorize = false,
    colorizeColorClass = "",
  } = content;
  const { feedData = [] } = slide;

  const classes = ["template-calendar"];
  const rootStyle = {};

  const imageUrl = getFirstMediaUrlFromField(slide.mediaData, content.image);

  if (imageUrl) {
    rootStyle.backgroundImage = `url("${imageUrl}")`;
  }

  if (colorize && colorizeColorClass !== "") {
    classes.push("colorize");
    rootStyle.backgroundColor = colorizeColorClass;
  } else {
    rootStyle.backgroundColor = backgroundColor;
  }

  /** Setup slide run function. */
  const slideExecution = new BaseSlideExecution(slide, slideDone);
  useEffect(() => {
    if (run) {
      slideExecution.start(slide.duration);
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

      <ThemeStyles name="template-calendar" css={slide?.themeData?.css} />
      <GlobalStyles />
    </>
  );
}

Calendar.propTypes = {
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
    mediaData: PropTypes.objectOf(PropTypes.any),
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
    layout: PropTypes.string,
    colorize: PropTypes.bool,
    colorizeColorClass: PropTypes.string,
    backgroundColor: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Calendar;
