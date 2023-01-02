import NumberInput from '../components/NumberInput';
import { Modal, Toggle, Checkbox, Tabs } from '@geist-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../context/UiContext';
import useIsMounted from '../hooks/useIsMounted';
import useDebounce from '../hooks/useDebounce';
import { MainContentContext } from '../context/MainContentContext';

export default function MainContentSettings() {
    const { isMainContentSettingsDialogOpen, setIsMainContentSettingsDialogOpen, config } = useContext(UiContext);
    const { enabledTimelineTypes, setEnabledTimelineTypes } = useContext(MainContentContext);
    const isMounted = useIsMounted();

    const [editorFontSizeVal, setEditorFontSizeVal] = useState<number>(config.get('editorFontSize')!);
    const debouncedEditorFontSize = useDebounce(editorFontSizeVal, 600);

    useEffect(() => {
        if (!isMounted) {
            return;
        }
        config.set('editorFontSize', Math.round(debouncedEditorFontSize));
    }, [debouncedEditorFontSize]);

    const [insightFontSizeVal, setInsightFontSizeVal] = useState<number>(config.get('editorFontSize')!);
    const debouncedInsightFontSize = useDebounce(insightFontSizeVal, 600);

    useEffect(() => {
        if (!isMounted) {
            return;
        }
        config.set('insightsFontSize', Math.round(debouncedInsightFontSize));
    }, [debouncedInsightFontSize]);

    const rootTabClassName = "mt-0 px-4"

    return (
        <Modal visible={isMainContentSettingsDialogOpen} onClose={() => setIsMainContentSettingsDialogOpen(false)} width='400px' pt={0}>
            <Modal.Content className='!px-0 !pt-0'>
                <Tabs initialValue="1">
                    <Tabs.Item label="Log Viewer" value="1">
                        <div className={rootTabClassName}>
                            <div className='mb-5'>
                                <span className='text-sm'>Enabled output categories</span>
                                <div className='items-center flex ml-4 mt-2 space-x-3'>
                                    <Checkbox
                                        checked={enabledTimelineTypes['event']}
                                        onChange={e => setEnabledTimelineTypes(prev => ({ ...prev, event: e.target.checked }))}
                                        scale={0.75}
                                        type="success"
                                    >
                                        Events
                                    </Checkbox>
                                    <Checkbox
                                        checked={enabledTimelineTypes['log']}
                                        onChange={e => setEnabledTimelineTypes(prev => ({ ...prev, log: e.target.checked }))}
                                        scale={0.75}
                                        type="success"
                                    >
                                        Logs
                                    </Checkbox>
                                </div>
                            </div>
                            <div className='items-center flex mb-5'>
                                <Toggle
                                    checked={config.get('editorWordWrapEnabled')}
                                    onChange={(e) => config.set('editorWordWrapEnabled', !config.get('editorWordWrapEnabled'))}
                                />
                                <span className='text-sm ml-2.5 -mb-1.5'>Wrap lines</span>
                            </div>
                            <div className='items-center flex mb-5'>
                                <Toggle
                                    checked={config.get('editorMinimapEnabled')}
                                    onChange={(e) => config.set('editorMinimapEnabled', !config.get('editorMinimapEnabled'))}
                                />
                                <span className='text-sm ml-2.5 -mb-1.5'>Minimap enabled</span>
                            </div>
                            <div className='items-center flex mb-5'>
                                <NumberInput value={editorFontSizeVal} onChange={setEditorFontSizeVal} fallback={0} className='max-w-[80px]' height={'30px'} />
                                <span className='text-sm ml-2.5'>Font size</span>
                            </div>
                            <div className='items-center flex'>
                                <Toggle
                                    checked={config.get('parseFindJsonEnabled')}
                                    onChange={(e) => config.set('parseFindJsonEnabled', !config.get('parseFindJsonEnabled'))}
                                />
                                <span className='text-sm ml-2.5 -mb-1.5'>Detect JSON in logs</span>
                            </div>
                        </div>
                    </Tabs.Item>
                    <Tabs.Item label="Insight Viewer" value="2">
                        <div className={rootTabClassName}>
                            <div className='items-center flex mb-5'>
                                <Toggle
                                    checked={config.get('insightsWordWrapEnabled')}
                                    onChange={(e) => config.set('insightsWordWrapEnabled', !config.get('insightsWordWrapEnabled'))}
                                />
                                <span className='text-sm ml-2.5 -mb-1.5'>Wrap lines</span>
                            </div>
                            <div className='items-center flex mb-5'>
                                <NumberInput value={insightFontSizeVal} onChange={setInsightFontSizeVal} fallback={0} className='max-w-[80px]' height={'30px'} />
                                <span className='text-sm ml-2.5'>Font size</span>
                            </div>
                            <div className='items-center flex '>
                                <Toggle
                                    checked={config.get('insightsIndexesEnabled')}
                                    onChange={(e) => config.set('insightsIndexesEnabled', !config.get('insightsIndexesEnabled'))}
                                />
                                <span className='text-sm ml-2.5 -mb-1.5'>Show position indexes</span>
                            </div>
                        </div>
                    </Tabs.Item>
                </Tabs>

            </Modal.Content>
            <Modal.Action passive onClick={() => setIsMainContentSettingsDialogOpen(false)}>
                Close
            </Modal.Action>
        </Modal>
    );
}
