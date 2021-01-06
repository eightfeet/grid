import React from 'react';
import Conterner from './../Conterner';
import { elementsTypes } from './../../../types/appData';

interface paraments extends elementsTypes  {
    id: string
}

const Modal: React.FC<paraments> = (props) => {
    return (
        <Conterner {...props} >这是弹窗组件</Conterner>
    )
}

export default Modal
