import { Layout } from 'react-grid-layout';



export interface elementsTypes {
    style: elementsStyleTypes;
    content: {[keys: string]: any };
    event: any;
    type: string;
}

export interface appDataTypes extends elementsTypes {
    layout: Layout;
}

export interface elementsStyleTypes {
    basic: React.CSSProperties;
    [keys: string]: React.CSSProperties
}

export type appDataListTypes = appDataTypes[];