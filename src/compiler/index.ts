import description from "./description.json";
import * as compiler from "./compiler";

interface Params {
  [keys: string]: any;
}

function handler(styleGroup: Params) {
  if (Object.prototype.toString.call(styleGroup) !== "[object Object]")
    return "";
  const descriptionKeys = Object.keys(description);
  const compiledResult = [];

  for (let index = 0; index < descriptionKeys.length; index++) {
    const descriptionKey = descriptionKeys[index];
    const styleObj = styleGroup[descriptionKey];
    if (
      Object.prototype.toString.call(styleObj) !== "[object Object]" ||
      Object.keys(styleObj).length < 1
    ) {
      continue;
    }

    let generateStyle: string = "";
    switch (descriptionKey) {
      case "display":
        generateStyle = compiler.display({styleObj});
        break;
      case "backgroundGradient":
        generateStyle = compiler.backgroundGradient({styleObj});
        break;
      case "backgroundCommon":
        generateStyle = compiler.backgroundCommon({styleObj});
        break;
      case "border":
        generateStyle = compiler.border({styleObj});
        break;
      case "boxShadow":
        generateStyle = compiler.boxShadow({styleObj});
        break;
      case "textShadow":
        generateStyle = compiler.textShadow({styleObj});
        break;
      case "font":
        generateStyle = compiler.font({styleObj});
        break;
      default:
        break;
    }
    if (generateStyle) compiledResult.push(generateStyle);
  }
  console.log(compiledResult);
  console.log("params", styleGroup);
  return "";
}

export default handler;
