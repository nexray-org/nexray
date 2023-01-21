import clsx from "clsx";
import { Button } from '@geist-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import KeyValue from './KeyValue';
import React from "react";

interface ISideMenu {
    itemProps: Parameters<typeof KeyValue>[0]['itemProps'];
    onClose(): any;
    title: React.ReactNode;
}

export default function SideMenu({ itemProps, onClose, title }: ISideMenu) {
    return (
        <div className={clsx('flex basis-1/2 border-l border-l-g-primary-700 py-2')}>
            <div className='w-full'>
                <div className='border-b border-b-g-primary-700 px-4 pt-2'>
                    <div className='flex justify-between'>
                        {title}
                        <Button icon={<AiOutlineClose />} width={0.25} px={0} scale={1} onClick={onClose} />
                    </div>
                </div>
                <KeyValue itemProps={itemProps} />
            </div>
        </div>
    )
}