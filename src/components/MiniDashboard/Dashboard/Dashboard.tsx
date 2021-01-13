import React, { useCallback, useState } from 'react';
import { AllCssType, AppDataElementsTypes } from 'types/appData';
import Tabs from '~/components/MiniDashboard/Tabs';
import Controller from './../Controller'
import s from './Dashboard.module.scss';

interface Props extends AppDataElementsTypes {
}



const Dashboard:React.FC<Props> = (props) => {
    const [editData, setEditData] = useState<{data: AllCssType, datapath: string[], moduleId: string}>()
    const onClick = useCallback(
        ({data, datapath, moduleId}) => {
            console.log('当前编辑', data, datapath, moduleId)
            setEditData({data, moduleId, datapath})
        },
        [],
    )
    return (
        <div className={s.root}>
            <Tabs {...props} onClick={onClick} />
            <Controller  {...editData} />
        </div>
    )
}

export default Dashboard
