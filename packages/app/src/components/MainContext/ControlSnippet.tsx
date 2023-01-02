import SnippetIcon from '../icons/SnippetIcon';
import { Button, useClipboard, useToasts } from '@geist-ui/core';
import clsx from 'clsx';

interface IControlSnippet {
    copyText: string;
    className?: string;
    top: number;
}

export default function ControlSnippet({ copyText, className, top }: IControlSnippet) {
    const { setToast } = useToasts();
    const { copy } = useClipboard();

    const copyHandler = () => {
        if (copyText) {
            copy(copyText);
            setToast({ text: 'Successfully copied contents' });
        }
    };

    return (
        <div
            className={clsx(
                'absolute right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2',
                className
            )}
            style={{ top }}
        >
            <Button disabled={!copyText} icon={<SnippetIcon />} width={0.25} px={0} scale={0.8} onClick={copyHandler} />
        </div>
    );
}
