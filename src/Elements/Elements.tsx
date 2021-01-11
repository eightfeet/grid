import React, {
    Suspense,
    lazy,
} from 'react';
import { AppDataElementsTypes } from './../../types/appData';

/**
 * To do list !!!
 * step1: 元件按需加载处理
 * step2: 元件框架与数据结构定义
 * step3: 测试元件
 *
 * @interface ElementsProps
 * @extends {AppDataElementsTypes}
 */
interface ElementsProps extends AppDataElementsTypes {
    id: string;
    layout: {
        [keys: string]:any
    }
}

const Elements: React.FC<ElementsProps> = ({layout, ...props}) => {
    const { type } = props;
    const Comp = lazy(() => import(`./../modules/${type}`));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Comp {...props} />
        </Suspense>
    );
};

export default Elements;
