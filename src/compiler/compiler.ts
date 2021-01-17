import description from "./description.json";
import { createInlineStyles } from '@eightfeet/modal';

interface objType {
    [key: string]: any
}

interface resultType {
    result: objType,
    string: string
}

/** 获取单位 */
const getUnit: (key: string, type: string, subType?: string) => string = (
  key,
  type,
  subType
) => {
  let items: any[] = [];
  if (subType) {
    items = (description as { [key: string]: any })[type][subType][key];
  } else {
    items = (description as { [key: string]: any })[type][key];
  }
  if (!items) return;
  return items[2];
};

/** 数据单位处理 */
const conversionValue: (
  value: string | number,
  key: string,
  type: string,
  subType?: string
) => string|undefined = (value, key, type, subType) => {
  const unit = getUnit(key, type, subType);
  if (value === undefined || value === null) return;
  return `${value}${unit || ""}`;
};

export const display = function (styleObj:objType):resultType {
  const result: objType = {};
  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      let newKey = key;
      result[newKey] = conversionValue(element, key, "display");
    }
  }
  return {
      result,
      string: createInlineStyles(result) || ''
  };
};

export const backgroundGradient = function (styleObj:objType):resultType {
  let type: string = "linear-gradient";
  const result: objType = {};

  const puppet: objType = {
    moz: [null],
    webkit: [null],
    normal: [null],
  };

  const getParame0 = (element: any): string => {
    if (element === "left") return "to right";
    if (element === "top") return "to bottom";
    if (element === "-45deg") return "135deg";
    if (element === "center") {
      type = "radial-gradient";
      return "ellipse at center";
    }
    return element;
  };

  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      if (key === "gradientDirections") {
        puppet.moz[0] = puppet.webkit[0] = element;
        puppet.normal[0] = getParame0(element);
      }

      if (key === "gradient") {
        (element as any[]).forEach(({ color, transition }) => {
          if (color !== undefined && transition !== undefined) {
            const group = `${conversionValue(
              color,
              "color",
              "backgroundGradient",
              "gradient"
            )} ${conversionValue(
              transition,
              "transition",
              "backgroundGradient",
              "gradient"
            )}`;
            puppet.moz.push(group);
            puppet.webkit.push(group);
            puppet.normal.push(group);
          }
        });
      }
    }
  }

  let prefixResult = [];
  for (const key in puppet) {
    if (Object.prototype.hasOwnProperty.call(puppet, key)) {
      const resultItem = puppet[key].join(', ');
      
      if (key === 'normal') {
        prefixResult.push(`background: ${type}(${resultItem});`);
        result[`background`] = `${type}(${resultItem})`;
      } else {
        prefixResult.push(`background: -${key}-${type}(${resultItem});`);
      }
    }
  }
  
  return {
    result,
    string: prefixResult.join(' ')
  };
};

export const backgroundCommon = function (styleObj:objType):resultType {
    const rules: {background: any[], backgroundSize: any[]} = {
        background:[null/*backgroundColor*/, null/*imageUrl*/, null/*repeat*/, null/*positionX*/, null/*positionY*/],
        backgroundSize:[null/*sizeX*/, null/*sizeY*/]
    }

    const BGposition: objType = {
        backgroundColor: 0,
        imageUrl: 1,
        repeat: 2,
        positionX: 3,
        positionY: 4
    };
    const BGSbackgroundSize: objType = {
        sizeX: 0,
        sizeY: 1
    }
 
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'backgroundCommon');
            if (BGposition[key] !== undefined) {
                if (key === 'imageUrl') {
                    rules.background[BGposition[key]] = `url("${value}")`;
                } else {
                    rules.background[BGposition[key]] = value;
                }
            }
            if (BGSbackgroundSize[key] !== undefined) {
                rules.backgroundSize[BGSbackgroundSize[key]] = value;
            }
        }
    }

    const result: objType = {};
    if(rules.background[1]) {
        if (!rules.background[3] && rules.background[4]) {
            rules.background[3] = 'auto'
        }
        if (!rules.background[4] && rules.background[3]) {
            rules.background[4] = 'auto'
        }
        if (!rules.backgroundSize[0] && rules.backgroundSize[1]) {
            rules.backgroundSize[0] = 'auto'
        }
        if (!rules.backgroundSize[1] && rules.backgroundSize[0]) {
            rules.backgroundSize[1] = 'auto'
        }
    } else {
        rules.background[2] = rules.background[3] = rules.background[4] = null;
    }
    
    result.background = rules.background.filter(item => !!item).join(' ');
    if (rules.background[1] && rules.backgroundSize[0] && rules.backgroundSize[1]) {
        result.backgroundSize = rules.backgroundSize.filter(item => !!item).join(' ');
    }
    
  return {
    result,
    string: createInlineStyles(result) || ''
  };
};

export const border = function (styleObj:objType):resultType {
    // border-radius: {radiusTopLeft} {radiusTopRight} {radiusBottomLeft} {radiusBottomRight}; 
    // border{borderPosition}: {borderWidth} {borderStyle} {borderColor};
    let type='';
    const rules: {
        borderRadius: any[],
        border: any[]
    } = {
        borderRadius: [null/*radiusTopLeft*/, null/*radiusTopRight*/, null/*radiusBottomLeft*/, null/*radiusBottomRight*/],
        border: [null/*borderWidth*/, null/*borderStyle*/, null/*borderColor*/]
    }
    const BRPosition: objType = {
        radiusTopLeft: 0,
        radiusTopRight: 1,
        radiusBottomLeft: 2,
        radiusBottomRight: 3
    };
    const BPosition: objType = {
        borderWidth: 0,
        borderStyle: 1,
        borderColor: 2
    }
    
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'border');
            if (BRPosition[key] !== undefined) {
                rules['borderRadius'][BRPosition[key]] = value;
            }
            if (BPosition[key] !== undefined) {
                rules['border'][BPosition[key]] = value;
            }
        }
    }

    const result: objType= {};
    rules.borderRadius.forEach((element, i) => {
        if(element === null) rules.borderRadius[i] = '0';
    });
    const brJoined = rules.borderRadius.join(' ');
    
    if (brJoined !== '0 0 0 0') {
        result.borderRadius = rules.borderRadius.join(' ');
    }

    result[`border${type}`] = rules.border.filter(item => !!item).join(' ');

    return {
        result,
        string: createInlineStyles(result) || ''
      };
};

