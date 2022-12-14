import { Input, Link, Modal } from '@geist-ui/core';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { UiContext } from '../../../context/UiContext';
import useDebounce from '../../../hooks/useDebounce';
import { JSONPath } from 'jsonpath-plus';
import useIsMounted from '../../../hooks/useIsMounted';

interface IOutputSearch {
    mode: "json" | "xml" | "html";
    searchingObject: Record<any, any> | any[];
}

// Based on insomnia JSONPath filtering
// https://github.com/Kong/insomnia/blob/4612ef75b12a1f0b67c3ac84d7985c2f9934268d/packages/insomnia/src/ui/components/codemirror/code-editor.tsx#L522
// https://github.com/Kong/insomnia/blob/4612ef75b12a1f0b67c3ac84d7985c2f9934268d/packages/insomnia/src/ui/components/viewers/response-viewer.tsx#L112

export default function OutputSearch({ mode, searchingObject }: IOutputSearch) {
    const { setInsightFilter } = useContext(UiContext);
    const [searchVal, setSearchVal] = useState<string>('');
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const debouncedSearch = useDebounce(searchVal, 300);
    const isMounted = useIsMounted();

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        let prettyFilter = "";
        if (debouncedSearch) {
            try {
                if (mode === "html") {
                    null;
                    // https://github.com/Kong/insomnia/blob/4612ef75b12a1f0b67c3ac84d7985c2f9934268d/packages/insomnia/src/ui/components/codemirror/code-editor.tsx#L194
                } else if (mode === "xml") {
                    null;
                } else if (mode === "json") {
                    prettyFilter = JSON.stringify(
                        JSONPath({ json: searchingObject, path: debouncedSearch.trim() }), null, 2
                    );
                } 
            } catch (error) {
                prettyFilter = "";
            }
        }
        setInsightFilter(prettyFilter);
    }, [debouncedSearch])

    return (
        <div className='flex max-h-[33px] items-center border-t border-t-g-primary-700 focus-within:border-t-g-primary-400 duration-[.2s] transition-all ease-[ease]'>
            <Input
                placeholder={mode === 'json' ? '$.store.books[*].author' : '/store/books/author'}
                className={clsx('[&>div]:!rounded-none [&>div]:!border-0 group text-sm')}
                width='100%'
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
            />
            <div className={clsx('max-w-[250px] pr-2')}>
                <AiFillQuestionCircle
                    className='text-g-primary-400 cursor-pointer hover:text-g-primary-200 transition-colors'
                    onClick={() => setIsHelpModalOpen(true)}
                />
            </div>
            <Modal visible={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)}>
                <Modal.Title className='!block !text-left'>Find on page</Modal.Title>
                <Modal.Content pt={0.4}>
                    <p className='text-sm inline-block'>
                        This input allows you to search for text in the current log. There are two types of values that can be searched:
                        <ul className='leading-none list-none'>
                            <li>
                                Plain text: <code>TIMEOUT_ERROR</code>
                            </li>
                            <li>
                                ECMA regular expression: <code>/^a...s$/g</code>
                            </li>
                        </ul>
                        Please note that <Link color>ECMA regex</Link> is the variant that is used in JavaScript.
                    </p>
                </Modal.Content>
            </Modal>
        </div>
    );
}
