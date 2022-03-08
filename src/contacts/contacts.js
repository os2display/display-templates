import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IntlProvider, FormattedMessage } from "react-intl";
import BaseSlideExecution from "../base-slide-execution";
import "./contacts.scss";
import da from "./lang/da.json";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

/**
 * Contacts component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function Contacts({ slide, content, run, slideDone }) {
  const { separator } = content;
  const [mappedContacts, setMappedContacts] = useState([]);
  const [translations, setTranslations] = useState();

  useEffect(() => {
    const contacts = content.contacts ?? [];

    const newMappedContacts = contacts.map((contact, index) =>
      contact.image
        ? {
            ...contact,
            url: getFirstMediaUrlFromField(
              slide.mediaData,
              contact?.image,
              index
            ),
          }
        : { ...contact, url: null }
    );

    setMappedContacts(newMappedContacts);
  }, [content?.contacts]);

  /** Imports language strings, sets localized formats and sets timer. */
  useEffect(() => {
    setTranslations(da);
  }, []);

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

  return (
    <IntlProvider messages={translations} locale="da" defaultLocale="da">
      {/* TODO: Fix name to the format template- */}
      <div className="contacts-template">
        <h1>
          <FormattedMessage id="contacts" defaultMessage="contacts" />
          {separator && <div className="separator" />}
        </h1>
        <div className="contacts">
          {mappedContacts.map((contact) => (
            <div className="contact" key={contact.id}>
              {contact.url && (
                <div
                  className="image-area"
                  style={{
                    backgroundImage: `url("${contact.url}")`,
                  }}
                />
              )}
              {!contact.media && <div className="image-area" />}
              <div className="text-container">
                <div>{contact.title}</div>
                <div>{contact.name}</div>
                <div>{contact.email}</div>
                <div>{contact.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ThemeStyles name="contacts-template" css={slide?.themeData?.css} />
      <GlobalStyles />
    </IntlProvider>
  );
}

Contacts.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
    mediaData: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  content: PropTypes.shape({
    separator: PropTypes.bool,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      })
    ),
  }).isRequired,
};

export default Contacts;
