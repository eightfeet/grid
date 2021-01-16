import { useCallback, useState } from "react";
import { AnyObjectType } from "types/appData";

interface ResultType {
  type: string;
  values: AnyObjectType;
}

const useCssPicker = (type: string, initialValue?: AnyObjectType) => {
  const [result, setresult] = useState<ResultType>(() => {
    return {
      type,
      values: initialValue || {},
    };
  });

  const pickToResult: any = useCallback(
    (cssProperties: string, data: any) => {
      const changeData: any = { ...result };
      switch (cssProperties) {
        case "color":
          changeData.values.color = `rgba(${data.value.rgb.r}, ${data.value.rgb.g}, ${data.value.rgb.b}, ${data.value.rgb.a})`;
          break;
        case "fontWeight":
          if (data?.target.checked) {
            changeData.values.fontWeight = "bold";
          } else {
            changeData.values.fontWeight = "normal";
          }
          break;
        case "fontStyle":
          if (data?.target.checked) {
            changeData.values.italic = "italic";
          } else {
            changeData.values.italic = "normal";
          }
          break;
        default:
          if (data) {
            changeData.values[cssProperties] = data.target?.value || data;
          }
          break;
      }
      console.log('changeData', changeData)
      setresult(changeData);
      return changeData;
    },
    [result]
  );

  return [result, pickToResult];
};

export default useCssPicker;
