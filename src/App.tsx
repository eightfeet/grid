import React, { useCallback, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import Layout from "./Layout";
import data from './mockdata/appData'
import { Layout as LayoutDataType } from "react-grid-layout";

const isEditing =
  queryString.parse(window.location.search).isEditing === "true";

function App(props: any) {
  const [appData] = useState(data);
  const onChange = useCallback((data: LayoutDataType[]) => {
    console.log(data, 111);
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
