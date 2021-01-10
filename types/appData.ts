import { Layout } from 'react-grid-layout';



export interface elementsTypes {
    style: elementsStyleTypes;
    content: {[keys: string]: any };
    event: any;
    type: string;
    moduleId: string;
}

export interface appDataTypes extends elementsTypes {
    layout: Layout;
}

export interface elementsStyleTypes {
    [keys: string]: any
}

export type appDataListTypes = appDataTypes[];