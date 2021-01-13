import React, { useCallback, useEffect, useState } from 'react';
import { AnyObjectType, AppDataElementsTypes } from 'types/appData';
import get from 'lodash/get.js';
import s from './Tabs.module.scss';

interface Props extends AppDataElementsTypes {
    onClick?: (data: {
        data: AnyObjectType;
        datapath: string[];
        moduleId: string;
    }) => void;
}

const Tabs: React.FC<Props> = (props) => {
    const { content, style, event, onClick, moduleId } = props;
    const [menuData, setmenuData] = useState<AnyObjectType[]>([]);
    const [displayMenuData, setdisplayMenuData] = useState<AnyObjectType>({
        0: {
            path: '',
            current: '',
            names: ['content', 'style', 'event'],
        },
    });
    const [path, setpath] = useState('');

    useEffect(() => {
        const optData: AnyObjectType = { content, style, event };
        const handleObj = (Obj: AnyObjectType) => {
            const temp: any = [];
            if (Object.prototype.toString.call(Obj) === '[object Object]') {
                Object.keys(Obj).forEach((key, i) => {
                    const element = Obj[key];
                    const checktype = Object.prototype.toString.call(element);
                    if (
                        checktype === '[object Object]' ||
                        checktype === '[object Array]'
                    ) {
                        temp.push({
                            name: key,
                            value: !!element?.gradient
                                ? []
                                : handleObj(element),
                        });
                    }
                });
            }
            return temp;
        };
        const treeData = handleObj(optData);
        console.log(JSON.stringify(treeData, null, 2));
        setmenuData(treeData);
    }, [content, style, event]);

    const clickItemB = useCallback(
        (y, name) => (e: any) => {
            // console.log(item, key, e.target.getAttribute('data-next'));
            const path = e.target.getAttribute('data-path');
            setpath(path);
            const nextOrgData = get(menuData, path);
            const data: AnyObjectType = {};
            // 还原历史数据
            const nextKey = parseInt(y) + 1;
            for (let index = 0; index < nextKey; index++) {
                data[index] = displayMenuData[index];
            }
            data[nextKey - 1].current = name;
            data[nextKey] = {
                path,
                current: '',
                names: nextOrgData.map((el: AnyObjectType) => el.name) || {},
            };
            setdisplayMenuData(data);

            // 结果处理
            if (nextOrgData.length === 0) {
                const orgPath: string[] = [];
                Object.keys(data).forEach((item: any) => {
                    const element = data[item];
                    if (element.current) {
                        orgPath.push(element.current);
                    }
                });
                const optData: AnyObjectType = { content, style, event };
                const result: AnyObjectType = get(optData, orgPath.join('.'));
                if (onClick instanceof Function) {
                    onClick({
                        data: result,
                        datapath: orgPath,
                        moduleId,
                    });
                }
            } else {
                if (onClick instanceof Function) {
                    onClick({
                        data: {},
                        datapath: [],
                        moduleId: '',
                    });
                }
            }
        },
        [menuData, displayMenuData, path]
    );

    const renderMenu = () => {
        // 数据数组
        const menu: any[] = Object.keys(displayMenuData);
        const data = menu.map((y) => {
            const displayData = displayMenuData[y] as AnyObjectType;
            return (
                <div key={y} className={s[`stage${y}`]}>
                    {displayData?.names.map((name: string, x: number) => (
                        <div
                            key={x}
                            className={
                                displayData?.current === name
                                    ? s.selected
                                    : undefined
                            }
                            data-path={`${displayData.path || ''}[${x}].value`}
                            onClick={clickItemB(y, name)}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            );
        });
        return data;
    };

    return <div>{renderMenu()}</div>;
};

export default Tabs;
