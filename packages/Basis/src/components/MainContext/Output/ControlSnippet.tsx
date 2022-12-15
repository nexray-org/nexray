import SnippetIcon from '../../icons/SnippetIcon';
import { Button, useClipboard, useToasts, Link } from '@geist-ui/core';
import { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';
import { AiOutlineLink, AiOutlineSetting } from 'react-icons/ai';

export default function ControlSnippet() {
    const { setToast } = useToasts();
    const { copy } = useClipboard();
    const { data, selectedCategoryId, setIsOutputSettingsDialogOpen } = useContext(UiContext);
    const item = data.find((ele) => ele.id === selectedCategoryId)!;

    const copyHandler = () => {
        copy(item.contents);
        setToast({ text: 'Copied log contents' });
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
        <div className='absolute top-3 right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2'>
            <Button icon={<AiOutlineSetting />} width={0.25} px={0} scale={0.8} onClick={() => setIsOutputSettingsDialogOpen(true)} />
            <Button icon={<AiOutlineLink />} width={0.25} px={0} scale={0.8} onClick={permaHandler} />
            <Button icon={<SnippetIcon />} width={0.25} px={0} scale={0.8} onClick={copyHandler} />
        </div>
    );
}
