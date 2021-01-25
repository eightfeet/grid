import React, {  } from 'react';
import Controller from './../Controller'
import s from './Dashboard.module.scss';

interface Props {
}

const Dashboard:React.FC<Props> = () => {
    return (
        <div className={s.root}>
            <Controller />
        </div>
    )
}
  
export default Dashboard;
