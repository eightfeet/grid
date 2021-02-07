import React from "react";
import Controller from "./../Controller";
import s from "./Dashboard.module.scss";
import { Menu } from 'antd';
const { Item } = Menu;

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <div className={s.root}>
      <Menu className={s.tab}>
          <Item key="1">基本</Item>
          <Item key="2">xxx</Item>
      </Menu>
      <Controller />
    </div>
  );
};

export default Dashboard;
