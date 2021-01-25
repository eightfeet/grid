import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import s from "./GradientSlider.module.scss";
import { dataToStyleObject } from "./helper";
import Color from "../Color";
import { Col, Row } from "antd";
import { BackgroundGradientTypesOfStyleItems } from "types/appData";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

interface Props {
  defaultData?: BackgroundGradientTypesOfStyleItems;
  onChange?: (data: BackgroundGradientTypesOfStyleItems) => void;
}

const GradientSlider: React.FC<Props> = ({ onChange, defaultData }) => {
  const [valuse, setValuse] = useState<number[]>([]);
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [gradientInline, setGradientInline] = useState({});
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );
  const ref = useRef(null);
  const mounted = useRef(false);
  
  const onChangeData = useCallback(
    (data) => {
      if (onChange instanceof Function) {
        onChange(data);
      }
    },
    [onChange]
  );

  /**
   * 还原默认数据到内部状态中
   */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      const { gradient, gradientDirections = "left" } = defaultData || {};
      const defValus: number[] = [],
        defColor: string[] = [];
      if (Array.isArray(gradient)) {
        gradient.forEach((item) => {
          defValus.push(item.transition);
          defColor.push(item.color);
        });
      }

      setValuse(defValus);
      setColorArray(defColor);
    }
  }, [defaultData, moduleId, valuse]);

  useEffect(() => {
    // 设置显示
    const { result, gradient } = dataToStyleObject({
      valuse,
      colors: colorArray,
      gradientDirections: "left",
    });
    setGradientInline(result);
    if (mounted.current) {
      onChangeData(gradient)
    }
  }, [colorArray, onChangeData, valuse]);

  /**
   * 增加颜色状态标记
   */
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
    colors.push(
      `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`
    );
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

  const onColorChange = useCallback(
    (i) => (color: any) => {
      const colors: string[] = [...colorArray];
      const rgba = color.value.rgb;
      colors[i] = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      setColorArray(colors);
    },
    [colorArray]
  );

  return (
    <Row className={s.row}>
      <Col span={5}>渐变背景</Col>
      <Col span={11}>
        <div className={s.GradientSlider}>
          <div className={s.line} style={gradientInline}>
            {colorArray.map((item, i) => (
              <div
                className={s.colorhandle}
                key={i}
                style={{
                  borderColor: `transparent transparent ${colorArray[i]} transparent`,
                  left: `${valuse[i]}%`,
                }}
              >
                <div
                  className={s.delet}
                  onDoubleClick={onDoubleClickColor(i)}
                />
                <Color onChange={onColorChange(i)}>
                  <div
                    className={s.coloritem}
                    style={{ backgroundColor: `${colorArray[i]}` }}
                  ></div>
                </Color>
              </div>
            ))}
          </div>
          <Slider.Range
            ref={ref}
            min={0}
            max={100}
            marks={marks}
            onChange={onChangeSlider}
            value={valuse}
          />
        </div>
      </Col>
      <Col span={1}></Col>
      <Col span={7}>类型</Col>
    </Row>
  );
};

export default GradientSlider;
