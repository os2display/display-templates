import React from "react";
import { shallow, configure, } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../../examples/src/slides";
import ImageText from "./image-text";

configure({ adapter: new Adapter() });

test("Test that basic image-text loads", () => {
  const slide = slides[0];
  const wrapper = shallow(
    <ImageText run slide={slide} content={slide.content} slideDone={() => { }} />

  );

  expect(wrapper.find('h1').exists()).toBeTruthy()
});
