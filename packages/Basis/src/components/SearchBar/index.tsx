import React, { useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '@geist-ui/core';
import { BsFillCaretDownFill } from 'react-icons/bs';
import clsx from 'clsx';

const EndAdornment = ({ children }: { children: React.ReactNode }) => (
    <div className='relative'>
        <div className='group-focus-within:opacity-0 transition-opacity opacity-100 absolute h-[20px] left-[-36px] my-auto top-0 bottom-0 cursor-default'>
            <div className='flex-center h-[20px]'>
                <p className='text-g-primary-400 whitespace-nowrap text-xs m-0'>{children}</p>
            </div>
        </div>

        <BsFillCaretDownFill className='text-g-primary-300' />
    </div>
);

export default function SearchBar(props: Partial<InputProps>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [os, setOS] = useState<'mac' | 'win'>(() => (navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'mac' : 'win'));

    useEffect(() => {
        const searchKeys = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', searchKeys);
        return () => {
            document.removeEventListener('keydown', searchKeys);
        };
    }, []);

    return (
        <Input
            ref={inputRef}
            placeholder='Search'
            iconRight={os ? <EndAdornment>{os === 'mac' ? '⌘' : 'ctrl'} + K</EndAdornment> : <></>}
            iconClickable
            {...props}
            className={clsx('[&>div]:!rounded-none [&>div]:!border-x-0 [&>div]:!border-t-0 group !w-full', props.className)}
        />
    );
}
