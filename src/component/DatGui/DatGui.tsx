import React, { useCallback, useEffect, useState } from "react";
import { initGui } from "./guihelper";


interface DatGuiProps {
  onChange: (data: any) => void;
  configData: { [keys: string]: any };
  defaultData: { [keys: string]: any };
}

const DatGui: React.FC<DatGuiProps> = ({ onChange, configData }) => {
  const [height, setheight] = useState(0);
  
  useEffect(() => {
    const gui = initGui(configData, setheight);
    return () => {
      if (gui) {
        gui.destroy();
      }
    };
  }, [configData]);
  const onDataChange = useCallback(() => {
    onChange({});
  }, [onChange]);
  return <div onChange={onDataChange} style={{ height: `${height}px` }} />;
};

export default DatGui;