export const boxShadow = function (styleObj:objType):resultType {
    // -webkit-box-shadow:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    // box-shadow:{inset} {shifRight} {shiftDown} {spread} {blur} {color};

    const position: objType = {
        inset: 0,
        shifRight: 1,
        shiftDown: 2,
        spread: 3,
        blur: 4,
        color: 5
    }

    const rules: any[] = [];

    (window as any).rules = rules;
    
    styleObj.forEach((SDitem:objType) => {
        let rule: any[] = [];
        rule.length = 6;
        for (const key in SDitem) {
            if (Object.prototype.hasOwnProperty.call(SDitem, key)) {
                const element = SDitem[key];
                const value = conversionValue(element, key, 'boxShadow');
                rule[position[key]] = value;
            }
        }
        if (!rule[1]) rule[1] = '0';
        if (!rule[2]) rule[2] = '0';
        if (!rule[3]) rule[3] = '0';
        if (!rule[4]) rule[4] = '0';
        if (rule[5]) {
            rules.push(rule.filter(e => (!!e)).join(' '))
        }
    });
    
    const result: objType = {};
    result.boxShadow = rules.join(', ');

    const prefixResult = [];
    const str = createInlineStyles(result);
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);
    
    return {
        result,
        string: prefixResult.join('')
      };
};

export const textShadow = function (styleObj:objType):resultType {
    // -webkit-text-shadow:{shifRight} {shiftDown} {blur} {color};
    // text-shadow:{shifRight} {shiftDown} {blur} {color};

    const position: {
        [keys: string]: any;
      } = {
        shifRight: 0,
        shiftDown: 1,
        blur: 2,
        color: 3
    }

    const rules: any[] = [];

    (window as any).rules = rules;
    
    styleObj.forEach((TSDitem:objType )=> {
        let rule: any[] = [];
        rule.length = 4;
        for (const key in TSDitem) {
            if (Object.prototype.hasOwnProperty.call(TSDitem, key)) {
                const element = TSDitem[key];
                const value = conversionValue(element, key, 'textShadow');
                rule[position[key]] = value;
            }
        }
        if (!rule[0]) rule[0] = '0';
        if (!rule[1]) rule[1] = '0';
        if (!rule[2]) rule[2] = '0';
        if (rule[3]) {
            rules.push(rule.filter(e => (!!e)).join(' '))
        }
    });
    
    const result: {
        [keys: string]: any;
      } = {};
    result.textShadow = rules.join(', ');

    const str = createInlineStyles(result);
    const prefixResult = [];
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);

    return {
        result,
        string: prefixResult.join('')
      };
};

export const font = function (styleObj:objType):resultType {
    const rules:objType  = {
        fontStyle: 'fontStyle',
        fontWeight: 'fontWeight',
        fontSize: 'fontSize',
        lineHeight: 'lineHeight',
        color: 'color',
        letterSP: 'letterSpacing',
        wordSp: 'wordSpacing',
        decoration: 'textDecoration',
        align: 'textAlign',
    }
    const result: objType = {};
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'font');
            if (value) {
              result[rules[key]] = value;
            }
        }
    }

    const str = createInlineStyles(result) || '';

  return {
    result,
    string: str
  };;
};


export const transform = function (styleObj:objType):resultType {
    // -moz-transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    // -webkit-transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    // transform: {scale} {rotate} translate({translateX}, {translateY}) skew({skewX}, {skewY});
    const prefix: string[] = ['webkit', 'moz'];
    const position: objType = {
        scale: 0,
        rotate: 1,
        translate: 2,
        skew: 3
    }
    const singleProp: objType = ({
        scale: (value: string) => `scale(${value})`,
        rotate: (value: string) => `rotate(${value})`,
    });
    const rules:any[]  = [];
    let translateRule: any[] = [null, null];
    let skewRule: any[] = [null, null];

    rules.length = 4;
    const result: objType = {};
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'transform');
            if (value) {
                if (singleProp[key]) {
                    rules[position[key]] = singleProp[key](value)
                } 
                // {translateX}, {translateY}) skew({skewX}, {skewY}
                if (key === 'translateX') translateRule[0] = value;
                if (key === 'translateY') translateRule[1] = value;
                if (key === 'skewX') skewRule[0] = value;
                if (key === 'skewY') skewRule[1] = value;
            }
        }
    }

    let translate, skew;

    translate = translateRule.map(item => {
        if(!item) {
            return '0'
        } 
        return item
    }).join(', ');

    skew = skewRule.map(item => {
        if(!item) {
            return '0'
        } 
        return item
    }).join(', ');

    if (translate !== '0, 0') rules[position['translate']] = `translate(${translate})`;
    if (skew !== '0, 0') rules[position['skew']] = `skew(${skew})`;

    result['transform'] = rules.filter(item => !!item).join(' ');

    const str = createInlineStyles(result);
    const prefixResult = [];
    prefixResult.push(`-moz-${str}`);
    prefixResult.push(`-webkit-${str}`);
    prefixResult.push(str);

  return {
    result,
    string: prefixResult.join(' ')
  };
};
