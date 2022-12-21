import MonacoWrapper from '../MonacoWrapper';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from '../ControlSnippet';
import { useContext } from 'react';

export default function Headers() {
    const { activeItem, config, setIsInsightsSettingsDialogOpen } = useContext(UiContext);

    return (
        <div className='relative group monaco-log-view'>
            <ControlSnippet 
                copyText={activeItem?.headers ? JSON.stringify(activeItem.headers, null, 2) : ""}
                onSettingClick={() => setIsInsightsSettingsDialogOpen(true)}
                className="top-3"
            />
            <MonacoWrapper
                // Full screen - header - find bar - json path bar
                height={`calc(100vh - 88px)`}
                language='json'
                value={activeItem?.headers ? JSON.stringify(activeItem.headers, null, 2) : ""}
                options={{
                    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                    readOnly: true,
                    minimap: { enabled: false },
                    padding: { top: 0, bottom: 33 },
                    domReadOnly: true,
                    fontSize: config.get('insightsFontSize'),
                    lightbulb: {
                        enabled: false,
                    },
                    wordWrap: config.get('insightsWordWrapEnabled') ? 'on' : 'off',
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
                    showFoldingControls: 'always',
                    links: false,
                }}
            />
        </div>
    )
}