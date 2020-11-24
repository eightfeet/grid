import React, { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import classNames from "classnames";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import s from "./test.module.scss";
import GridLine from "./../GridLine";

interface EditorProps {
  /**
   * 页面是否正在编辑
   * @type {boolean}
   * @memberof EditorProps
   */
  isEditing?: boolean;
  /**
   * 单行高度
   * @type {number}
   * @memberof EditorProps
   */
  rowHeight: number;
  /**
   * 布局列数
   * @type {number}
   * @memberof EditorProps
   */
  cols: number;
  /**
   * 宽度
   * @type {number}
   * @memberof EditorProps
   */
  width?: number;
  /**
   * 高度
   * @type {number}
   * @memberof EditorProps
   */
  height?: number;
  /**
   * 编辑器数据
   * @type {{
   *     layout: GridLayout.Layout;
   *     config: any
   *   }[]}
   * @memberof EditorProps
   */
  data: {
    layout: GridLayout.Layout;
    config: any
  }[]
}

/**
 * 编辑器
 *
 * @param {EditorProps} { isEditing, rowHeight, cols, width, height, data}
 * @return {*} 
 */
function EditorDemo({ isEditing, rowHeight, cols, width, height, data}: EditorProps) {
  const [wrapWidth, setWrapWidth] = useState(0);
  const [wrapHeight, setWrapHeight] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setSize()
  }, [width, height]);

  const setSize = () => {
    let height = 0;
    let width = 0;
    if (ref !== null) {
      if (!ref.current) {
        return
      }
      height = (ref.current as any).scrollHeight;
      width = (ref.current as any).scrollWidth; 
      setWrapHeight(height);
      setWrapWidth(width);
    }
  }

  const onLayoutChange = () => {
    setTimeout(() => {
      setSize()
    });
  };

  return (
    <div className={s.layout} ref={ref}>
      {isEditing ? (
        <GridLine
          width={window.innerWidth}
          cols={cols}
          rowHeight={rowHeight}
          height={wrapHeight}
          space={10}
        />
      ) : null}
      <GridLayout
        onLayoutChange={onLayoutChange}
        cols={cols}
        rowHeight={rowHeight}
        width={wrapWidth}
        autoSize
      >
        {data.map(({layout, config}) => (
          <div
            className={classNames(s.block, !isEditing ? null : s.modify)}
            key={layout.i}
            data-grid={{...layout, static: !isEditing}}
          >
            <div className={layout.i === "b" ? s.blockcon : ""}>{layout.i}{JSON.stringify(config)}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default EditorDemo;
