import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnyObjectType, StyleItemsTypes, AppDataElementsTypes, AppDataLayoutItemTypes } from "types/appData";
import { connect } from 'react-redux';
import { RootState, Dispatch } from '~/redux/store';

import s from "./Controller.module.scss";

import description from "~/compiler/description.json";

import { Collapse } from "antd";
import Font from "../Font";
import Display from "../Display";

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

const { Panel } = Collapse;

interface Props {
  selected: AppDataElementsTypes;
}

const Controller: React.FC<Props & StateProps & DispatchProps> = ({ selected, updateAppData, appData }) => {
  const [stateData, setStateData] = useState<any>();
  // const [operateAppdata, setOperateAppdata] = useState(appData);
  const operateAppdata = useRef(appData);

  useEffect(() => {
    console.log(333, operateAppdata.current)
  }, []);

  const onChange = useCallback(
    (reuslt: any) => {
      // 数据清洗
      //1、取出原始基本样式
      const origBasicStyle:StyleItemsTypes = {...selected.style?.basic};
      //2、 合并origBasicStyle[type]和result.values到mergeTypeStyle
      const mergeTypeStyle = {...((origBasicStyle as AnyObjectType)[reuslt.type] || {}), ...reuslt.values};
      //3、重置原始数据 origBasicStyle[result.type]
      (origBasicStyle as any)[reuslt.type] = mergeTypeStyle
      
      // 将清洗后的数据给还主数据

      const operateData: any = [];
      console.log(3333, 1)
      operateAppdata.current?.forEach(item => {
        
        if (item.moduleId === selected.moduleId) {
          const operateItem = {...item};
          operateItem.style.basic = origBasicStyle;
          operateData.push(operateItem)
        } else {
          operateData.push(item)
        }
      })
      console.log('operateData', operateData)
      updateAppData(operateData)
    },
    [operateAppdata, selected, updateAppData]
  );

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        {/* <Panel header="布局" key="1">
          <Display />
        </Panel> */}
        <Panel header="文字" key="1">
          <Font onChange={onChange} />
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
  updateAppData: dispatch.appData.updateAppData
});

export default connect(mapState, mapDispatch)(Controller);
