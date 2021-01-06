import targets from "./targets";
import rules from './targetrules.json';

type targetNameType =
  | "layout"
  | "backgroundGradient"
  | "backgroundCommon"
  | "border"
  | "shadow"
  | "font"
  | "transform";

const hitTarget = (
  targetName: targetNameType,
  targetData: { [keys: string]: any }
) => {
  // 靶向
  let styleSheet: string = targets[targetName] || "";
  // shooter
  const targetRules = Object.keys(rules[targetName] || {});
  
  targetRules.forEach(element => {
    if (targetData[element]) {
        // 命中处理

    } else {
        // 未命中移除目标
        const regexp = new RegExp(`/[\\[${element}\\]]/g`)
        styleSheet = styleSheet.replace(regexp, '')
    }
  })

  
  // 移除换行与多余空格
  styleSheet = styleSheet.replace(/[\r\n]/g, "").replace(/\s+/g, " ");
  return styleSheet;
};

export default hitTarget;
