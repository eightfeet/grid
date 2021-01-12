import React, { useCallback, useEffect, useState } from 'react';
import { AnyObjectType, AppDataElementsTypes } from 'types/appData';
import key from 'lodash/keys.js';
import s from './Tabs.module.scss';

interface Props extends AppDataElementsTypes {
    onClick?: () => void;
}

const Tabs: React.FC<Props> = (props) => {
    const { moduleId, onClick, type, ...other } = props;
    const [menu, setmenu] = useState<string[]>([]);
    const [secondmenu, setsecondmenu] = useState<string[]>([]);
    const [current, setcurrent] = useState(null);
    const [secondcurrent, setsecondcurrent] = useState(null);

    useEffect(() => {
        setmenu(key(other));
    }, []);

    const onClickItem = useCallback(
        (item) => () => {
            setcurrent(item);
            setsecondmenu(key((props as AnyObjectType)[item]));
            // console.log('secondmenu', (props as AnyObjectType)[item], key((props as AnyObjectType)[item]));
            // console.log(3333, secondmenu)
        },
        [secondmenu]
    );

    const onClickSecondItem = useCallback(
        (item) => () => {
            setcurrent(item);
        },
        []
    );

    return (
        <>
            <div className={s.firstnemu}>
                {menu.map((item) => (
                    <div
                        className={current === item ? s.selected : ''}
                        onClick={onClickItem(item)}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {secondmenu.length > 0 ? (
                <div className={s.secondmenu}>
                    {secondmenu.map((item) => (
                        <div>{item}</div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default Tabs;
