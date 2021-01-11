import React from 'react';
import Conterner from './../Conterner';
import { AppDataElementsTypes } from './../../../types/appData';

interface paraments extends AppDataElementsTypes  {
    id: string
}

const Modal: React.FC<paraments> = (props) => {
    return (
        <Conterner {...props} >这是弹窗组件</Conterner>
    )
}

export default Modal
