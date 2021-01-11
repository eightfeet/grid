import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import s from "./MiniDashboard.module.scss";

interface objType {
    [keys: string]: any
}

interface MiniDashboardProps {
  appData: objType
}

const MiniDashboard:React.FC<MiniDashboardProps> = function MiniDashboard({appData}) {
  useEffect(() => {
     console.log(appData)
  }, [appData])
  return (
    <div>
      111
    </div>
  );
}

export default MiniDashboard;
