import React, { useCallback, useEffect, useRef, useState } from "react";
import { Color as ColorType, SketchPicker } from "react-color";
import { Row, Col } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import s from "./Color.module.scss";
import ClassNames from "classnames";
const parse = require("color-parse");
interface Props {
  defaultColor?: string;
  label?: string;
  onChange: (result: { name: "color"; value: ColorType }) => void;
}

const Color: React.FC<Props> = ({
  defaultColor,
  label,
  onChange,
  children,
  ...other
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState();
  const [pickWrapStyle, setPickWrapStyle] = useState({});
  const picker = useRef(null);

  useEffect(() => {
    if (defaultColor) {
      const optColor: any = {};
      const temp = parse(defaultColor);
      if (temp.space) {
        optColor.r = temp.values[0];
        optColor.g = temp.values[1];
        optColor.b = temp.values[2];
        optColor.a = temp.alpha;
        setColor(optColor);
      }
    } else {
      setColor(undefined);
    }
  }, [defaultColor]);

  const handleClick = useCallback(
    (e) => {
      setDisplayColorPicker(!displayColorPicker);
      const style: any = {
        position: "absolute",
      };

      const width = document.body.offsetWidth,
        height = document.body.offsetHeight,
        sWidth = 270,
        sHeight = 350,
        X = e.screenX,
        Y = e.screenY;

        // 1、判断拾色器的宽度小于窗口宽度
        if (width > sWidth) {
          if (X + sWidth > width) {
            style.position = 'fixed';
            style.right = `10px`;
          }
        }
        // 2、判断拾色器的高度大于窗口高度
        if (height > sHeight) {
          if (Y + sHeight > height) {
            style.position = 'fixed';
            style.bottom = `10px`;
          }
        }
      setPickWrapStyle(style);
    },
    [displayColorPicker]
  );

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

  const renderColor = () => {
    return (
      <>
        {displayColorPicker ? (
          <div className={s.popover}>
            <div className={s.cover} onClick={handleClose} />
            <div className={s.wrap} style={pickWrapStyle} ref={picker}>
              <SketchPicker
                color={color || undefined}
                width="250px"
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      {children ? (
        <>
          <span {...other} onClick={handleClick}>
            {children}
          </span>
          {renderColor()}
        </>
      ) : (
        <Row className={s.row} gutter={4}>
          <Col className={s.label} span={10}>
            {label || ""}
          </Col>
          <Col span={10}>
            <div className={s.swatch} onClick={handleClick}>
              {color ? (
                <div
                  className={s.color}
                  style={{
                    backgroundColor: `rgba(${(color as any).r}, ${
                      (color as any).g
                    }, ${(color as any).b}, ${(color as any).a})`,
                  }}
                />
              ) : (
                <div className={ClassNames(s.color, s.empty)}>
                  <BgColorsOutlined />
                </div>
              )}
              {renderColor()}
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      )}
    </>
  );
};

export default Color;
