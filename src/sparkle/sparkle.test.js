import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Sparkle from "./sparkle";

configure({adapter: new Adapter()});

// Mock svg's to avoid errors.
jest.mock('./shape.svg', () => () => <span/>);
jest.mock('./instagram-logo.svg', () => () => <span/>);

test('test that app loads', () => {
  const slide = slides[8];
  const wrapper = shallow(<Sparkle run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);
});
