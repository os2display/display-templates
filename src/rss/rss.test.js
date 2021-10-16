import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import RSS from "./rss";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[5];
  const wrapper = shallow(<RSS run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);

  // @TODO: Add tests.
});
