import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import Poster from "./poster";

configure({ adapter: new Adapter() });

test("Test that poster loads", () => {
  const slide = slides.find((s) => s.id === "slide3-poster-single");
  const wrapper = mount(
    <Poster
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(wrapper.find(".image-area").get(0).props.style.backgroundImage).toBe(
    'url("/fixtures/images/mountain1.jpeg")'
  );
  expect(wrapper.find("h1").text()).toContain("Lorem ipsum");
  expect(wrapper.find(".ticket").text()).toContain("75-150 kr.");
});
