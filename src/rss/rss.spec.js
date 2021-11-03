import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../../examples/src/slides";
import RSS from "./rss";

configure({ adapter: new Adapter() });

test("Test that rss loads", () => {
  const slide = slides[5];
  const wrapper = shallow(
    <RSS run slide={slide} content={slide.content} slideDone={() => { }} />
  );
  await waitFor(() => {
    expect(
      wrapper.find(".progress").text()).toContain("Alle nyheder 1 / 5")
    expect(
      wrapper.find(".title").text()).toContain("Spektakulær strid i udbyttesagen afgjort: Skandaleramt advokatfirma taber millionopgør")
  });
});
