import React, { useCallback } from "react";
import { Row, Col } from "antd";
import { Radio, Checkbox, InputNumber, Form } from "antd";

import {
  AlignLeftOutlined,
  AlignRightOutlined,
  AlignCenterOutlined,
  BoldOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import s from "./Font.module.scss";
import Color from "../Color";
import NumberInput from "../NumberInput";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Font: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = useCallback((color) => {
    console.log(color);
  }, []);
  return (
    <>
      <Row className={s.row}>
        <Col span={8}>
          <Radio.Group defaultValue="a">
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
          <Radio.Group defaultValue="a" size="middle">
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
          <Color
            label="字体颜色"
            onChange={onChange}
            defaultColor={{ r: 255, g: 0, b: 0, a: 1 }}
          />
        </Col>
        <Col span={12}>
          <NumberInput label="字体大小" unit="px"  min={1} max={100000} defaultValue={3} />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput label="行间距" unit="px"  min={1} max={100000} defaultValue={3} />
        </Col>
        <Col span={12}>
          <NumberInput label="字间距" unit="px"  min={1} max={100000} defaultValue={3} />
        </Col>
      </Row>
    </>
  );
};

export default Font;
