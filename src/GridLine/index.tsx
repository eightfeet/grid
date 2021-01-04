import React, { useState, useEffect } from "react";
import s from "./style.module.scss";

interface GridLineProps {
  height: number;
  width: number;
  cols: number;
  rowHeight: number;
  space: number;
}

/**
 * 编辑参考线
 * @export
 * @param {GridLineProps} {
 *   height,
 *   width,
 *   cols,
 *   rowHeight,
 *   space,
 * }
 * @return {*} 
 */
export default function GridLine({
  height,
  width,
  cols,
  rowHeight,
  space,
}: GridLineProps) {
  const [xl, setxl] = useState<any>([]);
  const [yl, setyl] = useState<any>([]);
  useEffect(() => {
    const xdata = [];
    const ydata = [];
    // y间隔
    for (let index = 10; index < height; index += rowHeight + space) {
      xdata.push({ top: Math.floor(index - space) });
      xdata.push({ top: Math.floor(index) });
    }

    // x间隔
    const stx = (width - 10) / cols;
    for (let index = 10; index <= width + 10; index += stx) {
      ydata.push({ left: Math.floor(index) });
      ydata.push({ left: Math.floor(index - 10) });
    }

    setxl(xdata);
    setyl(ydata);
    return () => {};
  }, [cols, height, rowHeight, space, width]);

  return (
    <div className={s.cwrap} style={{ minHeight: window.innerHeight }}>
      {xl.map(({ top }: any) => (
        <div key={top} className={s.x} style={{ top }} />
      ))}
      {yl.map(({ left }: any) => (
        <div key={left} className={s.y} style={{ left }} />
      ))}
    </div>
  );
}
