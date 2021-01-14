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
} from "@ant-design/icons";

const Font: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={9}>
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
        <Col span={9}>
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
      </Row>
      <Row>
        <Col span={8}>
          <FontSizeOutlined />{" "}
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
        <Col span={1}>&nbsp;</Col>
        <Col span={8}>
          <LineHeightOutlined />{" "}
          <InputNumber  min={1} max={100000} defaultValue={3} /> px
        </Col>
        <Col span={7}>
          <Checkbox>
            <BoldOutlined />
          </Checkbox>
          <Checkbox>
            <ItalicOutlined />
          </Checkbox>
        </Col>
      </Row>
    </>
  );
};

export default Font;
