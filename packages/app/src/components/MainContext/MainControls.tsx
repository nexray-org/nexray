import { Button, useToasts, Link } from '@geist-ui/core';
import { AiOutlineLink, AiOutlineSetting } from 'react-icons/ai';
import clsx from 'clsx';
import { useContext } from 'react';
import { UiContext } from '../../context/UiContext';

export default function MainControls() {
    const { setToast } = useToasts();
    const { setIsMainContentSettingsDialogOpen } = useContext(UiContext);

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
        <div className={clsx('absolute right-3 top-0 z-20 space-x-1 max-h-[46px] h-full flex-center overflow-hidden')}>
            <Button icon={<AiOutlineSetting />} width={0.25} px={0} scale={0.4} onClick={() => setIsMainContentSettingsDialogOpen(true)} />
            {/* <Button icon={<AiOutlineLink />} width={0.25} px={0} scale={0.4} onClick={permaHandler} /> */}
        </div>
    );
}
