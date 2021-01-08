import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import queryString from 'query-string';
import useLocalStorage from './hooks/useLocalStorage';
import './App.scss';
import Layout from './Layout';
import data from './mockdata/appData';
import styleJson from './mockdata/style.json';
import { Layout as LayoutDataType } from 'react-grid-layout';
import hitChart from './target/hitTarget';

const search = queryString.parse(window.location.search);
const isEditing = search.isEditing === 'true';

const style = Object.keys(styleJson).map((key: any) => {
    const styleObj = (styleJson as any)[key];
    return hitChart(key, styleObj);
}).join(' ');


function App(props: any) {
    const [appData, setAppData] = useState([]);
    const [designModal, setDesignModal] = useState(isEditing);
    const resultData = useRef();
    const styleRef = useRef(null);

    const [localStoreData, setLocalStoreData] = useLocalStorage(
        'appData',
        data
    );

    useMemo(() => {
        setAppData(localStoreData);
    }, [localStoreData]);

    useEffect(() => {
        (styleRef.current as any).setAttribute('style', style);
    }, [appData])

    const onChange = useCallback((data: LayoutDataType[]) => {
        const mergeData = data.map((item, index) => {
            const otherData: LayoutDataType = appData[index];
            const result = {
                ...otherData,
                layout: item,
            };
            return result;
        });
        (resultData.current as any) = mergeData;
        
    }, [appData]);

    return (
        <div className="App" >
            <div ref={styleRef}>
                <br /><br /><br /><br /><br /><div>中文</div><br /><br /><br /><br /><br /><br />
            </div>
            {isEditing ? (
                <>
                    <span>
                        视图模式：{designModal ? '设计模式' : '预览模式'}视图
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => setDesignModal(!designModal)}>
                        {designModal ? '预览模式' : '设计模式'}
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => resultData.current ? setLocalStoreData(resultData.current) : null}>
                        保存
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => {window.localStorage.clear(); window.location.reload()}}>
                        重置
                    </button>
                </>
            ) : null}
            <Layout
                isEditing={isEditing}
                designModal={designModal}
                rowHeight={20}
                cols={12}
                width={window.innerWidth}
                data={appData}
                onChange={onChange}
            />
        </div>
    );
}

export default App;
