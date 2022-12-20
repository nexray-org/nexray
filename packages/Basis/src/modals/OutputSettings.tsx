import NumberInput from '../components/NumberInput';
import { Modal, Toggle, Checkbox } from '@geist-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../context/UiContext';
import useIsMounted from '../hooks/useIsMounted';
import useDebounce from '../hooks/useDebounce';
import { MainContentContext } from '../context/MainContentContext';

export default function OutputSettings() {
    const { isOutputSettingsDialogOpen, setIsOutputSettingsDialogOpen, config } = useContext(UiContext);
    const { enabledTimelineTypes, setEnabledTimelineTypes } = useContext(MainContentContext);
    const isMounted = useIsMounted();
    const [fontSizeVal, setFontSizeVal] = useState<number>(config.get('editorFontSize')!);
    const debouncedFontSize = useDebounce(fontSizeVal, 600);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        config.set('editorFontSize', Math.round(debouncedFontSize));
    }, [debouncedFontSize]);

    return (
        <Modal visible={isOutputSettingsDialogOpen} onClose={() => setIsOutputSettingsDialogOpen(false)} width='400px' pt={0}>
            <Modal.Content>
                <span className='font-semibold text-xl'>Settings</span>
                <div className='mt-4'>
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
                        <NumberInput value={fontSizeVal} onChange={setFontSizeVal} fallback={0} className='max-w-[80px]' height={'30px'} />
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
            </Modal.Content>
            <Modal.Action passive onClick={() => setIsOutputSettingsDialogOpen(false)}>
                Close
            </Modal.Action>
        </Modal>
    );
}
