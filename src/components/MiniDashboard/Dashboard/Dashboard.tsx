import React, { useCallback, useState } from "react";
import Controller from "./../Controller";
import s from "./Dashboard.module.scss";
import { Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
const { Item } = Menu;

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const style = useSelector((state: RootState) => state.activationItem.style);
  const [stylePath, setStylePath] = useState('');
  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
  const onSelectStylePath = useCallback(
    (e) => {
      setStylePath(e.key)
    },
    [],
  )
  return (
    <div className={s.root} style={collapsed ? {width: '80px', maxHeight: '40px'} : {width: '550px', maxHeight: '440px'}}>
      <div className={s.menu}>
        <Button
          className={s.menuicon}
          type="primary"
          onClick={toggleCollapsed}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          className={s.tab}
          mode="inline"
          inlineCollapsed={collapsed}
          onSelect={onSelectStylePath}
        >
          {Object.keys(style).map((key: string) => <Item key={key}>{key}</Item>)}
        </Menu>
      </div>
      <div className={s.dashboard}  >
        {stylePath ? <Controller path={stylePath} /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
