import { Tabs, Badge, Spinner } from '@geist-ui/core';
import Output from './Output';
import Insights from './Insights';
import { UiContext } from '../../context/UiContext';
import { useContext, useRef, useEffect } from 'react';
import { MainContentProvider, MainContentContext, DiscoveredObject } from '../../context/MainContentContext';
import MainContentSettings from '../../modals/MainContentSettings';
import JsonFilterHelp from '../../modals/JsonFilterHelp';
import Headers from './Headers';
import Requests from './Requests';
import Tree from './Tree';
import MainControls from './MainControls';

function MainContent() {
    const { selectedCategoryId, activeItem, config, itemContentStrings } = useContext(UiContext);
    const { setActiveTab, setDiscoveredObjs, tabsBindings, discoveredObjs, enabledTimelineTypes, selectedContentString, setSelectedRequestsTab } = useContext(MainContentContext);
    const workerRef = useRef<Worker>();

    useEffect(() => {
        setDiscoveredObjs(false);
        setSelectedRequestsTab('table');
        if (activeItem && config.get('parseFindJsonEnabled') && selectedContentString && itemContentStrings) {
            workerRef.current = new Worker(new URL('./Insights/finder.worker.js', import.meta.url));
            workerRef.current.postMessage(itemContentStrings[selectedContentString]);
            workerRef.current.onmessage = (event: MessageEvent<DiscoveredObject[]>) => {
                if (event.data.length > 0) {
                    setDiscoveredObjs(event.data);
                    setActiveTab(prev => prev === "insights" ? "insights" : "output");
                } else {
                    setDiscoveredObjs([]);
                    setActiveTab('output');
                }
            };
        } else {
            setDiscoveredObjs([]);
            setActiveTab('output');
        }
        return () => {
            workerRef.current && workerRef.current.terminate();
        };
    }, [selectedCategoryId, enabledTimelineTypes]);

    return (
        <div className='w-full h-full relative'>
            <MainControls />
            <Tabs {...tabsBindings} hideDivider>
                <Tabs.Item
                    label={
                        <>
                            Requests
                            {activeItem && Object.keys(activeItem.fetches).length > 0 && (
                                <Badge ml={'5px'} scale={0.3}>
                                    {Object.keys(activeItem.fetches).length}
                                </Badge>
                            )}
                        </>
                    }
                    value='requests'
                    disabled={activeItem ? Object.keys(activeItem.fetches).length === 0 : true}
                >
                    <Requests />
                </Tabs.Item>
                <Tabs.Item label='Output' value='output'>
                    <Output />
                </Tabs.Item>
                <Tabs.Item
                    label={
                        <>
                            Insights
                            {discoveredObjs === false && <Spinner scale={0.3} ml={'5px'} />}
                            {discoveredObjs !== false && discoveredObjs.length > 0 && (
                                <Badge ml={'5px'} scale={0.3}>
                                    {discoveredObjs.length}
                                </Badge>
                            )}
                        </>
                    }
                    value='insights'
                    disabled={discoveredObjs === false || discoveredObjs.length === 0}
                >
                    {discoveredObjs !== false && <Insights />}
                </Tabs.Item>
                <Tabs.Item label='Headers' value='headers'>
                    <Headers />
                </Tabs.Item>
                <Tabs.Item label='Tree' value='tree'>
                    <Tree />
                </Tabs.Item>
            </Tabs>
            <MainContentSettings />
            <JsonFilterHelp />
        </div>
    );
}

export default function MainContentWrapper() {
    return (
        <MainContentProvider>
            <MainContent />
        </MainContentProvider>
    );
}
