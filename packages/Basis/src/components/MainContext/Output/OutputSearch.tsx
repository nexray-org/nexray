import { Input, Link, Modal, Button } from '@geist-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import useDebounce from '../../../hooks/useDebounce';
import type { editor, IDisposable } from 'monaco-editor';

interface IOutputSearch {
    monacoEditor: editor.IStandaloneCodeEditor;
}

export default function OutputSearch({ monacoEditor }: IOutputSearch) {
    const [searchVal, setSearchVal] = useState<string>("");
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [totalResults, setTotalResults] = useState<number>();
    const [monacoMatches, setMonacoMatches] = useState<editor.FindMatch[]>([]);
    const debouncedSearch = useDebounce(searchVal, 400);

    // useEffect(() => {
    //     let dispose: IDisposable;
    //     if (monacoEditor) {
    //         // https://blutorange.github.io/primefaces-monaco/typedoc/interfaces/monaco.editor.istandalonecodeeditor.html
    //         dispose = monacoEditor.onDidChangeCursorSelection(e => {
    //             // https://blutorange.github.io/primefaces-monaco/typedoc/enums/monaco.editor.cursorchangereason.html
    //             if (e.reason === 3) {
    //                 setSearchVal("");
    //             }
    //         })
    //     }
    //     return () => {
    //         if (dispose) {
    //             dispose.dispose();
    //         }
    //     };
    // }, [monacoEditor])

    useEffect(() => {
        const resetSearch = () => {
            // monacoEditor && monacoEditor.updateOptions({
            //     selectionHighlight: true,
            // });
            setTotalResults(0);
            setMonacoMatches([]);
        }
        if (debouncedSearch && monacoEditor) {
            const _monacoMatches = monacoEditor.getModel()!.findMatches(debouncedSearch, false, false, false, null, true, undefined);
            if (_monacoMatches.length) {
                monacoEditor.setScrollTop(0);
                monacoEditor.setScrollLeft(0);
                monacoEditor.setSelection(_monacoMatches[0].range);
                monacoEditor.getAction('editor.action.moveSelectionToNextFindMatch').run()
                    .then(() => monacoEditor.getAction('editor.action.moveSelectionToPreviousFindMatch').run());
                setTotalResults(monacoMatches.length);
                _monacoMatches && setMonacoMatches(_monacoMatches);
                monacoEditor.updateOptions({
                    selectionHighlight: false
                });
            } else {
                resetSearch();
            }
        } else {
            resetSearch();
        }
    }, [debouncedSearch])

    // There's two methods to scroll to the part
    // 1 .setSelection followed by manually scrolling to
    // 2 'editor.action.moveSelectionToPreviousFindMatch'-like actions
    // https://github.com/microsoft/monaco-editor/issues/823#issuecomment-470754000


    function goToNextResult() {
        monacoEditor.getAction('editor.action.moveSelectionToNextFindMatch').run();

        // if (selectedIndex < 0 || selectedIndex + 1 > monacoMatches.length) {
        //     return;
        // } else {
        //     // monacoEditor.setSelection(monacoMatches[selectedIndex + 1].range);
        //     monacoEditor.getAction('editor.action.moveSelectionToNextFindMatch').run();
        //     setSelectedIndex(prev => prev + 1);
        // }
    }

    function goToPrevResult() {
        monacoEditor.getAction('editor.action.moveSelectionToPreviousFindMatch').run();

        // if (selectedIndex <= 0 || selectedIndex + 1 > monacoMatches.length) {
        //     return;
        // } else {
        //     // monacoEditor.setSelection(monacoMatches[selectedIndex - 1].range);
        //     monacoEditor.getAction('editor.action.moveSelectionToPreviousFindMatch').run();
        //     setSelectedIndex(prev => prev - 1);
        // }
    }

    return (
        <div className='flex items-center border-t border-t-g-primary-700 focus-within:border-t-g-primary-400 duration-[.2s] transition-all ease-[ease]'>
            <Input
                placeholder='Find on page (text or /regex/)'
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
                            onClick={goToPrevResult}
                        />
                        <Button
                            icon={<BsArrowDownShort className='!w-[16px] !h-[16px]' />}
                            width={"24px"}
                            height="24px"
                            px={0}
                            py={0}
                            onClick={goToNextResult}
                        />
                        <span className='text-xs whitespace-nowrap text-g-primary-200 text-right w-[70px]'>{totalResults} matches</span>
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