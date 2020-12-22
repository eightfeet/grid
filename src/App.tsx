import React, { useCallback, useState } from 'react';
import queryString from 'query-string';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.scss';
import EditorDemo from './EditorDemo';


const isEditing = queryString.parse(window.location.search).isEditing === 'true';

const data = [
  {
    layout: { i: "a", x: 1, y: 0, w: 10, h: 2 },
    config: {name: '按钮'}
  },
  {
    layout: { i: "b", x: 1, y: 0, w: 10, h: 2},
    config: {name: '抽奖'}
  },
  {
    layout: { i: "c", x: 1, y: 0, w: 10, h: 2},
    config: {name: '报名'}
  }
]

function App(props: any) {
  // const [isEditing, setIsEditing] = useState(true);
  //   const onClick = useCallback(
  //     () => {
  //       setIsEditing(!isEditing)
  //     },
  //     [isEditing],
  //   )
    return (
        <div className="App">
            <EditorDemo
                isEditing={isEditing}
                rowHeight={20}
                cols={12}
                width={window.innerWidth}
                data={data}
            />
        </div>
    );
}

export default App;
