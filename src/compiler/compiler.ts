import description from "./description.json";

interface objType {
    [key: string]: any
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

export const display = function ({ styleObj }: any) {
  const result: objType = {};
  for (const key in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
      const element = styleObj[key];
      let newKey = key;
      if (newKey === "zIndex") {
        newKey = "z-index";
      }
      result[newKey] = conversionValue(element, key, "display");
    }
  }
  console.log('result', result)
  return "";
};

export const backgroundGradient = function ({ styleObj }: any) {
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
          if (color && transition) {
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

  for (const key in puppet) {
    if (Object.prototype.hasOwnProperty.call(puppet, key)) {
      const resultItem = puppet[key].join(', ');
      if (key === 'normal') {
        result[`background/*${key}*/`] = `${type}(${resultItem})`;
      } else {
        result[`background/*${key}*/`] = `-${key}-${type}(${resultItem})`;
      }
    }
  }
  // console.log('result', result);
  return "";
};

export const backgroundCommon = function ({ styleObj }: any) {
    const rules: {background: any[], backgroundSize: any[]} = {
        background:[null/*backgroundColor*/, null/*imageUrl*/, null/*repeat*/, null/*positionX*/, null/*positionY*/],
        backgroundSize:[null/*sizeX*/, null/*sizeY*/]
    }

    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'backgroundCommon');
            switch (key) {
                case 'backgroundColor':
                    rules.background[0] = value
                    break;
                case 'imageUrl':
                    rules.background[1] = `url("${value}")`;
                    break;
                case 'repeat':
                    rules.background[2] = value;
                    break;
                case 'positionX':
                    rules.background[3] = value;
                    break;
                case 'positionY':
                    rules.background[4] = value;
                    break;
                case 'sizeX':
                    rules.backgroundSize[0] = value;
                    break;
                case 'sizeY':
                    rules.backgroundSize[1] = value;
                    break;
                default:
                    break;
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
    
    // console.log('result', result);
  return "";
};

export const border = function ({ styleObj }: any) {
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
    
    for (const key in styleObj) {
        if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
            const element = styleObj[key];
            const value = conversionValue(element, key, 'border');
            switch (key) {
                case 'radiusTopLeft':
                    rules.borderRadius[0] = value;
                    break;
                case 'radiusTopRight':
                    rules.borderRadius[1] = value;
                    break;
                case 'radiusBottomLeft':
                    rules.borderRadius[2] = value;
                    break;
                case 'radiusBottomRight':
                    rules.borderRadius[3] = value;
                    break;
                case 'borderWidth':
                    rules.border[0] = value;
                    break;
                case 'borderStyle':
                    rules.border[1] = value;
                    break;
                case 'borderColor':
                    rules.border[2] = value;
                    break;
                case 'borderPosition':
                    if(element !== 'all') type=value||'';
                    break;
                default:
                    break;
            }
        }
    }

    const result: objType= {};
    rules.borderRadius.forEach((element, i) => {
        if(element === null) rules.borderRadius[i] = 0;
    });
    const brJoined = rules.borderRadius.join(' ');
    
    if (brJoined !== '0 0 0 0') {
        result.borderRadius = rules.borderRadius.join(' ');
    }

    result[`border${type}`] = rules.border.join(' ');

    // console.log('rules', rules)
    // console.log('result', result)
  return "";
};
export const boxShadow = function ({ styleObj }: { styleObj: any[]}) {
    // -webkit-box-shadow:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    // {type}:{inset} {shifRight} {shiftDown} {spread} {blur} {color};
    const puppet: objType = {
        webkit: [null],
        normal: [null],
      };

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
    
    styleObj.forEach(SDitem => {
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
    result.boxShadow = rules.join(', ')
    
    console.log('result', result)
  return "";
};

export const textShadow = function ({ styleObj }: { styleObj: any[]}) {
    // -webkit-text-shadow:{shifRight} {shiftDown} {blur} {color};
    // text-shadow:{shifRight} {shiftDown} {blur} {color};
    const puppet: {
        [keys: string]: any[];
      } = {
        webkit: [null],
        normal: [null],
      };

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
    
    styleObj.forEach(TSDitem => {
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
    result.textShadow = rules.join(', ')
    
    console.log('result', result)
  return "";
};

export const font = function ({ styleObj }: any) {
    const rules:objType  = {
        italic: 'fontStyle',
        weight: 'fontWeight',
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
    
    console.log('result', result)
  return "";
};
