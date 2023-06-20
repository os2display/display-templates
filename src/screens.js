import twoBoxes from "./screen-layouts/two-boxes.json";
import threeBoxes from "./screen-layouts/three-boxes.json";
import threeBoxesHorizontal from "./screen-layouts/three-boxes-horizontal.json";
import twoBoxesVertical from "./screen-layouts/two-boxes-vertical.json";
import touchTemplate from "./screen-layouts/touch-template.json";
import sixAreas from "./screen-layouts/six-areas.json";
import fullScreen from "./screen-layouts/full-screen.json";
import fourAreas from "./screen-layouts/four-areas.json";
import twoBoxesVerticalReversed from "./screen-layouts/two-boxes-vertical-reversed.json";

const screens = [
  {
    id: "two-split",
    screenLayout: twoBoxes,
  },
  {
    id: "two-split-vertical",
    screenLayout: twoBoxesVertical,
  },
  {
    id: "two-split-vertical-reversed",
    screenLayout: twoBoxesVerticalReversed,
  },
  {
    id: "touch-template",
    screenLayout: touchTemplate,
  },
  {
    id: "three-split",
    screenLayout: threeBoxes,
  },
  {
    id: "three-split-horizontal",
    screenLayout: threeBoxesHorizontal,
  },
  {
    id: "six-areas",
    screenLayout: sixAreas,
  },
  {
    id: "full-screen",
    screenLayout: fullScreen,
  },
  {
    id: "four-areas",
    screenLayout: fourAreas,
  },
];

export default screens;
