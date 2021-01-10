import React, { useCallback, useEffect, useRef, useState } from "react";
import DatGui from "../DatGui";
import description from "./../../compiler/description.json";
import s from "./MiniDashboard.module.scss";
interface objType {
    [keys: string]: any
}

function MiniDashboard() {
  const ref = useRef(null);
  const [conternerHeight, setConternerHeight] = useState();
  const [selected, setSelected] = useState(0);
  const [menus, setMenus] = useState<string[]>([]);
  useEffect(() => {
    if (ref.current) {
      setConternerHeight((ref.current as any).offsetHeight);
    }
    setMenus(Object.keys(description));
  }, []);

  const onChangeMenu = useCallback(
    (index: number) => () => {
      setSelected(index);
    },
    []
  );
  const name = menus[selected];
  const currentConfig = (description as objType)[name];
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
            <DatGui configData={currentConfig} defaultData={{}} onChange={(data) => console.log(data)} />
        </div>
      </div>
    </div>
  );
}

export default MiniDashboard;
