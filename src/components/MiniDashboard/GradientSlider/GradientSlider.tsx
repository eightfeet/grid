import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import s from "./GradientSlider.module.scss";
import { backgroundGradient } from "~/compiler/compiler";

const GradientSlider = () => {
  const [valuse, setValuse] = useState<number[]>([]);
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [gradient, setGradient] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (valuse.length <= 1) {
      setGradient({});
    } else {
      const gradient: any = {
        gradient: [],
        gradientDirections: "left",
      };

      valuse.forEach((item, i) => {
        const temp = {
          color: colorArray[i],
          transition: item,
        };
        gradient.gradient.push(temp);
      });
      const gradientStyle = backgroundGradient(gradient);
      setGradient(gradientStyle.result);
    }
  }, [valuse, colorArray]);

  const addMarks = useCallback(() => {
    const data: number[] = [...valuse];
    const colors: string[] = [...colorArray];
    data.map((item, index) => {
      if (index === 0) {
        return item;
      } else {
        return item - 1;
      }
    });
    data.push((data[data.length - 1] || 0) + 1);
    colors.push(`rgb(255, ${Math.ceil(Math.random() * 255)}, 0)`);
    setColorArray(colors);
    setValuse(data);
  }, [colorArray, valuse]);

  const onChangeSlider = useCallback((value) => {
    setValuse(value);
  }, []);

  const marks = {
    100: <strong onClick={addMarks}>+</strong>,
  };

  const onDoubleClickColor = useCallback(
    (index) => () => {
      const newValuse = valuse.filter((item: number, i) => index !== i);
      const newColor = colorArray.filter((item: string, i) => index !== i);
      setValuse(newValuse);
      setColorArray(newColor);
    },
    [colorArray, valuse]
  );

  return (
    <div className={s.GradientSlider}>
      <div className={s.line} style={gradient}>
        {colorArray.map((item, i) => (
          <div
            onDoubleClick={onDoubleClickColor(i)}
            className={s.colorhandle}
            key={i}
            style={{
              borderColor: `transparent transparent ${colorArray[i]} transparent`,
              left: `${valuse[i]}%`,
            }}
          />
        ))}
      </div>
      <Slider.Range
        ref={ref}
        onAfterChange={(da) => console.log(da)}
        min={0}
        max={100}
        marks={marks}
        onChange={onChangeSlider}
        value={valuse}
      />
    </div>
  );
};

export default GradientSlider;
