import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import slides from "../../examples/src/slides";
import Contacts from "./contacts";

configure({adapter: new Adapter()});

test('test that app loads', () => {
  const slide = slides[7];
  const wrapper = mount(<Contacts run={true} slide={slide} content={slide.content} slideDone={() => {}}/>);

  expect(wrapper.find('h1').text()).toEqual('Kontakter');
});
