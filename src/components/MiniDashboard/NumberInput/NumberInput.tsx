import React from "react";
import { Row, Col, InputNumber } from "antd";
import s from './NumberInput.module.scss';
import { InputNumberProps } from "antd/lib/input-number";

interface Props extends InputNumberProps {
    label: string;
    unit?: string;
}

const NumberInput: React.FC<Props> = ({unit, label, ...other}) => {
  return (
    <Row className={s.row} gutter={4}>
      <Col className={s.label} span={10}>{label || ''}</Col>
      <Col span={10}>
        <InputNumber {...other} />
      </Col>
      <Col span={4}>{unit || ''}</Col>
    </Row>
  );
};

export default NumberInput;
