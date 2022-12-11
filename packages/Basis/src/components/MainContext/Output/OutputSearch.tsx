import { Input, Link, Modal } from '@geist-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

export default function OutputSearch() {
    const [searchVal, setSearchVal] = useState<string>("");
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

    return (
        <div className='flex items-center border-t border-t-g-primary-700 focus-within:border-t-g-primary-400 duration-[.2s] transition-all ease-[ease]'>
            <Input
                placeholder='Find on page (text or /regex/)'
                // iconRight={os ? <EndAdornment>{os === 'mac' ? '⌘' : 'ctrl'} + K</EndAdornment> : <></>}
                // iconClickable
                className={clsx('[&>div]:!rounded-none [&>div]:!border-0 group')}
                width="100%"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
            />
            <div className={clsx('max-w-[100px] pr-4')}>
                {!searchVal ? (
                    <AiFillQuestionCircle
                        className='text-g-primary-400 cursor-pointer hover:text-g-primary-200 transition-colors'
                        onClick={() => setIsHelpModalOpen(true)}
                    />
                ) : (
                    <div></div>
                )}
            </div>
            <Modal visible={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)}>
                <Modal.Title className='!block !text-left'>Find on page</Modal.Title>
                <Modal.Content pt={0.4}>
                    <p className='text-sm inline-block'>
                        This input allows you to search for text in the current log. There are two types of values that can be searched:
                        <ul className='leading-none list-none'>
                            <li>Plain text: <code>TIMEOUT_ERROR</code></li>
                            <li>ECMA regular expression: <code>/^a...s$/g</code></li>
                        </ul>
                        Please note that <Link color>ECMA regex</Link> is the variant that is used in JavaScript.
                    </p>
                </Modal.Content>
            </Modal>
        </div>
    )
}