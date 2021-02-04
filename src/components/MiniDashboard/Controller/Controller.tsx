import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

import { Collapse } from "antd";
import Display from "../Display";
import Font from "../Font";
import Background from "../Background";

import useMergeAppData from "~/hooks/useMergeAppData";
import s from "./Controller.module.scss";
import Shadow from "../Shadow";
import Border from "../Border";
import Transform from "../Transfrom";

const { Panel } = Collapse;

interface Props {
}

const Controller: React.FC<Props> = () => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.controller.unit);
  const update = useMergeAppData();

  const onChangeFont = useCallback(
    (result: any) => {
      update(result, 'style.basic.font');
    },
    [update]
  );

  const onChangeDisplay = useCallback(
    (result: any) => {
      update(result, 'style.basic.display');
    },
    [update]
  );

  const onChangeBackgroundCommon = useCallback(
    (result: any) => {
      if (result.type === 'backgroundCommon') {
        update(result.values, 'style.basic.backgroundCommon');
      }
      if (result.type === 'backgroundGradient') {
        update(result.values, 'style.basic.backgroundGradient');
      }
      
    },
    [update]
  );

  const onChangeShadow = useCallback(
    (result: any) => {
      if (result.type === 'boxShadow') {
        update(result.values, 'style.basic.boxShadow');
      }
      if (result.type === 'textShadow') {
        update(result.values, 'style.basic.textShadow');
      }
      
    },
    [update],
  )

  const onChangeBorder = useCallback(
    (result: any) => {
      update(result, 'style.basic.border');
    },
    [update],
  )

  const onChangeTransfrom = useCallback(
    (result: any) => {
      console.log(result)
      update(result, 'style.basic.transform');
    },
    [update],
  )

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={['3']}>
        <Panel header="变换" key="1">
          <Transform 
            unit={unit}
            onChange={onChangeTransfrom}
            defaultDate={selected?.style?.basic?.transform || {}}
          />
        </Panel>
        <Panel header="布局" key="2">
          <Display
            unit={unit}
            onChange={onChangeDisplay}
            defaultData={selected?.style?.basic?.display || {}}
          />
        </Panel>
        <Panel header="文字" key="3">
          <Font
            unit={unit}
            onChange={onChangeFont}
            defaultData={selected?.style?.basic?.font || {}}
          />
        </Panel>
        <Panel header="背景" key="4">
          <Background
            unit={unit}
            onChange={onChangeBackgroundCommon}
            defaultBGCommonData={selected?.style?.basic?.backgroundCommon || {}}
            defaultBGGradient={selected?.style?.basic?.backgroundGradient || {}}
          />
        </Panel>
        <Panel header="投影" key="5">
          <Shadow 
            unit={unit}
            onChange={onChangeShadow}
            defaultValue={{
              textShadowList: selected?.style?.basic?.textShadow,
              boxShadowList: selected?.style?.basic?.boxShadow,
            }}
          />
        </Panel>
        <Panel header="圆角与描边" key="6">
          <Border 
            unit={unit}
            onChange={onChangeBorder}
            defaultDate={selected?.style?.basic?.border || {}}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Controller;
