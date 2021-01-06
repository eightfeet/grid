import React from 'react';
import { elementsTypes } from './../../../types/appData';

interface paraments extends elementsTypes  {
    id: string
}

const Conterner: React.FC<paraments> = ({id, style, children}) => {
    const { basic } = style;
    return (
        <div id={id} style={basic}>
            {children}
        </div>
    )
}

export default Conterner
