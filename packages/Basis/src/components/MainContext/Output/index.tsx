import { useContext, useEffect } from 'react';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from './ControlSnippet';
import { OnMount, BeforeMount } from '@monaco-editor/react';
import logLanguage from './logLanguage';
import MonacoWrapper, { focusFindAndClear } from '../MonacoWrapper';
import { MainContentContext } from '../../../context/MainContentContext';

export default function Output() {
    const { selectedCategoryId, config, itemContentStrings } = useContext(UiContext);
    const { outputMonacoEditor, setOutputMonacoEditor, selectedContentString } = useContext(MainContentContext);

    useEffect(() => {
        // focus find bar and delete contents
        if (outputMonacoEditor) {
            focusFindAndClear(outputMonacoEditor);
        } else {
            // Otherwise, just do this
        }
    }, [selectedCategoryId]);

    const onMonacoMount: OnMount = (_editor) => {
        setOutputMonacoEditor(_editor);
    };

    const onBeforeMonacoMount: BeforeMount = (monaco) => {
        logLanguage(monaco);
    };

    return (
        <div className='relative group monaco-log-view'>
            <ControlSnippet />
            <MonacoWrapper
                height={`calc(100vh - 88px)`}
                language='basislog'
                value={itemContentStrings ? itemContentStrings[selectedContentString!] : undefined}
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
                    wordWrap: config.get('editorWordWrapEnabled') ? 'on' : 'off',
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
                    renderWhitespace: 'none',
                }}
            />
        </div>
    );
}
