import React, { useCallback, useEffect, useState } from 'react';
import { AllCssType, AnyObjectType } from 'types/appData';
import s from './Controller.module.scss'
import description from '~/compiler/description.json'

interface Props {
    selected: string
}

const Controller: React.FC<Props> = ({ selected }) => {
    const [stateData, setStateData] = useState<any>();

    useEffect(() => {
        setStateData((description as AnyObjectType)[selected])
    }, [selected, stateData])

    const onChange = useCallback(
        (key) => () => {
            // if (Object.prototype.toString.call(stateData) === '[object Object]') {
            //     Object.keys(stateData).forEach(stateDataKey => {
            //         const item = stateData[stateDataKey];
            //         if (key === stateDataKey) {
            //             console.log('对上了', item)
            //         }
            //     })
            // }
            
            console.log(key)
        },
        [],
    )

    
    return <div className={s.root}>
        {Object.keys(stateData)?.map(key => <li><input  /></li>)}
    </div>;
};

export default Controller;
