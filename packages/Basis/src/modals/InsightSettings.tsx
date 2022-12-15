import NumberInput from '../components/NumberInput';
import { Modal, Toggle } from '@geist-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../context/UiContext';
import useIsMounted from '../hooks/useIsMounted';
import useDebounce from '../hooks/useDebounce';

export default function InsightSettings() {
    const { isInsightsSettingsDialogOpen, setIsInsightsSettingsDialogOpen, config } = useContext(UiContext);
    const isMounted = useIsMounted();
    const [fontSizeVal, setFontSizeVal] = useState<number>(config.get('insightsFontSize')!);
    const debouncedFontSize = useDebounce(fontSizeVal, 600);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        config.set('insightsFontSize', Math.round(debouncedFontSize));
    }, [debouncedFontSize]);

    return (
        <Modal visible={isInsightsSettingsDialogOpen} onClose={() => setIsInsightsSettingsDialogOpen(false)} width='400px' pt={0}>
            <Modal.Content>
                <span className='font-semibold text-xl'>Settings</span>
                <div className='mt-4'>
                    <div className='items-center flex mb-5'>
                        <Toggle
                            checked={config.get('insightsWordWrapEnabled')}
                            onChange={(e) => config.set('insightsWordWrapEnabled', !config.get('insightsWordWrapEnabled'))}
                        />
                        <span className='text-sm ml-2.5 -mb-1.5'>Wrap lines</span>
                    </div>
                    <div className='items-center flex mb-5'>
                        <NumberInput value={fontSizeVal} onChange={setFontSizeVal} fallback={0} className='max-w-[80px]' height={'30px'} />
                        <span className='text-sm ml-2.5'>Font Size</span>
                    </div>
                    <div className='items-center flex mb-5'>
                        <Toggle
                            checked={config.get('insightsIndexesEnabled')}
                            onChange={(e) => config.set('insightsIndexesEnabled', !config.get('insightsIndexesEnabled'))}
                        />
                        <span className='text-sm ml-2.5 -mb-1.5'>Show position indexes</span>
                    </div>
                </div>
            </Modal.Content>
            <Modal.Action passive onClick={() => setIsInsightsSettingsDialogOpen(false)}>
                Close
            </Modal.Action>
        </Modal>
    );
}
