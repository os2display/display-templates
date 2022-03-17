import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Calendar from "./calendar";

configure({ adapter: new Adapter() });

test("Test that calendar loads", () => {
  const slide = slides.find((s) => s.id === "slide2-calendar-multiple-days");
  const wrapper = mount(
    <Calendar
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(wrapper.text()).toContain("Kalender");
});
