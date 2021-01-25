import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

import { Collapse } from "antd";
import Display from "../Display";
import Font from "../Font";
import Background from "../Background";

import useMergeAppData from "~/hooks/useMergeAppData";
import s from "./Controller.module.scss";

const { Panel } = Collapse;

interface Props {
}

const Controller: React.FC<Props> = () => {
  const selected = useSelector((state: RootState) => state.activationItem);
  const unit = useSelector((state: RootState) => state.controller.unit);
  const update = useMergeAppData();

  const onChangeFont = useCallback(
    (result: any) => {
      update({
        basic: {
          font: result.values,
        },
      });
    },
    [update]
  );

  const onChangeDisplay = useCallback(
    (result: any) => {
      update({
        basic: {
          display: result.values,
        },
      });
    },
    [update]
  );

  const onChangeBackgroundCommon = useCallback(
    (result: any) => {
      if (result.type === 'backgroundCommon') {
        update({
          basic: {
            backgroundCommon: result.values,
          },
        });
      }
      if (result.type === 'backgroundGradient') {
        update({
          basic: {
            backgroundGradient: result.values,
          },
        });
      }
      
    },
    [update]
  );

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="背景" key="1">
          <Background
            unit={unit}
            onChange={onChangeBackgroundCommon}
            defaultBGCommonData={selected?.style?.basic?.backgroundCommon || {}}
            defaultBGGradient={selected?.style?.basic?.backgroundGradient || {}}
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
      </Collapse>
    </div>
  );
};

export default Controller;
