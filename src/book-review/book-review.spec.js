import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import BookReview from "./book-review";
import slides from "../slides";

configure({ adapter: new Adapter() });

test("Test that book review loads", () => {
  const slide = slides[1];
  const wrapper = shallow(
    <BookReview
      run={new Date().toISOString()}
      slide={slide}
      content={slide.content}
      slideDone={() => {}}
    />
  );

  expect(
    wrapper.find(".image-blurry-background").get(0).props.style.backgroundImage
  ).toBe('url("/fixtures/images/mountain1.jpeg")');
  expect(wrapper.find(".author-image").get(0).props.style.backgroundImage).toBe(
    'url("/fixtures/images/author.jpg")'
  );
  expect(wrapper.find(".author").text()).toContain(
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
  );
});
