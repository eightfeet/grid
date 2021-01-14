import React from "react";
import { Row, Col } from "antd";
import { Radio, Checkbox, InputNumber } from "antd";
import {
  AlignLeftOutlined,
  AlignRightOutlined,
  AlignCenterOutlined,
  BoldOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  LineHeightOutlined,
  ColumnWidthOutlined
} from "@ant-design/icons";
import s from './Font.module.scss';

const Font: React.FC = () => {
  return (
    <>
      <Row className={s.row}>
        <Col span={8}>
           color
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={8}>
          <Radio.Group defaultValue="a" >
            <Radio.Button value="a">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="b">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="c">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Radio.Group defaultValue="a" size="middle" >
            <Radio.Button value="c">N</Radio.Button>
            <Radio.Button value="a">
              <UnderlineOutlined />
            </Radio.Button>
            <Radio.Button value="b">
              <StrikethroughOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Checkbox className={s.Checkbox}>
            <BoldOutlined />
          </Checkbox>
          <Checkbox className={s.Checkbox}>
            <ItalicOutlined />
          </Checkbox>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={8}>
          <FontSizeOutlined />{" "}
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
        <Col span={8}>
          <LineHeightOutlined />{" "}
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
        <Col span={8}>
          <ColumnWidthOutlined />{" "}
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
      </Row>
    </>
  );
};

export default Font;
