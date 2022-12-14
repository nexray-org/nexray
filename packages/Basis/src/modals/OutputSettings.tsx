import NumberInput from '../components/NumberInput';
import { Link, Modal, Toggle } from '@geist-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../context/UiContext';
import useIsMounted from '../hooks/useIsMounted';
import useDebounce from '../hooks/useDebounce';

export default function OutputSettings() {
    const { isOutputSettingsDialogOpen, setIsOutputSettingsDialogOpen, config } = useContext(UiContext);
    const isMounted = useIsMounted();
    const [fontSizeVal, setFontSizeVal] = useState<number>(config.get('editorFontSize')!);
    const debouncedFontSize = useDebounce(fontSizeVal, 600)

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        config.set('editorFontSize', Math.round(debouncedFontSize))
    }, [debouncedFontSize])

    return (
        <Modal
            visible={isOutputSettingsDialogOpen}
            onClose={() => setIsOutputSettingsDialogOpen(false)}
            width="400px"
            pt={0}
        >
            <Modal.Content>
                <span className='font-semibold text-xl'>Settings</span>
                <div className='mt-4'>
                    <div className='items-center flex mb-5'>
                        <Toggle checked={config.get('editorWordWrapEnabled')} onChange={e => config.set('editorWordWrapEnabled', !config.get('editorWordWrapEnabled'))} />
                        <span className='text-sm ml-2.5 -mb-1.5'>Wrap lines</span>
                    </div>
                    <div className='items-center flex mb-5'>
                        <Toggle checked={config.get('editorMinimapEnabled')} onChange={e => config.set('editorMinimapEnabled', !config.get('editorMinimapEnabled'))} />
                        <span className='text-sm ml-2.5 -mb-1.5'>Minimap Enabled</span>
                    </div>
                    <div className='items-center flex mb-5'>
                        <NumberInput
                            value={fontSizeVal}
                            onChange={setFontSizeVal}
                            fallback={0}
                            className="max-w-[80px]"
                            height={"30px"}
                        />
                        <span className='text-sm ml-2.5'>Font Size</span>
                    </div>
                    <div className='relative'>
                        <div className='items-center flex'>
                            <Toggle checked={config.get('parseFindJsonEnabled')} onChange={e => config.set('parseFindJsonEnabled', !config.get('parseFindJsonEnabled'))} />
                            <span className='text-sm ml-2.5 -mb-1.5'>Detect JSON in logs</span>
                        </div>
                        <span className='text-[10px] text-gray-500 inline-block mt-4'>
                            By default, this functionality uses a hosted Shuttle API. No data
                            is logged and <Link target={"_blank"} color href="https://github.com/dilan-dio4/basis/tree/main/etc/json-finder">the source can be seen here</Link>.
                            You can self-host that endpoint with the <span className='underline'>parseCustomFindJsonRoute</span> attribute in your configuration file.
                        </span>
                    </div>
                </div>
            </Modal.Content>
            <Modal.Action passive onClick={() => setIsOutputSettingsDialogOpen(false)}>Close</Modal.Action>
        </Modal>
    )
}