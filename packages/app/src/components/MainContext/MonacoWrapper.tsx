import { useEffect, useState } from 'react';
import Editor, { OnMount, EditorProps } from '@monaco-editor/react';
import type { editor, IDisposable } from 'monaco-editor';
import { Loading } from '@geist-ui/core';

function MonacoPlaceholder() {
    return (
        <div className='z-20 absolute top-0 left-0 w-full h-[calc(100vh-125px)] flex-center bg-g-primary-900 pb-[5%]'>
            <Loading />
        </div>
    );
}

export function focusFindAndClear(_editor: editor.IStandaloneCodeEditor) {
    // https://github.com/microsoft/monaco-editor/issues/2355#issuecomment-791461752
    // https://stackoverflow.com/a/46012210
    _editor.focus();
    // _editor.getAction('actions.find').run(); This doesn;t run sometimes, returns null. Stick with trigger
    _editor.trigger('', 'actions.find', undefined);
    if (document) {
        const findRawInput = document.querySelector('.monaco-editor .find-widget>.find-part .monaco-inputbox>.ibwrapper>textarea.input');
        if (findRawInput) {
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
            if (nativeTextAreaValueSetter) {
                nativeTextAreaValueSetter.call(findRawInput, '');
                findRawInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    }
}

export default function MonacoWrapper(props: Omit<EditorProps, 'onMount' | 'theme' | 'width'> & { safeOnMount?: OnMount, disableFind?: boolean; }) {
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
        console.log(_editor.getSupportedActions().map((a) => a.id));
        if (!props.disableFind) {
            focusFindAndClear(_editor);
        }

        // https://github.com/microsoft/monaco-editor/issues/287
        const messageContribution = _editor.getContribution('editor.contrib.messageController');
        _editor.onDidAttemptReadOnlyEdit(() => {
            messageContribution!.dispose();
        });
    };

    return (
        <>
            {monacoEditor === undefined && <MonacoPlaceholder />}
            <Editor
                width={'100%'}
                theme={'basistheme'}
                {...props}
                onMount={(_editor, _monaco) => {
                    onMonacoMount(_editor, _monaco);
                    props.safeOnMount && props.safeOnMount(_editor, _monaco);
                }}
                options={{
                    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                    readOnly: true,
                    domReadOnly: true,
                    links: false,
                    renderWhitespace: 'none',
                    lightbulb: {
                        enabled: false,
                    },
                    contextmenu: false,
                    find: {
                        // https://github.com/microsoft/vscode/issues/28390#issuecomment-470797061
                        addExtraSpaceOnTop: false,
                    },
                    scrollbar: {
                        useShadows: false,
                    },
                    scrollBeyondLastLine: false,
                    ...props.options,
                }}
            />
        </>
    );
}
