import React from 'react';
import classNames from 'classnames';
import s from './Elements.module.scss';

interface ElementsProps {
    style: { [keys: string]: any };
    content: { [keys: string]: any };
    event: { [keys: string]: any };
    type: string;
}

const Elements: React.FC<ElementsProps> = ({
    style,
    content,
    event,
    type,
    ...other
}) => {
    console.log(other);
    return <div>{content.text}</div>;
};

export default Elements;
