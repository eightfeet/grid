import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import classNames from "classnames";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import s from "./test.module.scss";
import GridLine from "./../GridLine";

function EditorDemo(props: any) {
  const [state, setstate] = useState(0);
  const [fixed, setfixed] = useState(true);
  const rowHeight = 20;
  const cols = 12;
  useEffect(() => {
    setstate(window.innerWidth);
    setTimeout(() => {
      setfixed(false);
    }, 5000);
  }, []);
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: fixed },
    { i: "b", x: 1, y: 0, w: 10, h: 2, static: fixed },
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
    console.log("onchange");
  };

  if (state === 0) {
    return null;
  }
  return (
    <div className={s.layout}>
      {!fixed ? (
        <GridLine
          width={window.innerWidth}
          cols={cols}
          rowHeight={rowHeight}
          height={window.innerHeight}
          space={10}
        />
      ) : null}
      <GridLayout
        onDragStop={onDragStop}
        onLayoutChange={onLayoutChange}
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        width={state}
        autoSize
      >
        {layout.map((item) => (
          <div
            className={classNames(s.block, fixed ? null : s.modify)}
            key={item.i}
          >
            <div className={item.i === "b" ? s.blockcon : ""}>{item.i}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default EditorDemo;
