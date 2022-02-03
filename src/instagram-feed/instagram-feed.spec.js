import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { jest } from "@jest/globals";
import slides from "../slides";
import InstagramFeed from "./instagram-feed";

configure({ adapter: new Adapter() });

// Mock svg's to avoid errors.
jest.mock("./shape.svg", () => () => <span />);
jest.mock("./instagram-logo.svg", () => () => <span />);

test("Test that instagram-feed loads", () => {
  const slide = slides[8];
  const wrapper = shallow(
    <InstagramFeed run slide={slide} content={slide.content} slideDone={() => {}} />
  );
  expect(wrapper.find(".template-instagram-feed").exists()).toBeTruthy();
});
