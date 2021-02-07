## react app

### To do list
- [x] <input type="checkbox" checked> 删格布局
- [x] <input type="checkbox" checked> css编译
- [x] <input type="checkbox" checked> display 编辑模块
- [x] <input type="checkbox" checked> font 编辑模块
- [x] <input type="checkbox" > backgroundCommon 编辑模块
- [x] <input type="checkbox" > backgroundGradient 编辑模块
- [x] <input type="checkbox" > border 编辑模块
- [x] <input type="checkbox" > boxShadow 编辑模块
- [x] <input type="checkbox" > textShadow 编辑模块
- [x] <input type="checkbox" > transform 编辑模块
- [x] <input type="checkbox" checked> hooks - useCssPicker
- [x] <input type="checkbox" checked> hooks - useMergeAppData
- [ ] <input type="checkbox" > 组件测试
- [ ] <input type="checkbox" > 事件与统计
- [ ] <input type="checkbox" > Api对接
- [ ] <input type="checkbox" > 修改编辑器相互干扰


```typescript
import React, { Suspense, lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '~/redux/store';
import { AppDataElementsTypes } from './../../types/appData';

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

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
        [keys: string]: any;
    };
}

const Elements: React.FC<ElementsProps & StateProps & DispatchProps> = ({
    layout,
    updateAppData,
    ...props
}) => {
    useEffect(() => {
        updateAppData([
            {
                moduleId: 'c',
                layout: {
                    w: 10,
                    h: 11,
                    x: 1,
                    y: 0,
                    i: 'c',
                    moved: false,
                    static: false,
                },
                style: {
                    basic: {
                        display: {
                            width: 100,
                            height: 100,
                        },
                        backgroundCommon: {
                            backgroundColor: 'yellow',
                        },
                    },
                },
                content: { text: 'c' },
                event: {},
                type: 'Conterner',
            },
        ]);
    }, []);
    const { type } = props;
    const Comp = lazy(() => import(`~/modules/${type}`));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Comp {...props} />
        </Suspense>
    );
};

const mapState = (state: RootState) => ({
    appData: state.appData,
});

const mapDispatch = (dispatch: Dispatch) => ({
    updateAppData: dispatch.appData.updateAppData,
});

export default connect(mapState, mapDispatch)(Elements);

```