import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem
}

export const models: RootModel = { appData, activationItem }