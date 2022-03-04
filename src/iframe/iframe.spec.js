import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import IFrame from "./iframe";

configure({ adapter: new Adapter() });

test("Test that iframe loads", () => {
  const slide = slides[10];
  const wrapper = shallow(
    <IFrame
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(wrapper.find("iframe").exists()).toBeTruthy();
});
