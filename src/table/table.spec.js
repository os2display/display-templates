import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Table from "./table";

configure({ adapter: new Adapter() });

test("Test that basic table loads", () => {
  const slide = slides.find((s) => s.id === "slide9-table");
  const wrapper = shallow(
    <Table
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(wrapper.find(".title").text()).toContain("Overskrift");
  expect(wrapper.find(".column-header:first-child").text()).toContain("Column 1");
});
