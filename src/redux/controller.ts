import { createModel } from '@rematch/core'
import { RootModel } from './models'

export const controller = createModel<RootModel>()({
    state: {
        stateTag: false,
        isEditing: false,
    } as {
        stateTag?: boolean,
        isEditing?: boolean,
    }, // typed complex state
    reducers: {
        setStateTag(state, payload:boolean) {
            return {...state, stateTag: payload};
        },
        setIsEditing (state, payload:boolean) {
            return {...state, isEditing: payload};
        }
    }
});