import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import queryString from 'query-string';
import useLocalStorage from './hooks/useLocalStorage';
import './App.scss';
import Layout from './Layout';
import data from './mockdata/appData';
// import styleJson from './mockdata/style.json';
import { Layout as LayoutDataType } from 'react-grid-layout';
import MiniDashboard from './component/MiniDashboard';
const search = queryString.parse(window.location.search);
const isEditing = search.isEditing === 'true';
const activeData = {current: ''};

export const ActiveModuleContext = React.createContext('');


function App(props: any) {
    const [appData, setAppData] = useState([]);
    const [designModal, setDesignModal] = useState(isEditing);
    const [activeLayout, setActiveLayout] = useState('');
    const resultData = useRef();

    const [localStoreData, setLocalStoreData] = useLocalStorage(
        'appData',
        data
    );

    useMemo(() => {
        setAppData(localStoreData);
    }, [localStoreData]);

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

    const onClick = useCallback(
        (data) => {
            if (!isEditing) return;
            setActiveLayout(data.moduleId)
        },
        [],
    )

    return (
        <ActiveModuleContext.Provider value={activeLayout}>
            <div className="App" >
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
                    onClick={onClick}
                    onChange={onChange}
                />
                {true ? <MiniDashboard appData={appData}/> : null}
            </div>
        </ActiveModuleContext.Provider>
    );
}

export default App;
