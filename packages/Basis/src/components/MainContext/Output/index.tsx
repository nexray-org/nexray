import { useContext, useRef, useState } from 'react';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from './ControlSnippet';
import OutputSearch from './OutputSearch';
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import type { editor } from 'monaco-editor';
import { Loading } from '@geist-ui/core';

export default function Output() {
    const { data, selectedCategoryId } = useContext(UiContext);
    const item = data.find((ele) => ele.id === selectedCategoryId)!;
    // const preRef = useRef<HTMLPreElement>(null);
    const [monacoEditor, setMonacoEditor] = useState<editor.IStandaloneCodeEditor>();

    const onMonacoMount: OnMount = (editor) => {
        setMonacoEditor(editor);
        const messageContribution = editor.getContribution(
            "editor.contrib.messageController"
        );
        editor.onDidAttemptReadOnlyEdit(() => {
            messageContribution!.dispose();
        });
    }

    const onBeforeMonacoMount: BeforeMount = (monaco) => {
        monaco.editor.defineTheme('basistheme', {
            base: "vs",
            inherit: true,
            rules: [
                {
                    background: "FFFFFF",
                    token: ""
                },
                {
                    foreground: "008e00",
                    token: "comment"
                },
                {
                    foreground: "7d4726",
                    token: "meta.preprocessor"
                },
                {
                    foreground: "7d4726",
                    token: "keyword.control.import"
                },
                {
                    foreground: "df0002",
                    token: "string"
                },
                {
                    foreground: "3a00dc",
                    token: "constant.numeric"
                },
                {
                    foreground: "c800a4",
                    token: "constant.language"
                },
                {
                    foreground: "275a5e",
                    token: "constant.character"
                },
                {
                    foreground: "275a5e",
                    token: "constant.other"
                },
                {
                    foreground: "c800a4",
                    token: "variable.language"
                },
                {
                    foreground: "c800a4",
                    token: "variable.other"
                },
                {
                    foreground: "c800a4",
                    token: "keyword"
                },
                {
                    foreground: "c900a4",
                    token: "storage"
                },
                {
                    foreground: "438288",
                    token: "entity.name.class"
                },
                {
                    foreground: "790ead",
                    token: "entity.name.tag"
                },
                {
                    foreground: "450084",
                    token: "entity.other.attribute-name"
                },
                {
                    foreground: "450084",
                    token: "support.function"
                },
                {
                    foreground: "450084",
                    token: "support.constant"
                },
                {
                    foreground: "790ead",
                    token: "support.type"
                },
                {
                    foreground: "790ead",
                    token: "support.class"
                },
                {
                    foreground: "790ead",
                    token: "support.other.variable"
                }
            ],
            "colors": {
                "editor.foreground": "#FAFAFA",
                "editor.background": "#000",
                "editor.selectionBackground": "#F81CE5",
                "editor.lineHighlightBackground": "#2463B41F",
                "editorCursor.foreground": "#333",
                "editorWhitespace.foreground": "#4B4B7E80"
            }
        })
    }

    return (
        <div className='relative group'>
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
                height={`calc(100vh - 125px)`}
                // defaultLanguage={"log"}
                defaultValue={item.contents}
                onMount={onMonacoMount}
                beforeMount={onBeforeMonacoMount}
                options={{
                    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                    readOnly: true,
                    minimap: { scale: 0.75, showSlider: "mouseover", enabled: false },
                    padding: { top: 0, bottom: 0 },
                    domReadOnly: true,
                    // wordWrap: editorWordWrap ? "on" : "off",
                    fontSize: 12,
                    lightbulb: {
                        enabled: false
                    },
                    lineNumbers: "off",
                    scrollBeyondLastLine: false,
                    scrollbar: {
                        useShadows: false,
                    },
                    contextmenu: false,
                    selectionHighlight: false
                }}
                theme={'basistheme'}
            />
            <OutputSearch monacoEditor={monacoEditor!} />
        </div>
    );
}
