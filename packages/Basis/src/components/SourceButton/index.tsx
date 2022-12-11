import clsx from 'clsx';
import Image from 'next/image';
import { Dot } from '@geist-ui/core';

export interface ISourceButton {
    icon: string;
    title: string;
    isDetected: boolean;
    imgWidthClassName?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SourceButton({ title, icon, isDetected, imgWidthClassName, onClick }: ISourceButton) {
    return (
        <button
            className={clsx(
                'h-[128px] px-4 py-5 w-[240px] ring-1 ring-g-primary-700 rounded-md',
                'transition-all bg-g-primary-900 hover:bg-g-primary-800 cursor-pointer hover:ring-4 hover:ring-indigo-600',
                'outline-none text-left flex flex-col justify-between relative',
            )}
            onClick={onClick}
        >
            <div className={clsx('absolute left-4 top-3 w-1.5 h-1.5 rounded-full', isDetected ? 'bg-green-400' : 'bg-gray-400')} />
            <div className='flex items-center justify-between w-full mt-0.5'>
                <span className='tracking-tight font-bold leading-none'>{title}</span>
                <div className={clsx('flex max-w-[32px] h-[32px] select-none pointer-events-none', imgWidthClassName)}>
                    <Image src={icon} width={'100%'} height={'100%'} className={clsx('select-none pointer-events-none')} />
                </div>
            </div>
            <span className={clsx('text-xs tracking-tight font-semibold leading-snug', isDetected ? 'text-green-400' : 'text-gray-400')}>
                {isDetected ? 'Detected in the current directory {show directory}.' : 'Ready to be configured.'}
            </span>
        </button>
    );
}
