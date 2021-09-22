import React from "react";
import { render } from "react-dom";
import ImageText from "../../src/image-text/image-text";

const slide = {
  id: "a97f6ec4-5278-4993-bfeb-53cded000011",
  "@context": "/contexts/Slide",
  "@id": "/v1/slides/a97f6ec4-5278-4993-bfeb-53cded000011",
  title: "image-text 1",
  description: "This is the first slide named one",
  modified: "2012-09-03T12:21:56Z",
  created: "2021-09-01T10:04:00Z",
  modifiedBy: "Ole Olesen",
  createdBy: "Jens Jensen",
  template: {
    "@id": "/v1/templates/457d6ecb-6378-4299-bfcb-53cbaaaa6f10",
    options: [],
  },
  onScreens: "/v1/screens?slideId=a97f6ec4-5278-4993-bfeb-53cded000011",
  onPlaylists: "/v1/playlists?slideId=a97f6ec4-5278-4993-bfeb-53cded000011",
  duration: 5000,
  published: 1622555123,
  content: {
    title: "Slide 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    media: {
      id: "uniqueMedia1",
      url: "./fixtures/images/mountain1.jpeg",
    },
    styling: {
      boxAlign: "top",
      boxMargin: false,
      shadow: true,
      separator: false,
      halfSize: false,
      reversed: false,
    },
  },
};

const App = () => (
  <div>
    <h1>Examples</h1>
    <ImageText
      content={slide.content}
      slide={slide}
      run={true}
      slideDone={() => {}}
    />
  </div>
);
render(<App />, document.getElementById("root"));
