import React from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.scss';
import EditorDemo from './EditorDemo';

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
    return (
        <div className="App">
            <EditorDemo
                isEditing={false}
                rowHeight={20}
                cols={12}
                width={window.innerWidth}
                data={data}
            />
        </div>
    );
}

export default App;
