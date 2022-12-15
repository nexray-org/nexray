import SnippetIcon from '../../icons/SnippetIcon';
import { Button, useClipboard, useToasts, Link } from '@geist-ui/core';
import { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';
import { AiOutlineLink, AiOutlineSetting } from 'react-icons/ai';
import { MainContentContext } from '../../../context/MainContentContext';

export default function ControlSnippet() {
    const { setIsInsightsSettingsDialogOpen } = useContext(UiContext);
    const { discoveredObjs, selectedDiscoveredIndex } = useContext(MainContentContext);
    const { setToast } = useToasts();
    const { copy } = useClipboard();

    const copyHandler = () => {
        if (discoveredObjs !== false && discoveredObjs[selectedDiscoveredIndex]) {
            copy(JSON.stringify(discoveredObjs[selectedDiscoveredIndex][2], null, 2));
            setToast({ text: 'Copied object contents' });
        }
    };

    const permaHandler = () => {
        setToast({
            text: (
                <span className='text-sm'>
                    Generated and copied shareable permalink: <Link color target={"_blank"}>{'https://asdf.com'}</Link>
                </span>
            ),
        });
    };

    return (
        <div className='absolute top-14 right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2'>
            <Button icon={<AiOutlineSetting />} width={0.25} px={0} scale={0.8} onClick={() => setIsInsightsSettingsDialogOpen(true)} />
            <Button icon={<AiOutlineLink />} width={0.25} px={0} scale={0.8} onClick={permaHandler} />
            <Button disabled={!discoveredObjs || discoveredObjs.length === 0} icon={<SnippetIcon />} width={0.25} px={0} scale={0.8} onClick={copyHandler} />
        </div>
    );
}
