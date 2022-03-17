import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Slideshow from "./slideshow";

configure({ adapter: new Adapter() });

test("Test that slideshow loads", () => {
  const slide = slides.find((s) => s.id === "slide5-slideshow");
  const wrapper = shallow(
    <Slideshow
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(wrapper.find(".template-slideshow").exists()).toBeTruthy();
});
