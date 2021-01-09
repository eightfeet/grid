import description from "./description.json";
import * as compiler from "./compiler";

interface Params {
  [keys: string]: any;
}

function handler(styleGroup: Params):{style: React.CSSProperties, strStyle: string} {
  if (Object.prototype.toString.call(styleGroup) !== "[object Object]")
    return {style: {}, strStyle: '' };
  const descriptionKeys = Object.keys(description);
  const compiledResult = {
    style: {},
    strStyle: ''
  };

  const stringResult: any[] = [];

  for (let index = 0; index < descriptionKeys.length; index++) {
    const descriptionKey = descriptionKeys[index];
    const styleObj = styleGroup[descriptionKey];
    if (
      (Object.prototype.toString.call(styleObj) !== "[object Object]" ||
      Object.keys(styleObj).length < 1 ) &&
      Object.prototype.toString.call(styleObj) !== "[object Array]"
    ) {
      continue;
    }

    let generateStyle: {
      result: Params,
      string: string
    } = {
      result: {},
      string: ''
    };
    switch (descriptionKey) {
      case "display":
        generateStyle = compiler.display(styleObj);
        break;
      case "backgroundGradient":
        generateStyle = compiler.backgroundGradient(styleObj);
        break;
      case "backgroundCommon":
        generateStyle = compiler.backgroundCommon(styleObj);
        break;
      case "border":
        generateStyle = compiler.border(styleObj);
        break;
      case "boxShadow":
        generateStyle = compiler.boxShadow(styleObj);
        break;
      case "textShadow":
        generateStyle = compiler.textShadow(styleObj);
        break;
      case "font":
        generateStyle = compiler.font(styleObj);
        break;
      case "transform":
        generateStyle = compiler.transform(styleObj);
        break;
      default:
        break;
    }
    compiledResult.style = {...compiledResult.style, ...generateStyle.result};
    stringResult.push(generateStyle.string);
  }
  compiledResult.strStyle= stringResult.join(' ');
  return compiledResult;
}

export default handler;
