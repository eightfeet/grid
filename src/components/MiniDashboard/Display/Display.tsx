import React from "react";
import { Row, Col } from "antd";
import Select from './../Select'
import s from "./Display.module.scss";
import NumberInput from "../NumberInput";

interface Props {}

const Display: React.FC<Props> = () => {
  return (<>
    <Row className={s.row}>
      <Col span={12}>
        <NumberInput label="宽度" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
      <Col span={12}>
        <NumberInput label="高度" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
    </Row>
    <Row className={s.row}>
      <Col span={12}>
            <Select label="定位" optionsData={{absolute: '绝对', relative: '相对'}} />
      </Col>
      <Col span={12}>
            <NumberInput label="层级" min={1} max={100000} defaultValue={3} />
      </Col>
    </Row>
    <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="左边距" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
      <Col span={12}>
            <NumberInput label="左边距" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
    </Row>
    <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="上边距" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
      <Col span={12}>
            <NumberInput label="下边距" unit="px" min={1} max={100000} defaultValue={3} />
      </Col>
    </Row>
    </>
  );
};

export default Display;
