import React, { useCallback } from "react";
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
} from "@ant-design/icons";
import s from './Font.module.scss';
import Color from "../Color";

const Font: React.FC = () => {
  const onChange = useCallback(
    (color) => {
      console.log(color)
    },
    [],
  )
  return (
    <>
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
        <Col span={12}>
           <Color label="字体颜色：" onChange={onChange} defaultColor={{r: 255,g:0, b:0, a:1}} />
        </Col>
        <Col span={12}>
          字体大小：
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          行间距：
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
        <Col span={12}>
          字符间距：
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
      </Row>
    </>
  );
};

export default Font;
