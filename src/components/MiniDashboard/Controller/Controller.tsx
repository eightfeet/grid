import React from 'react';
import { AllCssType } from 'types/appData';

interface Props {
    data?: AllCssType
    datapath?: string[];
    moduleId?: string;
}

const Controller: React.FC<Props> = ({ data }) => {
    return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Controller;
