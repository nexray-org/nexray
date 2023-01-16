import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '@geist-ui/core';
import clsx from 'clsx';
import { UiContext } from '../../context/UiContext';
import useDebounce from '../../hooks/useDebounce';
import useIsMounted from '../../hooks/useIsMounted';

const EndAdornment = ({ children }: { children: React.ReactNode }) => (
    <div className='relative'>
        <div className={clsx(
                'group-focus-within:opacity-0 transition-opacity opacity-100 h-[20px] cursor-default',
                // 'absolute left-[-36px] my-auto top-0 bottom-0', OLD POSITIONING
                'mr-[30px]', // New positioning
            )}>
            <div className='flex-center h-[20px]'>
                <p className='text-g-primary-400 whitespace-nowrap text-xs m-0'>{children}</p>
            </div>
        </div>

        {/* <BsFillCaretDownFill className='text-g-primary-300 hover:text-g-primary-200' /> */}
    </div>
);

export default function SearchBar(props: Partial<InputProps>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [os, setOS] = useState<'mac' | 'win'>();
    
    const [localSearchVal, setLocalSearchVal] = useState<string>("");
    const debouncedLocalSearch = useDebounce(localSearchVal, 300);
    const isMounted = useIsMounted();
    
    const { setIsFilterGroupDialogOpen, setDataSearchVal } = useContext(UiContext);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        setDataSearchVal(debouncedLocalSearch);
    }, [debouncedLocalSearch])

    useEffect(() => {
        setOS(navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'mac' : 'win');
    }, []);

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
            {...props}
            value={localSearchVal}
            onChange={e => setLocalSearchVal(e.target.value)}
            className={clsx('[&>div]:!rounded-none [&>div]:!border-x-0 [&>div]:!border-t-0 group !w-full', props.className)}
        />
    );
}
