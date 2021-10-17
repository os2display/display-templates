import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BookReview from "./book-review";
import slides from "../../examples/src/slides";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[1];
  const wrapper = shallow(<BookReview run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);

  expect(wrapper.text()).toContain('Lorem Ipsum');

  expect(wrapper.find('.image-blurry-background').get(0).props.style.backgroundImage).toBe('url("./fixtures/images/mountain1.jpeg")');
});
