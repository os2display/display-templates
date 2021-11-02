import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../../examples/src/slides";
import IFrame from "./iframe";

configure({ adapter: new Adapter() });

test("test that app loads", () => {
  const slide = slides[10];
  const wrapper = shallow(
    <IFrame run slide={slide} content={slide.content} slideDone={() => {}} />
  );

  // @TODO: Add tests.
});
