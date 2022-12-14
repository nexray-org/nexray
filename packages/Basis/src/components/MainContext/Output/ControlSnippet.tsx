import SnippetIcon from '../../icons/SnippetIcon';
import { Button, useClipboard, useToasts, Link, Modal, Toggle, Input } from '@geist-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../../context/UiContext';
import { AiOutlineLink, AiOutlineSetting } from 'react-icons/ai';
import useDebounce from '../../../hooks/useDebounce';
import useIsMounted from '../../../hooks/useIsMounted';
import NumberInput from '../../NumberInput';

export default function ControlSnippet() {
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState<boolean>(false);
    const { setToast } = useToasts();
    const { copy } = useClipboard();
    const { data, selectedCategoryId, config } = useContext(UiContext);
    const item = data.find((ele) => ele.id === selectedCategoryId)!;
    const isMounted = useIsMounted();

    const [fontSizeVal, setFontSizeVal] = useState<number>(config.get('editorFontSize')!);
    const debouncedFontSize = useDebounce(fontSizeVal, 600)

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        config.set('editorFontSize', Math.round(debouncedFontSize))
    }, [debouncedFontSize])

    const copyHandler = () => {
        copy(item.contents);
        setToast({ text: 'Copied log contents' });
    };

    const permaHandler = () => {
        setToast({
            text: (
                <span className='text-sm'>
                    Generated and copied shareable permalink: <Link color>{'https://asdf.com'}</Link>
                </span>
            ),
        });
    };


    return (
        <div className='absolute top-3 right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2'>
            <Button icon={<AiOutlineSetting />} width={0.25} px={0} scale={0.8} onClick={() => setIsSettingsDialogOpen(true)} />
            <Button icon={<AiOutlineLink />} width={0.25} px={0} scale={0.8} onClick={permaHandler} />
            <Button icon={<SnippetIcon />} width={0.25} px={0} scale={0.8} onClick={copyHandler} />
            <Modal
                visible={isSettingsDialogOpen}
                onClose={() => setIsSettingsDialogOpen(false)}
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
                <Modal.Action passive onClick={() => setIsSettingsDialogOpen(false)}>Close</Modal.Action>
            </Modal>
        </div>
    );
}
