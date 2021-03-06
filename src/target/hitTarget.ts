import targets from "./targets";
import rules from "./targetrules.json";
import handleStyle from "./handleStyle";

interface handleTargetParaments {
  /** 命中目标值 */
  targetValue: string;
  /** 命中目属性名 */
  targetKey: string;
  /** 目标组名 */
  targetGroupName: targetNameType;
  /** 当前处理结果 */
  result: string;
}

type handleTargetType = (prames: handleTargetParaments) => string[];

// 命中结果处理
const handleTarget: handleTargetType = ({
  targetGroupName,
  targetValue,
  targetKey,
  result,
}) => {
  const rule: { [keys: string]: any } = rules[targetGroupName];
  if (!rule) {
    return [result, ""];
  }
  if (targetValue === undefined) {
    return [result, `/*${targetValue}*/`];
  }
  const ruleItem = rule[targetKey];

  let targetStr = "";
  let newResult = "";
  const data = {
    targetKey,
    targetValue,
    unit: ruleItem[2],
    result,
  };
  const setValue = (result: string, target: string) => {
        targetStr = target;
      newResult = result;
  }
  switch (targetGroupName as string) {
    case "backgroundCommon":
      const [newResBC, strBC] = handleStyle.backgroundCommon(data);
      setValue(newResBC, strBC);
      break;
    case "backgroundGradient":
      const [newResBG, strBG] = handleStyle.backgroundGradient(data);
      setValue(newResBG, strBG);
      break;
    case "border":
      const [newResBorder, strBorder] = handleStyle.border(data);
      setValue(newResBorder, strBorder);
      break;
    case "boxShadow":
    case "textShadow":
        
      const [newResShadow, strShadow] = handleStyle.shadow(data);
      setValue(newResShadow, strShadow);
      break;
    case "font":
      const [newResFont, strFont] = handleStyle.font(data);
      setValue(newResFont, strFont);
      break;
    case "transform":
      const [newResTransform, strTransform] = handleStyle.transform(data);
      setValue(newResTransform, strTransform);
      break;
    case "display":
      const [newResDisplay, strDisplay] = handleStyle.display(data);
      setValue(newResDisplay, strDisplay);
      break;
    default:
      break;
  }
  return [newResult, targetStr];
};

/**
 * hit chart
 * @param {targetNameType} targetGroupName 靶向组名
 * @param {{ [keys: string]: any }} hitData 本组命中结果
 * @return {*}
 */
export type targetNameType =
  | "display"
  | "backgroundGradient"
  | "backgroundCommon"
  | "border"
  | "boxShadow"
  | "textShadow"
  | "font"
  | "transform";

const hitChart = (
  targetGroupName: targetNameType,
  hitData: { [keys: string]: any }
) => {
  const allHitData = Object.keys(hitData || {});
  // if empty
  if (allHitData.length < 1) return "";
  // result & allTargets
  let result: string = targets[targetGroupName];
  if (!result) return "";
  const allTargets = Object.keys(rules[targetGroupName] || {});
  
  // charting
  for (let index = 0; index < allTargets.length; index++) {
      // 
      const target = allTargets[index];
      // target judger
    const judger = new RegExp(`(\\[${target}\\])|(\\{${target}\\})`, "g");
    if (hitData[target] !== undefined) {
      // hit
      const [newResult, str] = handleTarget({
        targetValue: hitData[target],
        targetKey: target,
        targetGroupName,
        result,
      });
      result = newResult;
      result = result.replace(judger, str);
    } else {
      // miss
      result = result.replace(judger, `/*${target}*/`);
    }
  }

  // count result
  console.log(result);
  result = result
    .replace(/\/\*([\s\S]*?)\*\//g, "") // 移除注释
    .replace(/[\r\n]/g, "") // 移除换行
    .replace(/\s+/g, " ") // 移除多余空格
    .replace(/(:\s+)/g, ":") // 移除冒号后的空格
    .replace(/(\s+;)/g, ";") // 移除分号前的空格
    .replace(/(,\s+,)/g, ",") // 移除逗号间的空格
    .replace(/\(,\s+/g, '(')
    .replace(/\s+\);/g, ');')
    .replace(/,\s+\)\s/g, '); ')
    .replace(/(^\s*)|(\s*$)/g, ""); // 移除首尾空格
    console.log("styleResult  =", result);
  return result;
};

export default hitChart;
