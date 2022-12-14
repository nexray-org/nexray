import { Tabs, useTabs, Loading, Badge, Spinner } from '@geist-ui/core';
import Output from './Output';
import Insights from './Insights';
import useAsyncEffect from "use-async-effect";
import { UiContext } from "../../context/UiContext"
import jsonFinder from '../../utils/jsonFinder';
import { useContext, useState } from 'react';

export default function MainContent() {
    const { bindings, setState } = useTabs('output');
    const { selectedCategoryId, activeItem, config } = useContext(UiContext);
    const [discoveredObjs, setDiscoveredObjs] = useState<([number, number, Record<any, any> | any[]][]) | false>(false);

    useAsyncEffect(async isActive => {
        setDiscoveredObjs(false);
        if (activeItem && config.get('parseFindJsonEnabled')) {
            try {
                const _discoveredObjs = await jsonFinder(activeItem.contents, config.get('parseCustomFindJsonRoute'));
                if (!isActive() || !_discoveredObjs) {
                    return;
                }

                if (_discoveredObjs.length > 0) {
                    setDiscoveredObjs(_discoveredObjs);
                } else {
                    throw new Error('No JSON objects found');
                }
            } catch (error) {
                console.error(error);
                setDiscoveredObjs([]);
                setState('output');
            }
        } else {
            setDiscoveredObjs([]);
            setState('output');
        }
    }, [selectedCategoryId])

    return (
        <div className='w-full h-full'>
            <Tabs {...bindings} hideDivider>
                <Tabs.Item label='Output' value='output'>
                    <Output />
                </Tabs.Item>
                <Tabs.Item 
                    label={<>
                        Insights
                        {discoveredObjs === false && <Spinner scale={0.3} ml={"5px"} />}
                        {(discoveredObjs !== false && discoveredObjs.length > 0) && <Badge ml={"5px"} scale={0.3}>{discoveredObjs.length}</Badge>}
                    </>} 
                    value='insights' 
                    disabled={discoveredObjs === false || discoveredObjs.length === 0}
                >
                    {discoveredObjs !== false && <Insights discoveredObjs={discoveredObjs} onBack={() => setState("output")} />}
                </Tabs.Item>
            </Tabs>
        </div>
    );
}
