import React, { useCallback } from "react";
import { Row, Col } from "antd";
import { Radio, Checkbox } from "antd";

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
import { AnyObjectType, FontTypesOfStyleItems } from "types/appData";
import useCssPicker from "~/hooks/useCssPicker";

interface Props {
  onChange: (result: ResultType) => void;
  defaultData?: FontTypesOfStyleItems
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

const Font: React.FC<Props> = ({ onChange, defaultData }) => {
  const [result, pickToResult] = useCssPicker("font");
  const { fontSize, align, lineHeight, letterSP, weight, italic, color, decoration } = defaultData || {};
  console.log('defaultData', defaultData)

  const onChangeFont = useCallback(
    (type: ChangeType) => (data: any) => {
      pickToResult(type, data);
      if (onChange instanceof Function) {
        console.log('result',  result)
        onChange(result);
      }
    },
    [onChange, pickToResult, result]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={8}>
          <Radio.Group value={align} onChange={onChangeFont("align")}>
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
          <Radio.Group value={decoration} onChange={onChangeFont("decoration")}>
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
          <Checkbox
            className={s.Checkbox}
            checked={weight === 'bold'}
            onChange={onChangeFont("fontWeight")}
          >
            <BoldOutlined />
          </Checkbox>
          <Checkbox className={s.Checkbox} checked={italic === 'italic'} onChange={onChangeFont("fontStyle")}>
            <ItalicOutlined />
          </Checkbox>
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="字体颜色"
            onChange={onChangeFont("color")}
            defaultColor={color}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字体大小"
            unit="px"
            min={1}
            max={100000}
            value={fontSize}
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
            value={lineHeight}
            onChange={onChangeFont("lineHeight")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字间距"
            unit="px"
            min={1}
            max={100000}
            value={letterSP}
            onChange={onChangeFont("letterSP")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Font;
