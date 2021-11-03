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


  expect(
    wrapper.find(".template-image-text").get(0).props.style.backgroundImage
  ).toBe('url("./fixtures/images/mountain1.jepg")');
  expect(
    wrapper.find("h1").text()).toContain("Slide 1")
  expect(
    wrapper.find(".text").text()).toContain("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.")
});
