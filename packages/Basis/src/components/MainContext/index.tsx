import { Tabs, Badge, Spinner } from '@geist-ui/core';
import Output from './Output';
import Insights from './Insights';
import useAsyncEffect from 'use-async-effect';
import { UiContext } from '../../context/UiContext';
import jsonFinder from '../../utils/jsonFinder';
import { useContext, useRef, useEffect } from 'react';
import { MainContentProvider, MainContentContext, DiscoveredObject } from '../../context/MainContentContext';

function MainContent() {
    const { selectedCategoryId, activeItem, config } = useContext(UiContext);
    const { setActiveTab, setDiscoveredObjs, tabsBindings, discoveredObjs } = useContext(MainContentContext);
    const workerRef = useRef<Worker>();

    useEffect(() => {
        setDiscoveredObjs(false);
        if (activeItem && config.get('parseFindJsonEnabled')) {
            workerRef.current = new Worker(new URL('./Insights/finder.worker.ts', import.meta.url))
            workerRef.current.postMessage(activeItem.contents);
            workerRef.current.onmessage = (event: MessageEvent<DiscoveredObject[]>) => {
                if (event.data.length > 0) {
                    setDiscoveredObjs(event.data);
                } else {
                    setDiscoveredObjs([]);
                    setActiveTab('output');
                }
            }
        } else {
            setDiscoveredObjs([]);
            setActiveTab('output');
        }
        return () => {
            workerRef.current && workerRef.current.terminate();
          }
    }, [selectedCategoryId]);

    // useAsyncEffect(
    //     async (isActive) => {
    //         setDiscoveredObjs(false);
    //         if (activeItem && config.get('parseFindJsonEnabled')) {
    //             try {
    //                 const _discoveredObjs = await jsonFinder(activeItem.contents, config.get('parseCustomFindJsonRoute'));
    //                 if (!isActive() || !_discoveredObjs) {
    //                     return;
    //                 }

    //                 if (_discoveredObjs.length > 0) {
    //                     setDiscoveredObjs(_discoveredObjs);
    //                 } else {
    //                     throw new Error('No JSON objects found');
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //                 setDiscoveredObjs([]);
    //                 setActiveTab('output');
    //             }
    //         } else {
    //             setDiscoveredObjs([]);
    //             setActiveTab('output');
    //         }
    //     },
    //     [selectedCategoryId],
    // );

    return (
        <div className='w-full h-full'>
            <Tabs {...tabsBindings} hideDivider>
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
                    {discoveredObjs !== false && <Insights discoveredObjs={discoveredObjs} onBack={() => setActiveTab('output')} />}
                </Tabs.Item>
            </Tabs>
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
