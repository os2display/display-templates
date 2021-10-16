import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Slideshow from "./slideshow";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[6];
  const wrapper = shallow(<Slideshow run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);
});
