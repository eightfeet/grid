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
  const [gradientDirections, setGradientDirections] = useState("left");
  const [, setGradient] = useState<
    BackgroundGradientTypesOfStyleItems | undefined
  >({});
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );
  const ref = useRef(null);
  const didMount = useRef(false);
  
  const updateGradient = useCallback(
    (colors: string[], valuse: number[], directions?: string) => {
      // 设置渐变条位置，色值，渐变方向
      const { result, gradient } = dataToStyleObject({
        valuse,
        colors,
        gradientDirections: directions || gradientDirections,
      });
      console.log(valuse, colors);
      setValuse(valuse);
      setColorArray(colors);
      setGradientDirections(directions || gradientDirections);
      setGradient(gradient);
      // 组件回显设置
      setGradientInline(result);
      return gradient;
    },
    [gradientDirections]
  );

  const onChangeData = useCallback(
    (data) => {
      if (onChange instanceof Function) {
        onChange(data);
      }
    },
    [onChange]
  );

  /**
   * didMount
   */
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      // 取出渐变与渐变方向
      const { gradient, gradientDirections } = defaultData || {};
      // 获取默认值与颜色
      const defValus: number[] = [],
        defColor: string[] = [];
      if (Array.isArray(gradient)) {
        gradient.forEach((item) => {
          defValus.push(item.transition);
          defColor.push(item.color);
        });
      }
      // 更新渐变数值
      updateGradient(defColor, defValus, gradientDirections);
    }
  }, [defaultData, moduleId, updateGradient]);

  /**
   * will unmount by props moduleId change
   */
  useEffect(() => {
    return () => {
      didMount.current = false
    }
  }, [moduleId])

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
    const result = updateGradient(colors, data);
    onChangeData(result);
  }, [colorArray, onChangeData, updateGradient, valuse]);

  const onChangeSlider = useCallback(
    (value) => {
      const result = updateGradient(colorArray, value);
      onChangeData(result);
    },
    [colorArray, onChangeData, updateGradient]
  );

  const marks = {
    100: <strong onClick={addMarks}>+</strong>,
  };

  const onDoubleClickColor = useCallback(
    (index) => (e: any) => {
      const newValuse = valuse.filter((item: number, i) => index !== i);
      const newColor = colorArray.filter((item: string, i) => index !== i);
      const result = updateGradient([...newColor], [...newValuse]);
      onChangeData(result);
    },
    [colorArray, onChangeData, updateGradient, valuse]
  );

  const onColorChange = useCallback(
    (i) => (color: any) => {
      const colors: string[] = [...colorArray];
      const rgba = color.value.rgb;
      colors[i] = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      const result = updateGradient(colors, valuse);
      onChangeData(result);
    },
    [colorArray, onChangeData, updateGradient, valuse]
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
                  key={i}
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
