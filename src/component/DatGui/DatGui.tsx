import React, { useCallback, useEffect, useState } from "react";
import s from "./DatGui.module.scss";
import * as dat from "dat.gui";

interface DatGuiProps {
  onChange: (data: any) => void;
  configData: { [keys: string]: any };
  defaultData: { [keys: string]: any };
}

interface obgType {
  [keys: string]: any;
}

const DatGui: React.FC<DatGuiProps> = ({ onChange, configData }) => {
  const [height, setheight] = useState(0);
  useEffect(() => {
    const configArr = Object.keys(configData || {});
    const data: obgType = {};
    configArr.forEach((key: string) => {
      const element: any[] = configData[key];
      if (element[0] === "number") {
        data[key] = element[3].default;
      }
    });

    console.log("-----", data);

    const gui = new dat.GUI({
      closeOnTop: true,
    });
    const wrap: any = gui.domElement;
    wrap.parentNode.style.zIndex = 1000;
    wrap.id = "guiwrap";

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined)
        gui
          .add(data, key, configData[key][3].start, configData[key][3].end)
          .name(`${configData[key][1]}${configData[key][2]?`(${configData[key][2]})`:''}`);
    });

    setheight(wrap.offsetHeight);
    gui.width = window.innerWidth;
    return () => {
      gui.destroy();
    };
  }, [configData]);
  const onDataChange = useCallback(() => {
    onChange({});
  }, [onChange]);
  return <div onChange={onDataChange} style={{ height: `${height}px` }} />;
};

export default DatGui;
