import React, { useCallback, useEffect, useState } from 'react';
import { AllCssType, AnyObjectType } from 'types/appData';
import s from './Controller.module.scss'
import description from '~/compiler/description.json'

interface Props {
    selected: string
}

const Controller: React.FC<Props> = ({ selected, ...other}) => {
    const [stateData, setStateData] = useState<any>();

    useEffect(() => {
        console.log(444444, other)
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
        controller
    </div>;
};

export default Controller;
