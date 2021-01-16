import React, { useEffect, useState } from 'react';
import Controller from './../Controller'
import s from './Dashboard.module.scss';
import { connect } from 'react-redux';
import { RootState } from '~/redux/store';

type StateProps = ReturnType<typeof mapState>;

interface Props {
}

const Dashboard:React.FC<Props & StateProps> = ({activationItem, ...other}) => {
    const [editData, setEditData] = useState<any>();
    useEffect(() => {
        const {layout, ...other} = activationItem;
        if (activationItem.moduleId) {
            setEditData(other)
          }
          
    }, [activationItem])

    return (
        <div className={s.root}>
            <Controller  selected={editData} {...other} />
        </div>
    )
}

const mapState = (state: RootState) => ({
    activationItem: state.activationItem
  });
  
export default connect(mapState)(Dashboard);
