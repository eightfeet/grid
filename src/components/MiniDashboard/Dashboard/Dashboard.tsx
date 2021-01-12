import React from 'react';
import { AppDataElementsTypes } from 'types/appData';
import Tabs from '~/components/MiniDashboard/Tabs';
import Controller from './../Controller'
import s from './Dashboard.module.scss';

interface Props extends AppDataElementsTypes {

}

const Dashboard:React.FC<Props> = (props) => {
    return (
        <div className={s.root}>
            <Tabs {...props} />
            <Controller {...props} />
        </div>
    )
}

export default Dashboard
