import {
  Row,
  Col,
  Button,
  Tooltip,
  Modal,
  Upload as UploadPic,
} from "antd";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AreaChartOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import s from "./Upload.module.scss";
import { UploadChangeParam } from "antd/lib/upload/interface";

interface UploadProps {
  label?: string;
  defaultImg?: string;
  onChange?: (data:string) => void;
}

const antIcon = <LoadingOutlined className={s.loading} spin />;

const Upload: React.FC<UploadProps> = ({
  label,
  defaultImg = "http://www.by-health.com/static/index/tvc-jld.png",
  onChange
}) => {
  const [img, setimg] = useState<string>(defaultImg || "");
  const [isloading, setIsloading] = useState(false);
  const [viewImg, setViewImg] = useState(false);
  const [wh, setWh] = useState(" ");

  const ref = useRef(null);

  const getImageWh = useCallback((url: string) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const str = `宽:${image.offsetWidth}px 高:${image.offsetHeight}px`;
      console.log("str", str);
      setWh(str);
      (ref.current as any).innerHTML = "";
    };
    (ref.current as any).appendChild(image);
  }, []);

  // 仅做初次渲染
  useEffect(() => {
    setimg(img);
    getImageWh(img);
  }, []);

  const onChangeUpload = useCallback(
    (info: UploadChangeParam) => {
      if (info.file.status === "uploading") {
        setIsloading(true);
      }

      if (info.file.status === "error") {
        setIsloading(false);
      }

      if (info.file.response) {
        setTimeout(() => {
          setIsloading(false);
          setimg(info.file.response.fileUrl);
        }, 1500);
        setTimeout(() => {
          getImageWh(info.file.response.fileUrl);
        }, 1800);
        if (onChange instanceof Function) {
            onChange(info.file.response.fileUrl);
        }
      }
    },
    [getImageWh]
  );

  const hideView = useCallback(() => {
    setViewImg(false);
  }, []);

  const showView = useCallback(() => {
    setViewImg(true);
  }, []);

  const deleteImage = useCallback(() => {
    setimg("");
    if (onChange instanceof Function) {
        onChange('');
    }
  }, [onChange]);

  return (
    <>
      <Row className={s.row} gutter={4}>
        <Col className={s.label} span={10}>
          {label || ""}
        </Col>
        <Col span={14}>
          <div className={s.button}>
            <UploadPic
              accept=".jpg,.jpeg,.png"
              action={`/mf/commonservice/api/upload`}
              onChange={onChangeUpload}
              showUploadList={false}
              disabled={isloading}
            >
              <span
                className={classNames(s.uploadicon, s.empty, s.flid)}
                style={{ backgroundImage: `url(${img})` }}
              >
                {isloading ? antIcon : null}
                {!img ? <AreaChartOutlined /> : null}
              </span>
            </UploadPic>
          </div>

          {img ? (
            <>
              <Tooltip
                placement="top"
                trigger="hover"
                mouseEnterDelay={2}
                title="预览"
              >
                <Button
                  className={s.view}
                  type="link"
                  size={"small"}
                  onClick={showView}
                  icon={<EyeOutlined />}
                />
              </Tooltip>
              <Tooltip
                placement="top"
                trigger="hover"
                mouseEnterDelay={2}
                title="删除"
              >
                <Button
                  type="link"
                  danger
                  size={"small"}
                  onClick={deleteImage}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </>
          ) : null}
        </Col>
      </Row>
      <Modal visible={viewImg} onCancel={hideView} title={wh} footer={null}>
        <div className={s.ref}>
          {img ? <img ref={ref} src={img} alt={""} /> : null}
        </div>
      </Modal>
      <div className={s.imgtemp} ref={ref} />
    </>
  );
};

export default Upload;
