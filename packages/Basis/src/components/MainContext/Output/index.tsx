import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from './ControlSnippet';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import type { editor, IDisposable } from 'monaco-editor';
import { Loading } from '@geist-ui/core';
import logLanguage from './logLanguage';

export default function Output() {
    const { data, selectedCategoryId, config } = useContext(UiContext);
    const item = data.find((ele) => ele.id === selectedCategoryId)!;
    const [monacoEditor, setMonacoEditor] = useState<editor.IStandaloneCodeEditor>();

    useEffect(() => {
        // This effect disables the escape key from closing the find bar
        let dispose: IDisposable = {
            dispose: () => {
                null;
            },
        };

        if (monacoEditor) {
            // https://blutorange.github.io/primefaces-monaco/typedoc/interfaces/monaco.editor.istandalonecodeeditor.html
            dispose = monacoEditor.onKeyDown((e) => {
                // https://blutorange.github.io/primefaces-monaco/typedoc/enums/monaco.editor.cursorchangereason.html
                if (e.code === 'Escape') {
                    e.stopPropagation();
                    e.preventDefault();
                }
            });

            // Disable command palette
            monacoEditor.addCommand(59 /* KeyCode.F1 */, () => {
                null;
            });
        }

        return () => {
            dispose.dispose();
        };
    }, [monacoEditor]);

    function focusFindAndClear(_editor: editor.IStandaloneCodeEditor) {
        // https://github.com/microsoft/monaco-editor/issues/2355#issuecomment-791461752
        // https://stackoverflow.com/a/46012210
        _editor.focus();
        _editor.getAction('actions.find').run();
        if (document) {
            const findRawInput = document.querySelector(".monaco-editor .find-widget>.find-part .monaco-inputbox>.ibwrapper>textarea.input");
            if (findRawInput) {
                const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
                if (nativeTextAreaValueSetter) {
                    nativeTextAreaValueSetter.call(findRawInput, "");
                    findRawInput.dispatchEvent(new Event("input", { bubbles: true }));
                }
            }
        }
    }

    useEffect(() => {
        // focus find bar and delete contents
        if (monacoEditor) {
            focusFindAndClear(monacoEditor)
        } else {
            // Otherwise, just do this 
        }
    }, [selectedCategoryId])

    useEffect(() => {
        // This effect disables the escape key for the find text box
        const findTextAreaEle: HTMLTextAreaElement | null = document.querySelector(
            '.monaco-editor .find-widget>.find-part .monaco-inputbox>.ibwrapper>textarea.input ',
        );

        const eventHandler = (ev: KeyboardEvent) => {
            const escCharCode = ev.charCode || ev.keyCode || ev.which;
            if (ev.key === 'Escape' || escCharCode === 27) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        };

        if (findTextAreaEle) {
            findTextAreaEle.addEventListener('keydown', eventHandler);
        }

        return () => {
            if (findTextAreaEle) {
                findTextAreaEle.removeEventListener('keydown', eventHandler);
            }
        };
    }, [monacoEditor]);

    const onMonacoMount: OnMount = (_editor, _monaco) => {
        setMonacoEditor(_editor);
        console.log('Monaco supported actions:');
        console.log(_editor.getSupportedActions().map((a) => a.id))
        focusFindAndClear(_editor)

        // https://github.com/microsoft/monaco-editor/issues/287
        const messageContribution = _editor.getContribution('editor.contrib.messageController');
        _editor.onDidAttemptReadOnlyEdit(() => {
            messageContribution!.dispose();
        });
    };

    const onBeforeMonacoMount: BeforeMount = (monaco) => {
        logLanguage(monaco);
    };

    return (
        <div className='relative group monacologivew'>
            <ControlSnippet />
            {/* <OverflowHandler marginY={125} className="[&>div]:!mr-[-17px]">
                <Highlight {...defaultProps} code={item.contents} language={'log' as any} theme={prismStyle}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre ref={preRef} className={clsx(className, 'px-3 py-0 m-0 h-full overflow-auto whitespace-pre-line !border-none rounded-none')} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </OverflowHandler> */}
            {monacoEditor === undefined && (
                <div className='z-20 absolute top-0 left-0 w-full h-[calc(100vh-125px)] flex-center bg-g-primary-900 pb-[5%]'>
                    <Loading />
                </div>
            )}
            <Editor
                height={`calc(100vh - 88px)`}
                width={'100%'}
                defaultLanguage={'basislog'}
                language='basislog'
                value={item.contents}
                onMount={onMonacoMount}
                beforeMount={onBeforeMonacoMount}
                options={{
                    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                    readOnly: true,
                    minimap: {
                        showSlider: 'mouseover',
                        enabled: config.get('editorMinimapEnabled'),
                        renderCharacters: false,
                    },
                    padding: { top: 0, bottom: 33 },
                    domReadOnly: true,
                    // wordWrap: editorWordWrap ? "on" : "off",
                    fontSize: config.get('editorFontSize'),
                    lightbulb: {
                        enabled: false,
                    },
                    wordWrap: config.get('editorWordWrapEnabled') ? "on" : "off",
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    scrollbar: {
                        useShadows: false,
                        horizontalSliderSize: 33 + 46 /** Arbitrary Value */,
                    },
                    contextmenu: false,
                    find: {
                        // https://github.com/microsoft/vscode/issues/28390#issuecomment-470797061
                        addExtraSpaceOnTop: false,
                    },
                    renderWhitespace: "none"
                }}
                theme={'basistheme'}
            />
        </div>
    );
}
