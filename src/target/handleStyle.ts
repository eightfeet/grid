interface Params {
    targetKey: string;
    targetValue: string | number;
    unit?: string;
    result: string;
}

type fun = (params: Params) => string[];

const conversionValue: (value: string | number, unit?: string) => string = (value, unit) => `${value}${unit || ''}`;

const layout:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    str = `${str}${unit || ''}`;
    return [newResult, str]
}

const backgroundGradient:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    switch (targetKey) {
        case 'gradientDirections':
            console.log('newResult', newResult)
            switch (targetValue) {
                case 'left':
                    newResult = newResult.replace(': linear-gradient({gradientDirections}', ': linear-gradient(to right')
                    break;
                case 'top':
                    newResult = newResult.replace(': linear-gradient({gradientDirections}', ': linear-gradient(to bottom')
                    break;
                case '-45deg':
                    newResult = newResult.replace(': linear-gradient({gradientDirections}', ': linear-gradient(135deg')
                    break;
                case 'center':
                    newResult = newResult.replace(': linear-gradient({gradientDirections}', ': linear-gradient(ellipse at center')
                    break;
            
                default:
                    break;
            }
            if (targetValue === 'center') {
                newResult = newResult.replace(/linear-/g, 'radial-')
            } else {
                newResult = newResult.replace(/radial-/g, 'linear-')
            }
            str = conversionValue(targetValue, unit);
            break;
        default:
            str = conversionValue(targetValue, unit);
            break;
    }
    return [newResult, str]
}

const backgroundCommon:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    switch (targetKey) {
        case 'imageUrl':
            str = `url("${targetValue}")`;
            break;
        case 'positionX': 
            str = conversionValue(targetValue, unit);
            break;
        case 'positionY': 
            str = conversionValue(targetValue, unit);
            newResult = newResult.replace('/*positionX*/', 'auto')
            break;
        case 'sizeY':
            str = conversionValue(targetValue, unit);
            newResult = newResult.replace('/*sizeX*/', 'auto');
            break;
            
        default:
            str = conversionValue(targetValue, unit);
            break;
    }
    return [newResult, str]
}

const border:fun = ({targetKey, targetValue, unit, result}) => {
    let str='';
    let newResult=result;
    switch (targetKey) {
        case 'borderPosition':
            console.log(targetKey, targetValue, unit, result)
            if (targetValue === 'all') {
                str = '';
            } else {
                str = `-${targetValue}`;
            }
            
            break;
        default:
            str = conversionValue(targetValue, unit);
            break;
    }
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