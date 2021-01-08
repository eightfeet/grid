interface Params {
    targetKey: string;
    targetValue: string | number;
    unit?: string;
    result: string;
}

type fun = (params: Params) => string[];

/** 数据单位处理 */
const conversionValue: (value: string | number, unit?: string) => string = (
    value,
    unit
) => `${value}${unit || ''}`;

/** create simple style str */
const createSSS: (
    key: string,
    value: any,
    unit?: string,
    replaceStr?: string
) => string = (key, value, unit, replaceStr) =>
    `${replaceStr || key}:${conversionValue(value, unit)};`;

const display: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'zIndex':
            str = createSSS(targetKey, targetValue, unit, 'z-index');
            break;
        default:
            str = createSSS(targetKey, targetValue, unit);
            break;
    }
    return [newResult, str];
};

const backgroundGradient: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'gradientDirections':
            console.log('newResult', newResult);
            switch (targetValue) {
                case 'left':
                    newResult = newResult.replace(
                        ': linear-gradient({gradientDirections}',
                        ': linear-gradient(to right'
                    );
                    break;
                case 'top':
                    newResult = newResult.replace(
                        ': linear-gradient({gradientDirections}',
                        ': linear-gradient(to bottom'
                    );
                    break;
                case '-45deg':
                    newResult = newResult.replace(
                        ': linear-gradient({gradientDirections}',
                        ': linear-gradient(135deg'
                    );
                    break;
                case 'center':
                    newResult = newResult.replace(
                        ': linear-gradient({gradientDirections}',
                        ': linear-gradient(ellipse at center'
                    );
                    break;

                default:
                    break;
            }
            if (targetValue === 'center') {
                newResult = newResult.replace(/linear-/g, 'radial-');
            } else {
                newResult = newResult.replace(/radial-/g, 'linear-');
            }
            str = conversionValue(targetValue, unit);
            break;
        default:
            str = conversionValue(targetValue, unit);
            break;
    }
    return [newResult, str];
};

const backgroundCommon: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'imageUrl':
            str = `url("${targetValue}")`;
            break;
        case 'positionX':
            str = conversionValue(targetValue, unit);
            break;
        case 'positionY':
            str = conversionValue(targetValue, unit);
            newResult = newResult.replace('/*positionX*/', 'auto');
            break;
        case 'sizeY':
            str = conversionValue(targetValue, unit);
            newResult = newResult.replace('/*sizeX*/', 'auto');
            break;

        default:
            str = conversionValue(targetValue, unit);
            break;
    }
    return [newResult, str];
};

const border: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'borderPosition':
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
    return [newResult, str];
};

const shadow: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'inset':
            if (targetValue === 'inset') {
                str = 'inset';
            } else {
                str = '';
            }
            break;
        default:
            str = conversionValue(targetValue, unit);
            break;
    }
    return [newResult, str];
};

const font: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    switch (targetKey) {
        case 'italic':
            if (targetValue === 'italic') {
                str = `font-style:${targetValue};`;
            } else {
                str = `font-style:normal;`;
            }
            break;
        case 'weight':
            str = createSSS(targetKey, targetValue, unit, 'font-weight');
            break;
        case 'fontSize':
            str = createSSS(targetKey, targetValue, unit, 'font-size');
            break;
        case 'lineHeight':
            str = createSSS(targetKey, targetValue, unit, 'line-height');
            break;
        case 'color':
            str = createSSS(targetKey, targetValue, unit);
            break;
        case 'letterSP':
            str = createSSS(targetKey, targetValue, unit, 'letter-spacing');
            break;
        case 'wordSP':
            str = createSSS(targetKey, targetValue, unit, 'word-spacing');
            break;
        case 'align':
            str = createSSS(targetKey, targetValue, unit, 'text-align');
            break;
        case 'decoration':
            str = createSSS(targetKey, targetValue, unit, 'text-decoration');
            break;
        default:
            break;
    }
    return [newResult, str];
};

const transform: fun = ({ targetKey, targetValue, unit, result }) => {
    let str = '';
    let newResult = result;
    str = `${str}${unit || ''}`;
    return [newResult, str];
};

export default {
    display,
    backgroundGradient,
    backgroundCommon,
    border,
    shadow,
    font,
    transform,
};
