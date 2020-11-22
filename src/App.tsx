import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import s from "./test.module.scss";

function App(props: any) {
  const [state, setstate] = useState(0);
  const [fixed, setfixed] = useState(true);

  useEffect(() => {
    setstate(window.innerWidth);
    setTimeout(() => {
      setfixed(false);
    }, 5000);
  }, []);
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: fixed },
    { i: "b", x: 1, y: 0, w: 10, h: 2, minW: 10, maxW: 10, static: fixed },
    { i: "c", x: 11, y: 0, w: 1, h: 2, static: fixed },
  ];

  const onDragStop: GridLayout.ItemCallback = (
    layout: GridLayout.Layout[],
    oldItem: GridLayout.Layout,
    newItem: GridLayout.Layout,
    placeholder: GridLayout.Layout,
    event: MouseEvent,
    element: HTMLElement
  ) => {
    console.log("data");
    console.log("layout", layout);
    console.log("oldItem", oldItem);
    console.log("newItem", newItem);
    console.log("placeholder", placeholder);
    console.log("event", event);
    console.log("element", element.getClientRects()[0]);
  };

  const onLayoutChange = () => {
    console.log("onchange")
  }

  if (state === 0) {
    return null;
  }
  return (
    <div>
      <GridLayout
        onDragStop={onDragStop}
        onLayoutChange={onLayoutChange}
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={state/12}
        width={state}
        autoSize
      >
        {layout.map((item) => (
          <div className={s.block} key={item.i}>
            <div className={item.i === "b" ? s.blockcon : ""}>{item.i}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default App;
