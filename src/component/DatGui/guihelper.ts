import * as dat from "dat.gui";

interface obgType {
  [keys: string]: any;
}

export const initGui = (
  data: obgType,
  setheight: (height: number) => void,
  defaultData: obgType
): any => {
  let configData: {[keys: string]:any} = data;
  if (configData?.gradient && configData?.gradientDirections) {
    configData = {
      gradientDirections: configData.gradientDirections,
      ...configData.gradient
    }
  }

  const configArr = Object.keys(configData || {});
  if (configArr.length === 0) {
    return;
  }
  const guiData: obgType = {};
  configArr.forEach((key: string) => {
    const element: any[] = configData[key];
    guiData[key] = element[3]?.default;
      if (Array.isArray(element[3])) {
        guiData[key] = element[3][0].value;
      }
      if (element[0] === "color") {
        guiData[key] = "#000";
      }
      if (element[0] === "upload") {
        guiData[key] = "";
      }
  });

  if (defaultData) {
    Object.keys(defaultData)?.forEach(key => {
      if(defaultData[key]){
        guiData[key] = defaultData[key];
      }
    })
  }
  

  const gui = new dat.GUI({
    closeOnTop: true,
  });
  const wrap: any = gui.domElement;
  wrap.parentNode.style.zIndex = 1000;
  wrap.id = "guiwrap";
  setheight(wrap.offsetHeight);
  gui.width = window.innerWidth;
  guiAdd(guiData, configData, gui);

  return gui;
};

export const setGuiData = (guiData: any) => {
  
}


export const guiAdd = (guiData: any, rawData: any, gui: dat.GUI) => {
  Object.keys(guiData).forEach((key) => {
    if (rawData[key]) {
      const type = rawData[key][0];
      const name = rawData[key][1];
      const unit = rawData[key][2];
      const options = rawData[key][3];

      if (type === "number")
        gui
          .add(guiData, key, options.start, options.end)
          .name(`${name}${unit ? `(${unit})` : ""}`);

      if (type === "upload")
        gui
          .add(guiData, key)
          .name(`${name}${unit ? `(${unit})` : ""}`);

      if (type === "select") {
        const optionsArr: string[] = [];
        (options as string[]).forEach((item: any) => {
          optionsArr.push(item.value);
        });
        gui
          .add(guiData, key, optionsArr)
          .name(`${name}${unit ? `(${unit})` : ""}`);
      }

      if (type === "color") {
        // gui.addColor(guiData, key).name(`${name}${unit ? `(${unit})` : ""}`);
      }
    }
  });
};
