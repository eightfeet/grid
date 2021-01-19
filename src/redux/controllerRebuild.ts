import { createModel } from '@rematch/core'
import { RootModel } from './models'

export const controllerRebuild = createModel<RootModel>()({
    state: false as boolean, // typed complex state
    reducers: {
        setState(state, payload:boolean) {
            return payload;
        }
    }
});