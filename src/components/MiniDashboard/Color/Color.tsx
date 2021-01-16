import React, { useCallback, useState } from "react";
import { Color as ColorType, SketchPicker } from "react-color";
import { AnyObjectType } from "types/appData";
import { Row, Col } from "antd";
import s from "./Color.module.scss";

interface Props {
  defaultColor?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  label?: string;
  onChange: (result: { name: "color"; value: ColorType }) => void;
}

const Color: React.FC<Props> = ({ defaultColor, label, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState<ColorType>(
    defaultColor || { r: 0, g: 0, b: 0, a: 1 }
  );

  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleChange = useCallback(
    (color) => {
      setColor(color.rgb);
      onChange({
        name: "color",
        value: color,
      });
    },
    [onChange]
  );

  return (
    <>
      <Row className={s.row} gutter={4}>
        <Col className={s.label} span={10}>
          {label || ""}
        </Col>
        <Col span={10}>
          <div className={s.swatch} onClick={handleClick}>
            <div
              className={s.color}
              style={{
                backgroundColor: `rgba(${(color as AnyObjectType).r}, ${
                  (color as AnyObjectType).g
                }, ${(color as AnyObjectType).b}, ${
                  (color as AnyObjectType).a
                })`,
              }}
            />
          </div>
        </Col>
        <Col span={4}></Col>
        {displayColorPicker ? (
          <div className={s.popover}>
            <div className={s.cover} onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </div>
        ) : null}
      </Row>
    </>
  );
};

export default Color;
