import React, { useEffect, useState } from 'react';
import { elementsTypes } from './../../../types/appData';
import styleCompiler from './../../compiler'

interface paraments extends elementsTypes  {
    id: string
}

const Conterner: React.FC<paraments> = ({id, style, children, content}) => {
    const [basicStyle, setBasicStyle] = useState<{[keys: string]: any}>({})

    useEffect(() => {
        const { basic } = style;
        setBasicStyle(styleCompiler(basic));
        console.log(1111)
        if (basic.display.zIndex !== undefined) {
            document.getElementById(`wrap-${id}`)!.style.zIndex = basic.display.zIndex;
        }
    }, [id, style])
    
    return (
        <div id={id} style={basicStyle.style}>
            {children || content.text}
        </div>
    )
}

export default Conterner
