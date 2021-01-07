import targets from './targets';
import rules from './targetrules.json';
import handleStyle from './handleStyle';

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
const handleTarget:handleTargetType  = ({
  targetGroupName,
  targetValue,
  targetKey,
  result
}) => {
    const rule: {[keys: string]: any} = rules[targetGroupName];
    if (!rule || !targetValue) {
      return [result, '']
    }
    const ruleItem = rule[targetKey];
    const currentTarget = targets[targetGroupName];

    let targetStr = '';
    let newResult = ''
    switch (targetGroupName as string) {
        case 'backgroundCommon':
            const [newRes, str] = handleStyle.backgroundCommon({targetKey, targetValue, unit: ruleItem[2], result});
            targetStr = str;
            newResult = newRes;
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
type targetNameType =
    | 'layout'
    | 'backgroundGradient'
    | 'backgroundCommon'
    | 'border'
    | 'shadow'
    | 'font'
    | 'transform';

const hitChart = (
  targetGroupName: targetNameType,
    hitData: { [keys: string]: any }
) => {
    const allHitData = Object.keys(hitData || {});
    // if empty
    if (allHitData.length < 1) return '';
    // result & allTargets
    let result: string = targets[targetGroupName];
    if (!result) return '' ;
    const allTargets = Object.keys(rules[targetGroupName] || {});
    // charting
    allTargets.forEach((target) => {
        // target judger
        const judger = new RegExp(
            `(\\[${target}\\])|(\\{${target}\\})`,
            'g'
        );
        if (hitData[target]) {
            // hit
            const [newResult, str] = handleTarget({targetValue: hitData[target], targetKey: target, targetGroupName, result});
            result = newResult;
            result = result.replace(judger, str);
        } else {
            // miss
            result = result.replace(judger, '');
        }
    });

    // count result
    result = result.replace(/[\r\n]/g, '').replace(/\s+/g, ' ');
    console.log('styleResult  =', result)
    return result;
};

export default hitChart;
