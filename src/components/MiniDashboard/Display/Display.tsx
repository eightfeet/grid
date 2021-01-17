import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "antd";
import Select from './../Select'
import s from "./Display.module.scss";
import NumberInput from "../NumberInput";
import { AnyObjectType, DisplayTypesOfStyleItems } from "types/appData";
import useCssPicker from "~/hooks/useCssPicker";

interface Props {
  onChange: (result: ResultType) => void;
  defaultData?: DisplayTypesOfStyleItems;
}

interface ResultType {
  type: string;
  values: AnyObjectType;
}

type ChangeType =
  | "width"
  | "height"
  | "zIndex"
  | "position"
  | "left"
  | "right"
  | "top"
  | "bottom";

const Display: React.FC<Props> = ({onChange, defaultData }) => {

  const [relative, setrelative] = useState(true);

  const [result, pickToResult] = useCssPicker("display");
  const { width, height, zIndex, position, left, right, top, bottom } = defaultData || {};

  useEffect(() => {
    if (position === 'absolute') {
      setrelative(false)
    }
    if (position === 'relative') {
      setrelative(true)
    }
  }, [defaultData, position])

  const onChangeDisplay = useCallback(
    (type: ChangeType) => (data: any) => {
      if (data === 'absolute') {
        setrelative(false)
      }
      if (data === 'relative') {
        setrelative(true)
      }
      pickToResult(type, data);
      if (onChange instanceof Function) {
        console.log('result',  result)
        onChange(result);
      }
    },
    [onChange, pickToResult, result]
  );

  return (<>
    <Row className={s.row}>
      <Col span={12}>
        <NumberInput label="宽度" unit="px" min={1} max={100000} value={width} onChange={onChangeDisplay("width")} />
      </Col>
      <Col span={12}>
        <NumberInput label="高度" unit="px" min={1} max={100000} value={height} onChange={onChangeDisplay("height")} />
      </Col>
    </Row>
    <Row className={s.row}>
      <Col span={12}>
            <Select label="定位" value={position} optionsData={{absolute: '绝对', relative: '相对'}} onChange={onChangeDisplay("position")} />
      </Col>
      <Col span={12}>
            <NumberInput label="层级" min={1} max={100000} value={zIndex} onChange={onChangeDisplay("zIndex")}/>
      </Col>
    </Row>
    {!relative ? <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="左边距" unit="px" min={1} max={100000} value={relative? undefined : left} onChange={onChangeDisplay("left")}/>
      </Col>
      <Col span={12}>
            <NumberInput label="右边距" unit="px" min={1} max={100000} value={relative? undefined : right} onChange={onChangeDisplay("right")}/>
      </Col>
    </Row> : null}
    {!relative ? <Row className={s.row}>
      <Col span={12}>
            <NumberInput label="上边距" unit="px" min={1} max={100000} value={relative? undefined : top} onChange={onChangeDisplay("top")}/>
      </Col>
      <Col span={12}>
            <NumberInput label="下边距" unit="px" min={1} max={100000} value={relative? undefined : bottom} onChange={onChangeDisplay("bottom")}/>
      </Col>
    </Row> : null}
    </>
  );
};

export default Display;
