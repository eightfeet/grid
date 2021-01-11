import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import ClassNames from "classnames";
import { AppDataElementsTypes } from "./../../../types/appData";
import styleCompiler from "./../../compiler";
import s from "./Conterner.module.scss";

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

interface paraments extends AppDataElementsTypes {
  id: string;
}

const Conterner: React.FC<paraments & StateProps & DispatchProps> = ({
  id,
  style,
  children,
  content,
  updateActivationItem,
  activationItem
}) => {
  const [basicStyle, setBasicStyle] = useState<{ [keys: string]: any }>({});

  useEffect(() => {
    const { basic } = style;
    setBasicStyle(styleCompiler(basic));
    if (basic.display?.zIndex !== undefined) {
      document.getElementById(
        `wrap-${id}`
      )!.style.zIndex = `${basic.display.zIndex}`;
    }
  }, [id, style]);

  const onLayoutClick = useCallback(() => {
    updateActivationItem({ id });
  }, [id, updateActivationItem]);

  return (
    <div
      className={ClassNames(s.touchwrap, activationItem.id === id ? s.actwrap : null)}
      onTouchStart={onLayoutClick}
    >
      <div id={id} style={basicStyle.style}>
        {children || content.text}
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  appData: state.appData,
  activationItem: state.activationItem,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateAppData: dispatch.appData.updateAppData,
  updateActivationItem: dispatch.activationItem.updateActivationItem,
});

export default connect(mapState, mapDispatch)(Conterner);
