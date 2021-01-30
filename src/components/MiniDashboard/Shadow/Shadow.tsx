import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Divider, Button, Switch } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Color from "../Color";
import NumberInput from "../NumberInput";
import s from "./Shadow.module.scss";

interface TextShadow {
  shiftRight?: number;
  shiftDown?: number;
  blur?: number;
  color?: string;
}

interface BoxShadow extends TextShadow {
  spread?: number;
  inset?: boolean;
}

interface Props {
  unit?: string;
  onChange?: (data: {
    type: "boxShadow" | "textShadow";
    values: BoxShadow[];
  }) => void;
  defaultValue?: {
    boxShadowList?: BoxShadow[];
    textShadowList?: TextShadow[];
  };
}

const Shadow: React.FC<Props> = ({ unit, onChange, defaultValue }) => {
  const [shadowType, setShadowType] = useState<"text" | "box">("box");
  const [textShadowList, setTextShadowList] = useState<TextShadow[]>([]);
  const [boxShadowList, setBoxShadowList] = useState<BoxShadow[]>([]);
  const didMount = useRef(false);

  useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;
        if (defaultValue?.textShadowList) {
          setTextShadowList(defaultValue.textShadowList);
        }
        if (defaultValue?.boxShadowList) {
          setBoxShadowList(defaultValue.boxShadowList);
        }
      }
  }, [defaultValue?.boxShadowList, defaultValue?.textShadowList]);

  useEffect(() => {
      return () => {
          if (didMount.current === true) {
            didMount.current = false;
          }
      }
  }, [])

  const onChangeShadowTab = useCallback((e) => {
    setShadowType(e.target.value);
  }, []);

  const onChangeShadow = useCallback(
    (type: "box" | "text") => {
      console.log("boxShadowList", boxShadowList);
      if (onChange instanceof Function) {
        if (type === "text") {
          onChange({ type: "textShadow", values: textShadowList });
        }
        if (type === "box") {
          onChange({ type: "boxShadow", values: boxShadowList });
        }
      }
    },
    [boxShadowList, onChange, textShadowList]
  );

  const onPlus = useCallback(
    (type) => () => {
      if (type === "text") {
        const data = [...textShadowList, {}];
        setTextShadowList(data);
      }
      if (type === "box") {
        const data = [...boxShadowList, {}];
        setBoxShadowList(data);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onMinus = useCallback(
    (type, i) => () => {
      if (type === "text") {
        setTextShadowList([
          ...textShadowList.filter((item, index) => index !== i),
        ]);
      }
      if (type === "box") {
        setBoxShadowList([
          ...boxShadowList.filter((item, index) => index !== i),
        ]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeColor = useCallback(
    (type, i) => (res: any) => {
      console.log("Color", res.value);
      if (type === "box") {
        boxShadowList[
          i
        ].color = `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
      }
      if (type === "text") {
        textShadowList[
          i
        ].color = `rgba(${res.value.rgb.r}, ${res.value.rgb.g}, ${res.value.rgb.b}, ${res.value.rgb.a} )`;
      }
      setBoxShadowList([...boxShadowList]);
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeInset = useCallback(
    (type, i) => (value: boolean) => {
      console.log("Inset", value);
      if (type === "box") {
        boxShadowList[i].inset = value;
        setBoxShadowList([...boxShadowList]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow]
  );

  const onChangeshiftRight = useCallback(
    (type, i) => (value: any) => {
      if (type === "box") {
        boxShadowList[i].shiftRight = value;
        setBoxShadowList([...boxShadowList]);
      }
      if (type === "text") {
        textShadowList[i].shiftRight = value;
        setTextShadowList([...textShadowList]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeshiftDown = useCallback(
    (type, i) => (value: any) => {
      if (type === "box") {
        boxShadowList[i].shiftDown = value;
        setBoxShadowList([...boxShadowList]);
      }
      if (type === "text") {
        textShadowList[i].shiftDown = value;
        setTextShadowList([...textShadowList]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeBlur = useCallback(
    (type, i) => (value: any) => {
      if (type === "box") {
        boxShadowList[i].blur = value;
        setBoxShadowList([...boxShadowList]);
      }
      if (type === "text") {
        textShadowList[i].blur = value;
        setTextShadowList([...textShadowList]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow, textShadowList]
  );

  const onChangeSpread = useCallback(
    (type, i) => (value: any) => {
      if (type === "box") {
        boxShadowList[i].spread = value;
        setBoxShadowList([...boxShadowList]);
      }
      onChangeShadow(type);
    },
    [boxShadowList, onChangeShadow]
  );

  const renderShadow = (type: "text" | "box") => {
    let data: BoxShadow[] = type === "text" ? textShadowList : boxShadowList;
    return (
      <>
        {data.map((item, i) => (
          <div key={i}>
            <Divider key={i} dashed orientation="right">
              <Button
                size="small"
                icon={<MinusOutlined onClick={onMinus(shadowType, i)} />}
              />
            </Divider>
            <Row className={s.row}>
              <Col span={12}>
                <Color
                  label="投影颜色"
                  onChange={onChangeColor(type, i)}
                  defaultColor={item.color}
                />
              </Col>
              <Col span={12}>
                {type !== "text" ? (
                  <Row>
                    <Col span={12}></Col>
                    <Col span={12}>
                      <Switch
                        checkedChildren="内阴影"
                        unCheckedChildren="内阴影"
                        defaultChecked={item.inset}
                        onChange={onChangeInset(type, i)}
                      />
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
            <Row className={s.row}>
              <Col span={12}>
                <NumberInput
                  label="横向偏移"
                  unit={unit}
                  min={-1000}
                  max={1000}
                  value={item.shiftRight}
                  onChange={onChangeshiftRight(type, i)}
                />
              </Col>
              <Col span={12}>
                <NumberInput
                  label="纵向偏移"
                  unit={unit}
                  min={-1000}
                  max={1000}
                  value={item.shiftDown}
                  onChange={onChangeshiftDown(type, i)}
                />
              </Col>
            </Row>
            <Row className={s.row}>
              <Col span={12}>
                <NumberInput
                  label="模糊"
                  unit={unit}
                  min={-1000}
                  max={1000}
                  value={item.blur}
                  onChange={onChangeBlur(type, i)}
                />
              </Col>
              <Col span={12}>
                {type !== "text" ? (
                  <NumberInput
                    label="散布"
                    unit={unit}
                    min={-1000}
                    max={1000}
                    value={item.spread}
                    onChange={onChangeSpread(type, i)}
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Row className={s.row}>
        <Col span={24}>
          <Radio.Group
            value={shadowType}
            className={s.tab}
            onChange={onChangeShadowTab}
          >
            <Radio.Button value="box">投影</Radio.Button>
            <Radio.Button value="text">文字投影</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={onPlus(shadowType)}
          />
        </Col>
      </Row>
      {renderShadow(shadowType)}
    </>
  );
};

export default Shadow;
