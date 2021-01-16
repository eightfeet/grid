import { store } from "~/redux/store";
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

import { AppDataElementsStyleTypes } from "types/appData";

const useMergeAppData = () => {
    const update = (data: AppDataElementsStyleTypes) => {
        
        const appData = cloneDeep(store.getState().appData);
        const activationItem = cloneDeep(store.getState().activationItem);
        // 合并数据
        merge(activationItem, {style: data});
        // 返回数据集
        const result = appData.map(item => {
            if (item.moduleId === activationItem.moduleId) {
                return activationItem
            }
            return item;
        })

        store.dispatch.appData.updateAppData(result);
        store.dispatch.activationItem.updateActivationItem(activationItem);

    }

    return update
}

export default useMergeAppData;