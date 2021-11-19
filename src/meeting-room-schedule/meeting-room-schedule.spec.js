import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import slides from "../slides";
import MeetingRoomSchedule from "./meeting-room-schedule";

configure({ adapter: new Adapter() });

test("Test that meeting room schedule loads", () => {
  const slide = slides[3];
  const wrapper = shallow(
    <MeetingRoomSchedule
      run
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(
    wrapper.find(".template-meeting-room-schedule").get(0).props.style
      .backgroundImage
  ).toBe('url("./fixtures/images/mountain1.jpeg")');
  expect(wrapper.find("h1").text()).toContain("Meeting room schedule 1");
  expect(wrapper.find("p").text()).toContain("Ekstra info!");
});
