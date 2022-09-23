import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Travel from "./travel";

configure({ adapter: new Adapter() });

test("Test that travel loads", () => {
  const slide = slides.find((s) => s.id === "slide13-travel");
  const wrapper = shallow(
    <Travel
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
      executionId="1234"
    />
  );

  expect(wrapper.find("iframe").exists()).toBeTruthy();
});
