import React from 'react';
import Conterner from './../Conterner';
import { AppDataElementsTypes } from './../../../types/appData';
import styleCompiler from "./../../compiler";

interface paraments extends AppDataElementsTypes  {
    id: string
}

const Modal: React.FC<paraments> = (props) => {
    const { style } = props;
    console.log('props', props)
    return (
        <Conterner {...props} >
            内容
            <div style={(styleCompiler(style.button)).style}>按钮</div>
        </Conterner>
    )
}

export default Modal
