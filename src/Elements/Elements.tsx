import React from 'react';
import { elementsTypes } from './../../types/appData';

interface ElementsProps extends elementsTypes {
    
}

const Elements: React.FC<ElementsProps> = ({
    style,
    content,
    event,
    type,
    ...other
}) => {
    const { basic } = style;

    return <div style={basic}>{content.text}</div>;
};

export default Elements;
