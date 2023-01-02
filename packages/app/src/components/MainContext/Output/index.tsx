import { useContext, useEffect } from 'react';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from '../ControlSnippet';
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
            <ControlSnippet 
                copyText={(itemContentStrings && selectedContentString) ? itemContentStrings[selectedContentString] : ""} 
                top={12}
            />
            <MonacoWrapper
                height={`calc(100vh - 88px)`}
                language='basislog'
                value={(itemContentStrings && selectedContentString) ? itemContentStrings[selectedContentString] : ""}
                safeOnMount={onMonacoMount}
                beforeMount={onBeforeMonacoMount}
                options={{
                    minimap: {
                        showSlider: 'mouseover',
                        enabled: config.get('editorMinimapEnabled'),
                        renderCharacters: false,
                    },
                    padding: { top: 0, bottom: 33 },
                    fontSize: config.get('editorFontSize'),
                    wordWrap: config.get('editorWordWrapEnabled') ? 'on' : 'off',
                    lineNumbers: 'off',
                    scrollbar: {
                        useShadows: false,
                        horizontalSliderSize: 33 + 46 /** Arbitrary Value */,
                    },
                }}
            />
        </div>
    );
}
