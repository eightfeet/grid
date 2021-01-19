import React, { useCallback, useEffect, useState } from "react";
import { AppDataElementsTypes } from "types/appData";
import { connect } from 'react-redux';
import Display from '~/components/MiniDashboard/Display';
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

const Controller: React.FC<Props & StateProps & DispatchProps> = ({ selected, controller, updateAppData, appData }) => {
  const [stateData, setStateData] = useState<any>();
  const update = useMergeAppData()
  
  useEffect(() => {
    setStateData(selected);
  }, [selected, stateData]);

  const onChangeFont = useCallback(
    (result: any) => {
      update({basic: {
        font: result.values
      }});
    },
    [update]
  );

  const onChangeDisplay = useCallback(
    (result: any) => {
      update({basic: {
        display: result.values
      }});
    },
    [update]
  );

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="布局" key="1">
          <Display onChange={onChangeDisplay} defaultData={selected?.style?.basic?.display || {}}  />
        </Panel>
        <Panel header="文字" key="2">
          <Font onChange={onChangeFont} defaultData={selected?.style?.basic?.font || {}} />
        </Panel>
      </Collapse>
    </div>
  );
};


const mapState = (state: RootState) => ({
  appData: state.appData,
  activationItem: state.activationItem,
  controller: state.controller,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateAppData: dispatch.appData.updateAppData,
  updateActivationItem: dispatch.activationItem.updateActivationItem,
});

export default connect(mapState, mapDispatch)(Controller);
