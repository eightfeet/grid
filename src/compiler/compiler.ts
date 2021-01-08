import description from './description.json'

/** 获取单位 */
const getUnit:(type: string, key: string)=>string = (type, key) => {
    return (description as any)[type][key][2];
}

/** 数据单位处理 */
const conversionValue: (value: string | number, type: string, key: string) => string = (
    value,
    type,
    key,
) => {
    const unit = getUnit(type, key);
    return `${value}${unit || ''}`
};

export const display = function({styleObj}: any) {
    const keys = Object.keys(styleObj);
    const result: {[keys: string]: any} = {}
    keys.forEach(element => {
        let newKey = element;
        if (newKey === 'zIndex') {
            newKey = 'z-index';
        }
        result[newKey] = conversionValue(styleObj[element], 'display', element);
    });
    console.log('result', result);
    return ''
}

export const backgroundGradient = function(data: any) {
    
    return ''
}
export const backgroundCommon = function(data: any) {
    return ''
}
export const border = function(data: any) {
    return ''
}
export const boxShadow = function(data: any) {
    return ''
}
export const textShadow = function(data: any) {
    return ''
}
export const font = function(data: any) {
    return ''
}
