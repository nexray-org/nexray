import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from './ControlSnippet';
import { OnMount, BeforeMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import logLanguage from './logLanguage';
import MonacoWrapper, { focusFindAndClear } from '../MonacoWrapper';

export default function Output() {
    const { selectedCategoryId, config, activeItem } = useContext(UiContext);
    const [monacoEditor, setMonacoEditor] = useState<editor.IStandaloneCodeEditor>();

    useEffect(() => {
        // focus find bar and delete contents
        if (monacoEditor) {
            focusFindAndClear(monacoEditor)
        } else {
            // Otherwise, just do this 
        }
    }, [selectedCategoryId])

    const onMonacoMount: OnMount = (_editor) => {
        setMonacoEditor(_editor);
    };

    const onBeforeMonacoMount: BeforeMount = (monaco) => {
        logLanguage(monaco);
    };

    return (
        <div className='relative group monaco-log-view'>
            <ControlSnippet />
            {monacoEditor === undefined && <></>}
            <MonacoWrapper
                height={`calc(100vh - 88px)`}
                language='basislog'
                value={activeItem?.contents}
                safeOnMount={onMonacoMount}
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
            />
        </div>
    );
}
