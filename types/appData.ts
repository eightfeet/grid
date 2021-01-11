import { Layout } from 'react-grid-layout';

export interface AnyObjectType {
    [keys: string]: any;
}

export type AppDataModuleTypes = 'Conterner' | 'Modal';

export interface AppDataElementsTypes {
    style: AppDataElementsStyleTypes;
    content: AnyObjectType;
    event: any;
    type: AppDataModuleTypes;
    moduleId: string;
}

export interface AppDataLayoutItemTypes extends AppDataElementsTypes {
    layout: Layout;
}

export interface StyleItemsTypes {
    backgroundCommon?: BackgroundCommonTypesOfStyleItems;
    backgroundGradient?: BackgroundGradientTypesOfStyleItems;
    border?: BorderTypesOfStyleItems;
    boxShadow?: BoxShadowTypesOfStyleItems[];
    textShadow?: TextShadowTypesOfStyleItems;
    font?: FontTypesOfStyleItems;
    display?: DisplayTypesOfStyleItems;
    transform?: TransformTypesOfStyleItems;
}

export interface TransformTypesOfStyleItems {
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
    skewX?: number;
    skewY?: number;
}

export interface FontTypesOfStyleItems {
    fontSize?: number;
    lineHeight?: number;
    color?: string;
    letterSP?: number;
    wordSp?: number;
    weight?: string;
    decoration?: string;
    italic?: string;
    align?: string;
}

export interface TextShadowTypesOfStyleItems {
    shifRight?: number;
    shiftDown?: number;
    blur?: number;
    color?: string;
}

export interface BoxShadowTypesOfStyleItems {
    shifRight?: number;
    shiftDown?: number;
    spread?: number;
    blur?: number;
    inset?: string;
    color?: string;
}

export interface BorderTypesOfStyleItems {
    radius?: number;
    radiusTopLeft?: number;
    radiusTopRight?: number;
    radiusBottomLeft?: number;
    radiusBottomRight?: number;
    borderColor?: string;
    borderPosition?: string;
    borderStyle?: string;
    borderWidth?: number;
}

export interface DisplayTypesOfStyleItems {
    width?: number;
    height?: number;
    zIndex?: number;
    position?: string;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

export interface BackgroundGradientTypesOfStyleItems {
    gradient?: {
        color: string;
        transition: number;
    }[];
    gradientDirections?: string;
}

export interface BackgroundCommonTypesOfStyleItems {}

export interface AppDataElementsStyleTypes {
    basic: StyleItemsTypes;
    [keys: string]: StyleItemsTypes;
}

export type AppDataListTypes = AppDataLayoutItemTypes[];
