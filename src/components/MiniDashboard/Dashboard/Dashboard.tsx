import React, { useCallback, useState } from 'react';
import { AllCssType, AppDataElementsTypes } from 'types/appData';
import Tabs from '~/components/MiniDashboard/Tabs';
import Controller from './../Controller'
import s from './Dashboard.module.scss';

interface Props extends AppDataElementsTypes {
}



const Dashboard:React.FC<Props> = (props) => {
    const [editData, setEditData] = useState<string>()
    const onClick = useCallback(
        (selected) => {
            setEditData(selected)
        },
        [],
    )
    return (
        <div className={s.root}>
            <Tabs {...props} onClick={onClick} />
            {/* <Controller  selected={editData} /> */}
        </div>
    )
}

export default Dashboard
