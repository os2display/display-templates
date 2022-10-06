import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Video from "./video";
import slides from "../slides";

configure({ adapter: new Adapter() });

test("Test that basic table loads", () => {
  const slide = slides.find((s) => s.id === "slide13-video");
  shallow(
    <Video
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
      executionId="1234"
    />
  );
});
