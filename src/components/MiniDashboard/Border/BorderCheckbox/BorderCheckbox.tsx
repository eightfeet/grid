import React from "react";
import { Row, Col, Button } from "antd";
import s from "./BorderCheckbox.module.scss";
import { BorderBottomOutlined, BorderLeftOutlined, BorderRightOutlined, BorderTopOutlined } from "@ant-design/icons";

interface Props {
  optionsData: {
    [keys: string]: any;
  };
  [keys: string]: any;
}

const BorderCheckbox: React.FC<Props> = ({ unit, label, optionsData, ...other }) => {
  return (
    <Row className={s.row} gutter={4}>
      <Col span={24}>
        <div className={s.menu}>
        <div><BorderTopOutlined /></div>
        <div><BorderRightOutlined /></div>
        <div><BorderBottomOutlined /></div>
        <div><BorderLeftOutlined /></div>
        </div>
      </Col>
    </Row>
  );
};

export default BorderCheckbox;
