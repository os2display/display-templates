import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IntlProvider, FormattedMessage } from "react-intl";
import styled from "styled-components";
import BaseSlideExecution from "../base-slide-execution";
import da from "./lang/da.json";
import { getFirstMediaUrlFromField, ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";
import PersonSvg from "./person.svg";

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
  const { separator, duration = 15000 } = content;
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
      slideExecution.start(duration);
    }

    return function cleanup() {
      slideExecution.stop();
    };
  }, [run]);

  return (
    <IntlProvider messages={translations} locale="da" defaultLocale="da">
      <Wrapper className="template-contacts">
        <Header className="contacts-header">
          <Title>
            <FormattedMessage id="contacts" defaultMessage="contacts" />
            {separator && <HeaderUnderline className="separator" />}
          </Title>
        </Header>
        <ContactsWrapper className="contacts">
          {mappedContacts.map((contact) => (
            <Contact className="contact" key={contact.id}>
              {contact.url && (
                <ContactImage
                  className="contact-image"
                  style={{
                    backgroundImage: `url("${contact.url}")`,
                  }}
                />
              )}
              {!contact.url && (
                <ContactImage className="contact-image">
                  <FallbackImage />
                </ContactImage>
              )}
              <ContactText className="contact-text">
                <div>{contact.title}</div>
                <div>{contact.name}</div>
                <div>{contact.email}</div>
                <div>{contact.phone}</div>
              </ContactText>
            </Contact>
          ))}
        </ContactsWrapper>
      </Wrapper>

      <ThemeStyles name="template-contacts" css={slide?.themeData?.css} />
      <GlobalStyles />
    </IntlProvider>
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
`;

const Header = styled.header`
  /* Header styling */
  background-color: var(--background-color-secondary);
  padding: var(--padding-size-base);
`;

const Title = styled.h1`
  /* H1 title styling */
  position: relative;
  display: inline-block;
  margin-top: 0;
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

const ContactsWrapper = styled.main`
  /* Contacts styling */
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(calc(1080px * 0.5) - calc(2 * var(--padding-size-base))), 1fr)
  );
  grid-gap: var(--padding-size-base);
  padding: var(--padding-size-base);
`;

const Contact = styled.article`
  /* Contact styling */
  display: grid;
  column-gap: calc(var(--padding-size-base) * 0.5);
  grid-template-columns: 1fr 1fr;
`;

const ContactText = styled.div`
  /* Contact text styling */
`;

const ContactImage = styled.div`
  /* Contact image styling */
  background-color: var(--background-color-secondary);
  background-size: cover;
  background-position: center center;
  height: 200px;
  display: flex;
  place-content: center;
`;

const FallbackImage = styled(PersonSvg)`
  max-height: 100%;
  max-width: 100%;
  aspect-ratio: 1/1;
  fill: var(--text-color);
  opacity: 0.5;
`;

Contacts.propTypes = {
  run: PropTypes.string.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    themeData: PropTypes.shape({
      css: PropTypes.string,
    }),
    mediaData: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  content: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    separator: PropTypes.bool,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.arrayOf(PropTypes.string.isRequired),
      })
    ),
  }).isRequired,
};

export default Contacts;
