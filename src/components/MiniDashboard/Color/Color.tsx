import React, { useCallback, useState } from "react";
import { Color as ColorType, SketchPicker } from "react-color";
import { AnyObjectType } from "types/appData";
import s from "./Color.module.scss";

interface Props {
  defaultColor?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  label?: string;
  onChange: (color: ColorType) => void;
}

const Color: React.FC<Props> = ({ defaultColor, label }) => {
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

  const handleChange = useCallback((color) => {
    console.log(333, color);
    setColor(color.rgb);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.label}>{label}</div>
      <div className={s.swatch} onClick={handleClick}>
        <div
          className={s.color}
          style={{
            backgroundColor: `rgba(${(color as AnyObjectType).r}, ${
              (color as AnyObjectType).g
            }, ${(color as AnyObjectType).b}, ${(color as AnyObjectType).a})`,
          }}
        />
      </div>
      {displayColorPicker ? (
        <div className={s.popover}>
          <div className={s.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default Color;
