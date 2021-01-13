import React, { useCallback, useEffect, useState } from 'react';
import { AllCssType, AnyObjectType } from 'types/appData';
import s from './Controller.module.scss'

interface Props {
    data?: AllCssType
    datapath?: string[];
    moduleId?: string;
}

const Controller: React.FC<Props> = ({ data }) => {
    const [stateData, setStateData] = useState<any>();

    useEffect(() => {
        setStateData(data)
    }, [stateData])

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
        [stateData],
    )

    const renderObject = (data: {} | undefined) => {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            const result: JSX.Element[] = [];
            const editData: AnyObjectType = data || {};
            console.log('editData', editData)
            Object.keys(editData).forEach(key => {
                    const item = editData[key];
                    if (Array.isArray(item)) {
                        const els = item.map(el => renderObject(el))
                        result.push(<li>{els}</li>)
                    } else {
                        result.push(<li><label key={key}>{key}: <input value={item} onChange={onChange(key)} /></label></li>)
                    }
                })


            return <ul>{result}</ul>;
        }
    }
    
    return <div className={s.root}>
        {renderObject(stateData)}
    </div>;
};

export default Controller;
