import { createModel } from '@rematch/core'
import { AppDataLayoutItemTypes } from '../../types/appData';
import { RootModel } from './models'

interface activationItemType {
    id?: string,
    item?: AppDataLayoutItemTypes
}

export const activationItem = createModel<RootModel>()({
    state: {
        id: '',
        item: {}
    } as activationItemType, 
    reducers: {
        updateActivationItem(state, payload: activationItemType) {
            return {...state, ...payload};
        },
    }
});