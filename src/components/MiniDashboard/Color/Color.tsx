import React, { useCallback, useState } from "react";
import { Color as ColorType, SketchPicker } from "react-color";
import { AnyObjectType } from "types/appData";
import { Row, Col } from "antd";
import { BgColorsOutlined } from '@ant-design/icons';
import s from "./Color.module.scss";
import ClassNames from "classnames";
const parse = require('color-parse');
interface Props {
  defaultColor?: string;
  label?: string;
  onChange: (result: { name: "color"; value: ColorType }) => void;
}

const Color: React.FC<Props> = ({ defaultColor, label, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(() => {
    const optColor: any = {};
    const temp = parse(defaultColor);
    if (!temp.space) {
      return undefined
    }
    optColor.r = temp.values[0];
    optColor.g = temp.values[1];
    optColor.b = temp.values[2];
    optColor.a = temp.alpha;
    return optColor
  }
    
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
            {color ? <div
              className={s.color}
              style={{
                backgroundColor: `rgba(${(color as AnyObjectType).r}, ${
                  (color as AnyObjectType).g
                }, ${(color as AnyObjectType).b}, ${
                  (color as AnyObjectType).a
                })`,
              }}
            /> :<div
            className={ClassNames(s.color, s.empty)}>
              <BgColorsOutlined />
            </div>
          }
          </div>
        </Col>
        <Col span={4}></Col>
        {displayColorPicker ? (
          <div className={s.popover}>
            <div className={s.cover} onClick={handleClose} />
            <SketchPicker color={color || undefined} onChange={handleChange} />
          </div>
        ) : null}
      </Row>
    </>
  );
};

export default Color;
