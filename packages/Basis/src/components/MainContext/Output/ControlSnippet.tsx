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
    const [t, setT] = useState<number>(21354.2);
    const debouncedFontSize = useDebounce(fontSizeVal, 200)

    useEffect(() => {
        console.log("t", t)
    }, [t])

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        config.set('editorFontSize', +debouncedFontSize)
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
        <div className='absolute top-1 right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2'>
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
                    <span className='font-semibold'>Settings</span>
                    <div className='grid grid-cols-2 gap-4 mt-6'>
                        <div className='items-center flex'>
                            <Toggle checked={config.get('editorMinimapEnabled')} onChange={e => config.set('editorMinimapEnabled', !config.get('editorMinimapEnabled'))} />
                            <span className='text-xs ml-2.5 -mb-1.5'>Minimap Enabled</span>
                        </div>
                        <div className='items-center flex'>
                            <NumberInput
                                value={t}
                                onChange={setT}
                                fallback={0}
                            />
                            <span className='text-xs ml-2.5 -mb-1.5'>Wrap lines</span>
                        </div>
                        <div className='items-center flex'>
                            <Toggle checked={config.get('editorWordWrapEnabled')} onChange={e => config.set('editorWordWrapEnabled', !config.get('editorWordWrapEnabled'))} />
                            <span className='text-xs ml-2.5 -mb-1.5'>Wrap lines</span>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Action passive onClick={() => setIsSettingsDialogOpen(false)}>Close</Modal.Action>
            </Modal>
        </div>
    );
}
