import { Tabs, Badge, Spinner } from '@geist-ui/core';
import Output from './Output';
import Insights from './Insights';
import { UiContext } from '../../context/UiContext';
import { useContext, useRef, useEffect } from 'react';
import { MainContentProvider, MainContentContext, DiscoveredObject } from '../../context/MainContentContext';
import OutputSettings from '../../modals/OutputSettings';
import InsightSettings from '../../modals/InsightSettings';
import JsonFilterHelp from '../../modals/JsonFilterHelp';
import Headers from './Headers';

function MainContent() {
    const { selectedCategoryId, activeItem, config, itemContentStrings } = useContext(UiContext);
    const { setActiveTab, setDiscoveredObjs, tabsBindings, discoveredObjs, enabledTimelineTypes, selectedContentString } = useContext(MainContentContext);
    const workerRef = useRef<Worker>();

    useEffect(() => {
        setDiscoveredObjs(false);
        if (
            activeItem &&
            config.get('parseFindJsonEnabled') &&
            selectedContentString &&
            itemContentStrings
        ) {
            workerRef.current = new Worker(new URL('./Insights/finder.worker.ts', import.meta.url));
            workerRef.current.postMessage(itemContentStrings[selectedContentString]);
            workerRef.current.onmessage = (event: MessageEvent<DiscoveredObject[]>) => {
                if (event.data.length > 0) {
                    setDiscoveredObjs(event.data);
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
        <div className='w-full h-full'>
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
            </Tabs>
            <OutputSettings />
            <InsightSettings />
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
