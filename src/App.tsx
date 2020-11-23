import React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import GridLine from './GridLine'
import './App.scss';
import EditorDemo from './EditorDemo'

function App(props: any) {

  return (
    <div className="App">
      <GridLine />
      {/* <EditorDemo /> */}
    </div>
  );
}

export default App;
