import React from 'react';
import { elementsTypes } from './../../types/appData';

interface ElementsProps extends elementsTypes {
    id: string
}

const Elements: React.FC<ElementsProps> = ({
    id,
    style,
    content,
    event,
    type,
}) => {
    const { basic } = style;
    return <div id={id} style={basic}>{content.text}</div>;
};

export default Elements;
