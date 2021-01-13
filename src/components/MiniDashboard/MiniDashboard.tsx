import React from "react";
import { connect } from 'react-redux';
import { RootState } from '~/redux/store';
import LazyLoader from '~/components/LazyLoader';

type StateProps = ReturnType<typeof mapState>;

interface objType {
    [keys: string]: any
}

interface MiniDashboardProps {
  appData: objType
}

const MiniDashboard:React.FC<MiniDashboardProps & StateProps> = function MiniDashboard(props) {
  const { activationItem } = props;
  console.log('activationItem', activationItem)
  if (!activationItem.id || !activationItem.item) {
    return null
  }
  const {layout, ...other} = activationItem.item;
  return (<LazyLoader path={'components/MiniDashboard/Dashboard'}  {...other} />);
}

const mapState = (state: RootState) => ({
  activationItem: state.activationItem
});

export default connect(mapState)(MiniDashboard);