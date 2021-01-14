import React, { useCallback, useEffect, useState } from "react";
import { AllCssType, AnyObjectType } from "types/appData";
import Button from "antd/lib/button";

import s from "./Controller.module.scss";

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import description from "~/compiler/description.json";

import { Collapse } from "antd";
import Font from "../Font";

const { Panel } = Collapse;

interface Props {
  selected: string;
}

const Controller: React.FC<Props> = ({ selected, ...other }) => {
  const [stateData, setStateData] = useState<any>();

  useEffect(() => {
    console.log(444444, other);
    setStateData((description as AnyObjectType)[selected]);
  }, [selected, stateData]);

  const onChange = useCallback(
    (key) => () => {
      // if (Object.prototype.toString.call(stateData) === '[object Object]') {
      //     Object.keys(stateData).forEach(stateDataKey => {
      //         const item = stateData[stateDataKey];
      //         if (key === stateDataKey) {
      //             console.log('对上了', item)
      //         }
      //     })
      // }

      console.log(key);
    },
    []
  );

  return (
    <div className={s.root}>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="文字" key="1">
          <Font />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Controller;
