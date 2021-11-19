import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import RSS from "./rss";

configure({ adapter: new Adapter() });

test("Test that rss loads", () => {
  const slide = slides[5];
  const wrapper = shallow(
    <RSS run slide={slide} content={slide.content} slideDone={() => {}} />
  );

  expect(wrapper.find(".progress").exists()).toBeTruthy();
});
