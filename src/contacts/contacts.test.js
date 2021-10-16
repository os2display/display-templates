import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Contacts from "./contacts";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[7];
  const wrapper = shallow(<Contacts run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);
});
