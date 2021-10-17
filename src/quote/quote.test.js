import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Quote from "./quote";

configure({adapter: new Adapter()});

// Mock svg's to avoid errors.
jest.mock('./citation-mark.svg', () => () => <span/>);

test('test that app loads', () => {
  const slide = slides[9];
  const wrapper = shallow(<Quote run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);

  // @TODO: Add tests.
});
