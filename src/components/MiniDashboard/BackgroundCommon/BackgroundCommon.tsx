import React, { useCallback } from "react";
import { Row, Col } from "antd";
import { Radio, Checkbox } from "antd";
import Upload from '../Upload';

import {
  AlignLeftOutlined,
  AlignRightOutlined,
  AlignCenterOutlined,
  BoldOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import s from "./BackgroundCommon.module.scss";
import Color from "../Color";
import NumberInput from "../NumberInput";
import { AnyObjectType, FontTypesOfStyleItems } from "types/appData";
import useCssPicker from "~/hooks/useCssPicker";

interface Props {
  onChange: (result: ResultType) => void;
  defaultData?: FontTypesOfStyleItems;
  unit?: string
}

type ChangeType =
  "imageUrl"
  | "color"
  | "fontSize"
  | "lineHeight"
  | "letterSP"
  | "wordSp"
  | "decoration"
  | "fontWeight"
  | "fontStyle"
  | "align";

interface ResultType {
  type: string;
  values: AnyObjectType;
}

const Font: React.FC<Props> = ({ onChange, defaultData, unit }) => {
  const [result, pickToResult] = useCssPicker("font");
  const { fontSize, align, lineHeight, letterSP, fontWeight, fontStyle, color, decoration } = defaultData || {};

  const onChangeBackgroundCommon = useCallback(
    (type: ChangeType) => (data: any) => {
      pickToResult(type, data);
      if (onChange instanceof Function) {
        onChange(result);
      }
    },
    [onChange, pickToResult, result]
  );

  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="背景颜色"
            onChange={onChangeBackgroundCommon("color")}
            defaultColor={color}
          />
        </Col>
        <Col span={12}>
          <Upload
            label="背景图片"
            onChange={onChangeBackgroundCommon("imageUrl")}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={12}>
          <NumberInput
            label="行间距"
            unit={unit}
            min={1}
            max={100000}
            value={lineHeight}
            onChange={onChangeBackgroundCommon("lineHeight")}
          />
        </Col>
        <Col span={12}>
          <NumberInput
            label="字间距"
            unit={unit}
            min={1}
            max={100000}
            value={letterSP}
            onChange={onChangeBackgroundCommon("letterSP")}
          />
        </Col>
      </Row>
    </>
  );
};

export default Font;
