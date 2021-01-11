import { Models } from '@rematch/core'
import { appData } from './appDataModel'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData
}

export const models: RootModel = { appData }