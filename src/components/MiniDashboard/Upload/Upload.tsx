import { Row, Col, Button, Tooltip, Popover } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { AreaChartOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import s from './Upload.module.scss';

interface UploadProps {
    label?: string;
    defaultImg?: string;
}

const Upload: React.FC<UploadProps> = ({
    label,
    defaultImg = 'http://www.by-health.com/static/index/tvc-jld.png',
}) => {
    const [img, setimg] = useState<string>();

    useEffect(() => {
        setimg(defaultImg);
    }, [defaultImg]);

    return (
        <Row className={s.row} gutter={4}>
            <Col className={s.label} span={10}>
                {label || ''}
            </Col>
            <Col span={14}>
                <div className={s.button}>
                    <div
                        className={classNames(s.uploadicon, s.empty, s.flid)}
                        style={{ backgroundImage: `url(${img})` }}
                    >
                        {!img ? <AreaChartOutlined /> : null}
                    </div>
                </div>

                {img ? (
                    <>
                        <Popover content={<div>1123123</div>} title="Title">
                            <Button
                                className={s.view}
                                type="link"
                                size={'small'}
                                onClick={() => console.log(111)}
                                icon={<EyeOutlined />}
                            />
                        </Popover>
                        <Tooltip
                            placement="top"
                            trigger="hover"
                            mouseEnterDelay={2}
                            title="删除背景图片"
                        >
                            <Button
                                type="link"
                                danger
                                size={'small'}
                                onClick={() => console.log(111)}
                                icon={<DeleteOutlined />}
                            />
                        </Tooltip>
                    </>
                ) : null}
            </Col>
        </Row>
    );
};

export default Upload;
