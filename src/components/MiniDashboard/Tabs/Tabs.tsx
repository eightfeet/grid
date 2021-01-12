import React, { useCallback, useEffect, useState } from "react";
import { AnyObjectType, AppDataElementsTypes } from "types/appData";
import key from "lodash/keys.js";
import get from "lodash/get.js";
import s from "./Tabs.module.scss";

interface Props extends AppDataElementsTypes {
  onClick?: () => void;
}

const Tabs: React.FC<Props> = (props) => {
  const { moduleId, onClick, type, content, style, event } = props;
  const [menuData, setmenuData] = useState<AnyObjectType[]>([]);
  const [path, setpath] = useState<string[]>([]);
  const [menuGod, setmenuGod] = useState<{[keys: number]: any}>({})

  useEffect(() => {

        // const aaa = ['a','b','c',['d','e','f',['g','h','i']]];
        // const t = get(aaa, '[3][3][0]');
        // console.log(t);

        const optData: AnyObjectType = {content, style, event}

        const handleObj = (Obj: AnyObjectType) => {
            const temp:any = [];
            if (Object.prototype.toString.call(Obj) === '[object Object]') {
                Object.keys(Obj).forEach((key, i) => {
                    const element = Obj[key];
                    temp.push({
                        name: key,
                        value: handleObj(element)
                    });
                    
                })
            }
            return temp
        }

        setmenuGod({0:['content', 'style', 'event']})

        setmenuData(handleObj(optData))

  }, []);

  const onClickItem = useCallback(
    e => {
        const nextpath = e.target.getAttribute('data-path');
        const nextleve = parseInt(e.target.getAttribute('data-leve'));
        const newpath = [...path];
        newpath[nextleve] = nextpath;
        setpath(newpath)
        
        const newMenuGod: any = {};
        for (let index = 0; index < nextleve + 1; index++) {
            newMenuGod[index] = menuGod[index];
        }
        newMenuGod[nextleve + 1] = get(menuData, newpath.join(''));
        setmenuGod(newMenuGod);

    },
    [path, menuGod, menuData]
  );

  // [0, ]
  const renderMenu = () => {
      const nodes: any[] = [];
      Object.keys(menuGod).forEach((key: any, y) => {
        const element = menuGod[key];
        const eles: any[] = [];
        if (Array.isArray(element)) {
            element.forEach((el, x) => {
                eles.push(<div onClick={onClickItem} data-path={`[${x}].value`} data-leve={y} key={el.name || el}>(x:{x}){el.name || el}(y:{y})</div>)
            });
            nodes.push(<div className={s[`stage${key}`]} key={y}>{eles}</div>)
        }
      })
      return nodes;
  }

  return (
    <>
        {renderMenu()}
    </>
  );
};

export default Tabs;
