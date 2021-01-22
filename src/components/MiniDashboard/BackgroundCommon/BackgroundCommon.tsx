import React, { useCallback } from 'react';
import { Row, Col } from 'antd';
import { Radio, Checkbox } from 'antd';
import Upload from '../Upload';

import {
    AlignLeftOutlined,
    AlignRightOutlined,
    AlignCenterOutlined,
    BoldOutlined,
    UnderlineOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
} from '@ant-design/icons';
import s from './BackgroundCommon.module.scss';
import Color from '../Color';
import NumberInput from '../NumberInput';
import {
    AnyObjectType,
    BackgroundCommonTypesOfStyleItems,
} from 'types/appData';
import useCssPicker from '~/hooks/useCssPicker';
import Select from '../Select';

interface Props {
    onChange: (result: ResultType) => void;
    defaultData?: BackgroundCommonTypesOfStyleItems;
    unit?: string;
}

type ChangeType =
    | 'imageUrl'
    | 'backgroundColor'
    | 'position'
    | 'positionX'
    | 'positionY'
    | 'sizeX'
    | 'sizeY'
    | 'repeat';

interface ResultType {
    type: string;
    values: AnyObjectType;
}

const BackgroundCommon: React.FC<Props> = ({ onChange, defaultData, unit }) => {
    const [result, pickToResult] = useCssPicker('backgroundCommon');

    const {
        imageUrl,
        backgroundColor,
        position,
        positionX,
        positionY,
        sizeX,
        sizeY,
        repeat,
    } = defaultData || {};

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
                        onChange={onChangeBackgroundCommon('backgroundColor')}
                        defaultColor={backgroundColor}
                    />
                </Col>
                <Col span={12}>
                    <Upload
                        label="背景图片"
                        onChange={onChangeBackgroundCommon('imageUrl')}
                        defaultImg={imageUrl}
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
                                onChange={onChangeBackgroundCommon('sizeX')}
                            />
                        </Col>
                        <Col span={12}>
                            <NumberInput
                                label="背景高度"
                                unit={unit}
                                min={1}
                                max={100000}
                                value={sizeY}
                                onChange={onChangeBackgroundCommon('sizeY')}
                            />
                        </Col>
                    </Row>
                    <Row className={s.row}>
                        <Col span={12}>
                            <NumberInput
                                label="背景位置"
                                unit={unit}
                                min={1}
                                max={100000}
                                value={sizeX}
                                onChange={onChangeBackgroundCommon('sizeX')}
                            />
                        </Col>
                        <Col span={12}>
                            <Row className={s.row}>
                                <Col span={24}>
                                    <NumberInput
                                        label="横向位置"
                                        unit={unit}
                                        min={1}
                                        max={100000}
                                        value={1}
                                        onChange={onChangeBackgroundCommon('positionX')}
                                    />
                                    {positionX}
                                </Col>
                            </Row>
                            <Row className={s.row}>
                                <Col span={24}>
                                    <NumberInput
                                        label="纵向位置"
                                        unit={unit}
                                        min={1}
                                        max={100000}
                                        value={2}
                                        onChange={onChangeBackgroundCommon('positionY')}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Select
                                label="平铺方式"
                                value={repeat}
                                optionsData={{
                                    'no-repeat': '不平铺',
                                    repeat: '平铺',
                                    'repeat-x': '横向平铺',
                                    'repeat-y': '纵向平铺',
                                }}
                                onChange={onChangeBackgroundCommon('repeat')}
                            />
                        </Col>
                    </Row>
                </>
            ) : null}
        </>
    );
};

export default BackgroundCommon;
