import SnippetIcon from '../icons/SnippetIcon';
import { Button, useClipboard, useToasts, Link } from '@geist-ui/core';
import { AiOutlineLink, AiOutlineSetting } from 'react-icons/ai';
import clsx from 'clsx';

interface IControlSnippet {
    copyText: string;
    onSettingClick(): void;
    className?: string;
}

export default function ControlSnippet({ copyText, onSettingClick, className }: IControlSnippet) {
    const { setToast } = useToasts();
    const { copy } = useClipboard();

    const copyHandler = () => {
        if (copyText) {
            copy(copyText);
            setToast({ text: 'Successfully copied contents' });
        }
    };

    const permaHandler = () => {
        // TODO
        setToast({
            text: (
                <span className='text-sm'>
                    Generated and copied shareable permalink:{' '}
                    <Link color target={'_blank'}>
                        {'https://asdf.com'}
                    </Link>
                </span>
            ),
        });
    };

    return (
        <div className={clsx(
            'absolute right-6 opacity-0 transition-opacity group-hover:opacity-100 z-20 flex space-x-2',
            className
        )}>
            <Button icon={<AiOutlineSetting />} width={0.25} px={0} scale={0.8} onClick={onSettingClick} />
            <Button icon={<AiOutlineLink />} width={0.25} px={0} scale={0.8} onClick={permaHandler} />
            <Button disabled={!copyText} icon={<SnippetIcon />} width={0.25} px={0} scale={0.8} onClick={copyHandler} />
        </div>
    );
}
