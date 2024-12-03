import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FormattedMessage, IntlProvider } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import da from "./lang/da.json";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import CalendarSingle from "./calendar-single";
import CalendarSingleBooking from "./calendar-single-booking";
import CalendarMultipleDays from "./calendar-multiple-days";
import CalendarMultiple from "./calendar-multiple";
import GlobalStyles from "../GlobalStyles";
import "./calendar.scss";

/**
 * Calendar component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {string} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @param {string} props.executionId Unique id for the instance.
 * @returns {JSX.Element} The component.
 */
function Calendar({ slide, content, run, slideDone, executionId }) {
  const [translations, setTranslations] = useState();

  const {
    layout = "multiple",
    duration = 15000,
    fontSize,
    resourceUnavailableText,
  } = content;
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

  const getTitle = (eventTitle) => {
    if (!eventTitle || eventTitle === "") {
      if (resourceUnavailableText) {
        return resourceUnavailableText;
      }

      return <FormattedMessage id="unavailable" defaultMessage="Unavailable" />;
    }

    return eventTitle;
  };

  return (
    <>
      <IntlProvider messages={translations} locale="da" defaultLocale="da">
        {layout === "single" && (
          <CalendarSingle
            calendarEvents={feedData}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
            getTitle={getTitle}
          />
        )}
        {layout === "singleBooking" && (
          <CalendarSingleBooking
            slide={slide}
            calendarEvents={feedData}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
            getTitle={getTitle}
            run={run}
          />
        )}
        {layout === "multiple" && (
          <CalendarMultiple
            calendarEvents={feedData}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
            getTitle={getTitle}
          />
        )}
        {layout === "multipleDays" && (
          <CalendarMultipleDays
            calendarEvents={feedData}
            content={content}
            templateClasses={classes}
            templateRootStyle={rootStyle}
            getTitle={getTitle}
          />
        )}
      </IntlProvider>

      <ThemeStyles id={executionId} css={slide?.theme?.cssStyles} />
      <GlobalStyles />
    </>
  );
}

Calendar.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    theme: PropTypes.shape({
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
    image: PropTypes.arrayOf(PropTypes.string),
    fontSize: PropTypes.string,
    resourceUnavailableText: PropTypes.string,
  }).isRequired,
  executionId: PropTypes.string.isRequired,
};

export default Calendar;
