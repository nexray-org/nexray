import { Input, Link, Modal, Button } from '@geist-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import useDebounce from '../../../hooks/useDebounce';

function parseRegex(str: string): RegExp | undefined {
    // Main regex
    const mainMatch = str.match(/\/(.+)\/.*/);
    if (!mainMatch || !mainMatch[1]) {
        return;
    }
    const main = mainMatch[1];

    // Regex options
    const optionsMatch = str.match(/\/.+\/(.*)/);
    if (!optionsMatch || !optionsMatch[1]) {
        return new RegExp(main, 'g');
    }
    const options = optionsMatch[1];

    // Compiled regex
    return new RegExp(main, options.includes("g") ? options : options + 'g');
}

interface IOutputSearch {
    preRef: React.RefObject<HTMLPreElement>;
}

export default function OutputSearch({ preRef }: IOutputSearch) {
    const [searchVal, setSearchVal] = useState<string>("");
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [totalResults, setTotalResults] = useState<number>();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const debouncedSearch = useDebounce(searchVal, 400);

    useEffect(() => {
        console.log(preRef.current)
        if (debouncedSearch && preRef.current) {
            let searchRegex: RegExp;
            if (debouncedSearch.startsWith("/") && debouncedSearch.indexOf("/", 2) !== -1) {
                // Looks like regex
                const parsedRegex = parseRegex(debouncedSearch)
                if (parsedRegex) {
                    searchRegex = parsedRegex
                } else {
                    searchRegex = new RegExp(debouncedSearch, 'g')
                }
            } else {
                searchRegex = new RegExp(debouncedSearch, 'g')
            }

            // Should use textContent or strip HTML with https://codsen.com/os/string-strip-html
            const source = preRef.current.textContent!;
            const matches = source.matchAll(searchRegex);
            let nMatches = 0;
            for (const match of matches) {
                nMatches++;
                console.log(`Found ${match[0]} start=${match.index} end=${match.index! + match[0].length}.`,);
            }
            setTotalResults(nMatches);
        } else {
            setTotalResults(0);
            setSelectedIndex(0);
        }
    }, [debouncedSearch])

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
            <div className={clsx('max-w-[250px] pr-4')}>
                {!searchVal ? (
                    <AiFillQuestionCircle
                        className='text-g-primary-400 cursor-pointer hover:text-g-primary-200 transition-colors'
                        onClick={() => setIsHelpModalOpen(true)}
                    />
                ) : (
                    <div className='flex items-center space-x-2'>
                        <Button
                            icon={<BsArrowUpShort className='!w-[16px] !h-[16px]' />}
                            width={"24px"}
                            height="24px"
                            px={0}
                            py={0}
                            onClick={() => setSelectedIndex(prev => prev + 1)}
                        />
                        <Button
                            icon={<BsArrowDownShort className='!w-[16px] !h-[16px]' />}
                            width={"24px"}
                            height="24px"
                            px={0}
                            py={0}
                            onClick={() => setSelectedIndex(prev => prev - 1)}
                        />
                        <span className='text-xs whitespace-nowrap text-g-primary-200 text-right w-[40px]'>{selectedIndex + 1} of {totalResults}</span>
                    </div>
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