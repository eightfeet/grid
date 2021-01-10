import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import DatGui from "../DatGui";
import description from "./../../compiler/description.json";
import s from "./MiniDashboard.module.scss";
import { ActiveModuleContext } from './../../App';

interface objType {
    [keys: string]: any
}

interface MiniDashboardProps {
  appData: objType
}

const MiniDashboard:React.FC<MiniDashboardProps> = function MiniDashboard({appData}) {
  const ref = useRef(null);
  const [conternerHeight, setConternerHeight] = useState();
  const [selected, setSelected] = useState(0);
  const [menus, setMenus] = useState<string[]>([]);
  const [defaultdata, setDefaultdata] = useState({});
  const currentId = useContext(ActiveModuleContext);
  const name = menus[selected];
  const currentConfig = (description as objType)[name];

  useEffect(() => {
    if (ref.current) {
      setConternerHeight((ref.current as any).offsetHeight);
    }
    setMenus(Object.keys(description));

    console.log()

    for (const key in appData) {
      if (Object.prototype.hasOwnProperty.call(appData, key)) {
        const element = appData[key];
        if(element.moduleId === currentId){
          setDefaultdata(element.style.basic[name])
        }
      }
    }
  }, [appData, currentId, name]);

  const onChangeMenu = useCallback(
    (index: number) => () => {
      setSelected(index);
    },
    []
  );
  
  return (
    <div
      className={s.root}
      style={conternerHeight ? { height: `${conternerHeight}px` } : {}}
    >
      <div ref={ref} className={s.conterner}>
        <div className={s.menu}>
          {menus.map((item: any, index: number) => <div key={index} className={index === selected ? s.selected : ''} onClick={onChangeMenu(index)}>{menus[index]}</div>
        )}
        </div>
        <div className={s.content}>
            <DatGui configData={currentConfig} defaultData={defaultdata} onChange={(data) => console.log(data)} />
        </div>
      </div>
    </div>
  );
}

export default MiniDashboard;
