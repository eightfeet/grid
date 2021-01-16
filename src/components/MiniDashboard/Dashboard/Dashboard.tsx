import React, { useCallback, useEffect, useState } from 'react';
import { AppDataElementsTypes } from 'types/appData';
import Tabs from '~/components/MiniDashboard/Tabs';
import Controller from './../Controller'
import s from './Dashboard.module.scss';
import { connect } from 'react-redux';
import { RootState } from '~/redux/store';

type StateProps = ReturnType<typeof mapState>;

interface Props extends AppDataElementsTypes {
}

const Dashboard:React.FC<Props & StateProps> = ({activationItem, ...other}) => {
    const [editData, setEditData] = useState<any>();
    useEffect(() => {
        const {layout, ...other} = activationItem;
        if (activationItem.moduleId) {
            setEditData(other)
          }
          
    }, [activationItem])

    const onClick = useCallback(
        (selected) => {
            setEditData(selected)
        },
        [],
    )
    return (
        <div className={s.root}>
            <Tabs {...other} onClick={onClick} />
            <Controller  selected={editData} {...other} />
        </div>
    )
}

const mapState = (state: RootState) => ({
    activationItem: state.activationItem
  });
  
export default connect(mapState)(Dashboard);
