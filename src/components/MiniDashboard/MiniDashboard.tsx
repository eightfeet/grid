import React, { useEffect } from "react";
import LazyLoader from '~/components/LazyLoader';

interface MiniDashboardProps {
}

// 异步模块数据隔离，不被数据影响

const MiniDashboard:React.FC<MiniDashboardProps> = function MiniDashboard(props) {
  useEffect(() => {
    console.log('重新渲染')
  }, [])
  return (<LazyLoader path={'components/MiniDashboard/Dashboard'}  />);
}

export default MiniDashboard;