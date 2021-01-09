import { appDataListTypes } from "../../types/appData";

const appData: appDataListTypes = [
  {
    layout: {
      w: 10,
      h: 2,
      x: 1,
      y: 19,
      i: "a",
      moved: false,
      static: false,
    },
    style: {
      basic: {
        display: {
          width: 100,
          height: 100,
          zIndex: 20,
          position: 'relative'
        },
        border: {
            radiusTopLeft: 20,
            radiusTopRight: 20
        },
        backgroundGradient: {
          gradient: [
            {
              color: "red",
              transition: 0,
            },
            {
              color: "orange",
              transition: 100,
            },
          ],
          gradientDirections: "-45deg",
        },
      },
      content: {},
    },
    content: { text: "定制文本内容" },
    event: {},
    type: "Conterner",
  },
  {
    layout: {
      w: 10,
      h: 8,
      x: 1,
      y: 11,
      i: "b",
      moved: false,
      static: false,
    },
    style: {
      basic: {
        display: {
          width: 100,
          height: 100,
        },
        backgroundCommon: {
          backgroundColor: "green",
        },
      },
    },
    content: { text: "b" },
    event: {},
    type: "Modal",
  },
  {
    layout: {
      w: 10,
      h: 11,
      x: 1,
      y: 0,
      i: "c",
      moved: false,
      static: false,
    },
    style: {
      basic: {
        display: {
          width: 100,
          height: 100,
        },
        backgroundCommon: {
          backgroundColor: "yellow",
        },
      },
    },
    content: { text: "c" },
    event: {},
    type: "Conterner",
  },
];

export default appData;
