import twoBoxes from "./screen-layouts/two-boxes.json";
import threeBoxes from "./screen-layouts/three-boxes.json";
import threeBoxesHorizontal from "./screen-layouts/three-boxes-horizontal.json";
import twoBoxesVertical from "./screen-layouts/two-boxes-vertical.json";
import touchTemplate from "./screen-layouts/touch-template.json";
import sixAreas from "./screen-layouts/six-areas.json";
import fullScreen from "./screen-layouts/full-screen.json";

const screens = [
  {
    id: "2-delt",
    screenLayout: twoBoxes,
  },
  {
    id: "2-delt-vertikalt",
    screenLayout: twoBoxesVertical,
  },
  {
    id: "touch-template",
    screenLayout: touchTemplate,
  },
  {
    id: "3-delt",
    screenLayout: threeBoxes,
  },
  {
    id: "3-delt-horisontalt",
    screenLayout: threeBoxesHorizontal,
  },
  {
    id: "seks-områder",
    screenLayout: sixAreas,
  },
  {
    id: "fuld-skærm",
    screenLayout: fullScreen,
  },
];

export default screens;
