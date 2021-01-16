import React, { useCallback, useState } from "react";
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
import { AnyObjectType } from "types/appData";

interface Props {
  onChange: (result: ResultType) => void;
}

type ChangeType =
  | "color"
  | "fontSize"
  | "lineHeight"
  | "letterSP"
  | "wordSp"
  | "weight"
  | "decoration"
  | "italic"
  | "fontWeight"
  | "fontStyle"
  | "align";

interface ResultType {
  type: string;
  values: AnyObjectType;
}

const Font: React.FC<Props> = ({ onChange }) => {
  const [result, setresult] = useState<ResultType>({
    type: "font",
    values: {},
  });

  const onChangeFont = useCallback(
    (type: ChangeType) => (data: any) => {
      const changeData: ResultType = {
        type: result["type"],
        values: { ...result["values"] },
      };
      
      switch (type) {
        case "color":
          changeData.values.color = `rgba(${data.value.rgb.r}, ${data.value.rgb.g}, ${data.value.rgb.b}, ${data.value.rgb.a})`;
          break;
          // value="bold" fontWeight fontStyle
        case "fontWeight":
            if (data?.target.checked) {
              changeData.values.fontWeight = "bold";
              break;
            }
            delete changeData.values.fontWeight;
            break;
        case "fontStyle":
          changeData.values.fontStyle = "italic";
          break;
        default:
          if (data) {
            changeData.values[type] = (data.target?.value || data)
          }
          break;
      }

      setresult(changeData);
      if (onChange instanceof Function) {
        onChange(changeData);
      }
    },
    [onChange, result]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={8}>
          <Radio.Group defaultValue="" onChange={onChangeFont("align")}>
            <Radio.Button value="left">
              <AlignLeftOutlined />
            </Radio.Button>
            <Radio.Button value="center">
              <AlignCenterOutlined />
            </Radio.Button>
            <Radio.Button value="right">
              <AlignRightOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Radio.Group defaultValue="" onChange={onChangeFont("decoration")}>
            <Radio.Button value="none">N</Radio.Button>
            <Radio.Button value="underline">
              <UnderlineOutlined />
            </Radio.Button>
            <Radio.Button value="line-through">
              <StrikethroughOutlined />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <Checkbox className={s.Checkbox} onChange={onChangeFont("fontWeight")}>
            <BoldOutlined />
          </Checkbox>
          <Checkbox className={s.Checkbox} onChange={onChangeFont("fontStyle")}>
            <ItalicOutlined />
          </Checkbox>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="字体颜色"
            onChange={onChangeFont("color")}
            defaultColor={{ r: 255, g: 0, b: 0, a: 1 }}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字体大小"
            unit="px"
            min={1}
            max={100000}
            defaultValue={3}
            onChange={onChangeFont("fontSize")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="行间距"
            unit="px"
            min={1}
            max={100000}
            defaultValue={3}
            onChange={onChangeFont("lineHeight")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字间距"
            unit="px"
            min={1}
            max={100000}
            defaultValue={3}
            onChange={onChangeFont("wordSp")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Font;
