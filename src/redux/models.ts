import { Models } from '@rematch/core'
import { appData } from './appDataModel'
import { activationItem } from './activationItem'
import { controllerRebuild } from './controllerRebuild'

export interface RootModel extends Models<RootModel> {
    appData: typeof appData,
    activationItem: typeof activationItem,
    controllerRebuild: typeof controllerRebuild
}

export const models: RootModel = { appData, activationItem, controllerRebuild }