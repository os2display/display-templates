import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Calendar from "./calendar";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[2];
  const wrapper = shallow(<Calendar run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);
});
