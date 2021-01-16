import React, { useCallback, useEffect, useState } from "react";
import { AnyObjectType, StyleItemsTypes, AppDataElementsTypes } from "types/appData";
import { connect } from 'react-redux';
import { RootState, Dispatch } from '~/redux/store';

import s from "./Controller.module.scss";

import { Collapse } from "antd";
import Font from "../Font";
import useMergeAppData from "~/hooks/useMergeAppData";

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

const { Panel } = Collapse;

interface Props {
  selected: AppDataElementsTypes;
}

const Controller: React.FC<Props & StateProps & DispatchProps> = ({ selected, updateAppData, appData }) => {
  const [stateData, setStateData] = useState<any>();
  const update = useMergeAppData()
  
  useEffect(() => {
    setStateData(selected);
  }, [selected, stateData]);

  const onChange = useCallback(
    (result: any) => {
      update({basic: {
        font: result.values
      }});
    },
    [update]
  );

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        {/* <Panel header="布局" key="1">
          <Display />
        </Panel> */}
        <Panel header="文字" key="1">
          <Font onChange={onChange} defaultData={selected?.style?.basic?.font || {}} />
        </Panel>
      </Collapse>
    </div>
  );
};


const mapState = (state: RootState) => ({
  appData: state.appData,
  activationItem: state.activationItem,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateAppData: dispatch.appData.updateAppData,
  updateActivationItem: dispatch.activationItem.updateActivationItem,
});

export default connect(mapState, mapDispatch)(Controller);
