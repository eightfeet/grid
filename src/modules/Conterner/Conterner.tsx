import React, { useEffect, useState } from 'react';
import { AppDataElementsTypes } from './../../../types/appData';
import styleCompiler from './../../compiler';

interface paraments extends AppDataElementsTypes  {
    id: string
}

const Conterner: React.FC<paraments> = ({id, style, children, content}) => {
    const [basicStyle, setBasicStyle] = useState<{[keys: string]: any}>({})

    useEffect(() => {
        const { basic } = style;
        setBasicStyle(styleCompiler(basic));
        if (basic.display?.zIndex !== undefined) {
            document.getElementById(`wrap-${id}`)!.style.zIndex = `${basic.display.zIndex}`;
        }
    }, [id, style])
    
    return (
        <div id={id} style={basicStyle.style}>
            {children || content.text}
        </div>
    )
}

export default Conterner
