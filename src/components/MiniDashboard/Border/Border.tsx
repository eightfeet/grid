import { Col, Row } from "antd";
import React from "react";
import Color from "../Color";
import NumberInput from "../NumberInput";
import Select from "./Select";
import s from "./Border.module.scss";
import BorderCheckbox from "./BorderCheckbox";
import BorderRadius from "./BorderRadius";

interface Props {
  onChange: (result: any) => void;
  defaultDate?: any;
  unit?: string;
}

const Border: React.FC<Props> = ({ unit }) => {
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            defaultColor="#555"
            label="描边颜色"
            onChange={(data: any) => console.log(data)}
          />
        </Col>

        <Col span={12}>
          <BorderCheckbox
            onChange={(data: any) => console.log(data)}
            defaultData={{ borderTop: true, borderLeft: true, border: true }}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Select
            onChange={(data: any) => console.log(data)}
            optionsData={{
              solid: "solid",
              dotted: "dotted",
              dashed: "dashed",
              double: "double",
              groove: "groove",
              ridge: "ridge",
              inset: "inset",
              outset: "outset",
              hidden: "hidden",
              none: "none",
            }}
            label="描边样式"
          />
        </Col>

        <Col span={12}>
          <NumberInput
            label="描边宽度"
            unit={unit}
            min={1}
            max={100000}
            value={10}
            onChange={(data: any) => console.log(data)}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={2}></Col>
        <Col span={20}>
          <BorderRadius
            onChange={(data: any) => console.log(data)}
            defaultData={[20, 20, 20, 20]}
            unit={unit}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
};

export default Border;
