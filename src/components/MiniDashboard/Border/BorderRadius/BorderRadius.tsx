import React from "react";
import { Row, Col, InputNumber } from "antd";
import s from "./BorderRadius.module.scss";
import {
  LinkOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

interface Props {
  optionsData: {
    [keys: string]: any;
  };
  [keys: string]: any;
}

const BorderRadius: React.FC<Props> = ({
  unit,
  label,
  optionsData,
  ...other
}) => {
  return (
    <Row className={s.row}>
      <Col span={10}>
        <Row>
          <Col span={8} className={classNames(s.icon, s.alignright)}>
            <RadiusUpleftOutlined />
            &nbsp;
          </Col>
          <Col span={16}>
            <InputNumber placeholder="px" />
          </Col>
        </Row>
        <Row>
          <Col span={8} className={classNames(s.icon, s.alignright)}>
            <RadiusBottomleftOutlined />
            &nbsp;
          </Col>
          <Col span={16}>
            <InputNumber placeholder="px" />
          </Col>
        </Row>
      </Col>
      <Col span={4} className={s.middle}>
        <LinkOutlined />
      </Col>
      <Col span={10}>
        <Row className={s.row}>
          <Col span={16}>
            <InputNumber placeholder="px" />
          </Col>
          <Col span={8} className={s.icon}>
            &nbsp;
            <RadiusUprightOutlined />
          </Col>
        </Row>
        <Row className={s.row}>
          <Col span={16}>
            <InputNumber placeholder="px" />
          </Col>
          <Col span={8} className={s.icon}>
            &nbsp;
            <RadiusBottomrightOutlined />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BorderRadius;
