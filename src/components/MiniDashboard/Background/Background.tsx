import React, { useCallback, useState } from "react";
import { Row, Col, Radio } from "antd";
import Upload from "../Upload";

import s from "./Background.module.scss";
import Color from "../Color";
import NumberInput from "../NumberInput";
import {
  AnyObjectType,
  BackgroundCommonTypesOfStyleItems,
  BackgroundGradientTypesOfStyleItems,
} from "types/appData";
import useCssPicker from "~/hooks/useCssPicker";
import Select from "../Select";
import QuadrangularSelect from "../QuadrangularSelect";
import GradientSlider from "../GradientSlider";

interface Props {
  onChange: (result: ResultType) => void;
  defaultBGCommonData?: BackgroundCommonTypesOfStyleItems;
  defaultBGGradient?: BackgroundGradientTypesOfStyleItems;
  unit?: string;
}

type ChangeType =
  | "imageUrl"
  | "backgroundColor"
  | "position"
  | "positionX"
  | "positionY"
  | "sizeX"
  | "sizeY"
  | "repeat";

interface ResultType {
  type: string;
  values: AnyObjectType;
}

const BackgroundCommon: React.FC<Props> = ({
  onChange,
  defaultBGCommonData,
  defaultBGGradient,
  unit,
}) => {
  const [resultCommon, pickToResultCommon] = useCssPicker("backgroundCommon");
  const [tabState, setTabState] = useState("common");

  const {
    imageUrl,
    backgroundColor,
    positionX,
    positionY,
    sizeX,
    sizeY,
    repeat,
  } = defaultBGCommonData || {};

  const { gradient, gradientDirections } = defaultBGGradient || {};

  const onChangeBackgroundCommon = useCallback(
    (type: ChangeType) => (data: any) => {
      pickToResultCommon(type, data);
      if (onChange instanceof Function) {
        onChange(resultCommon);
      }
    },
    [onChange, pickToResultCommon, resultCommon]
  );

  const onChangeBg = useCallback((data) => {
    onChangeBackgroundCommon("positionX")(data[0]);
    onChangeBackgroundCommon("positionY")(data[1]);
  }, []);

  const onChangeTab = useCallback((e) => {
    setTabState(e.target.value);
  }, []);

  const onChangeGradient = useCallback((gradient) => {
    onChange({
      type: "backgroundGradient",
      values: gradient,
    });
    console.log(gradient);
  }, []);

  const renderCommon = () => (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Upload
            label="背景图片"
            onChange={onChangeBackgroundCommon("imageUrl")}
            defaultImg={imageUrl}
          />
        </Col>
        <Col span={12}>
          <Select
            label="平铺方式"
            value={repeat}
            optionsData={{
              "no-repeat": "不平铺",
              repeat: "平铺",
              "repeat-x": "横向平铺",
              "repeat-y": "纵向平铺",
            }}
            onChange={onChangeBackgroundCommon("repeat")}
          />
        </Col>
      </Row>
      {imageUrl ? (
        <>
          <Row className={s.row}>
            <Col span={12}>
              <NumberInput
                label="背景宽度"
                unit={unit}
                min={1}
                max={100000}
                value={sizeX}
                onChange={onChangeBackgroundCommon("sizeX")}
              />
            </Col>
            <Col span={12}>
              <NumberInput
                label="背景高度"
                unit={unit}
                min={1}
                max={100000}
                value={sizeY}
                onChange={onChangeBackgroundCommon("sizeY")}
              />
            </Col>
          </Row>
          <Row className={s.row}>
            <Col span={12}>
              <QuadrangularSelect
                label="背景位置"
                unit={unit}
                defaultData={[positionX, positionY]}
                onChange={onChangeBg}
              />
            </Col>
            <Col span={12}>
              <Row className={s.row}>
                <Col span={24}>
                  <NumberInput
                    label="横向位置"
                    unit={"%"}
                    min={0}
                    max={100}
                    value={positionX}
                    onChange={onChangeBackgroundCommon("positionX")}
                  />
                </Col>
              </Row>
              <Row className={s.row}>
                <Col span={24}>
                  <NumberInput
                    label="纵向位置"
                    unit={"%"}
                    min={0}
                    max={100}
                    value={positionY}
                    onChange={onChangeBackgroundCommon("positionY")}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row></Row>
        </>
      ) : null}
    </>
  );

  const renderGradient = () => (
    <>
      <Row className={s.row}>
        <Col span={24}>
          <GradientSlider
            onChange={onChangeGradient}
            defaultData={{ gradient, gradientDirections }}
          />
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <Row className={s.row}>
        <Col span={12}>
          <Color
            label="背景颜色"
            onChange={onChangeBackgroundCommon("backgroundColor")}
            defaultColor={backgroundColor}
          />
        </Col>
      </Row>
      <Row className={s.row}>
        <Col span={24}>
          <Radio.Group
            defaultValue={tabState}
            className={s.tab}
            onChange={onChangeTab}
          >
            <Radio.Button value="common">图片背景</Radio.Button>
            <Radio.Button value="gradient">渐变背景</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {tabState === "common" ? renderCommon() : null}
      {tabState === "gradient" ? renderGradient() : null}
    </>
  );
};

export default BackgroundCommon;
