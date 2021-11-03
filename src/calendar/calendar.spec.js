import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../../examples/src/slides";
import Calendar from "./calendar";

configure({ adapter: new Adapter() });

test("test that app loads", () => {
  const slide = slides[2];
  const wrapper = mount(
    <Calendar run slide={slide} content={slide.content} slideDone={() => { }} />
  );

  expect(wrapper.text()).toContain("Calendar");
  expect(wrapper.find(".template-calendar.blue").length).toBe(1);
});
