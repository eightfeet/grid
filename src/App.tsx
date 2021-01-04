import React, { useCallback, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import Layout from "./Layout";
import { Layout as LayoutDataType } from "react-grid-layout";

const isEditing =
  queryString.parse(window.location.search).isEditing === "true";

const data = [
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
    style: {},
    content: { text: "a" },
    event: {},
    type: "base",
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
    style: {},
    content: { text: "b" },
    event: {},
    type: "base",
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
    style: {},
    content: { text: "c" },
    event: {},
    type: "base",
  },
];

function App(props: any) {
  const [appData] = useState(data);
  const onChange = useCallback((data: LayoutDataType[]) => {
    console.log(data);
  }, []);
  return (
    <div className="App">
      <Layout
        isEditing={isEditing}
        rowHeight={20}
        cols={12}
        width={window.innerWidth}
        data={appData}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
