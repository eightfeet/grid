interface Params {
    targetKey: string;
    targetValue: string;
    unit?: string;
    result: string;
}

type fun = (params: Params) => string[];

const layout:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const backgroundGradient:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const backgroundCommon:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult='';
    switch (targetKey) {
        case 'imageUrl':
            str = `url("${targetValue}")`
            break;
        default:
            str = `${targetValue}${unit || ''}`;
            break;
    }
    // console.log(str);
    console.log(targetValue, '本次结果', result);
    return [newResult, str]
}

const border:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const shadow:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const font:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const transform:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

export default {
    layout,
    backgroundGradient,
    backgroundCommon,
    border,
    shadow,
    font,
    transform
}