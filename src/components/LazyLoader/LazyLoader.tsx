import React, {
    Suspense,
    lazy,
} from 'react';
import { AnyObjectType } from 'types/appData';

interface Props extends AnyObjectType {
    path: string
}

const LazyLoader: React.FC<Props> = ({path, ...other}) => {
    const Comp = lazy(() => import(`~/${path}`));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Comp {...other} />
        </Suspense>
    );
};

export default LazyLoader;
