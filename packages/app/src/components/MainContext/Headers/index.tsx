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
                    minimap: { enabled: false },
                    padding: { top: 0, bottom: 33 },
                    fontSize: config.get('insightsFontSize'),
                    wordWrap: config.get('insightsWordWrapEnabled') ? 'on' : 'off',
                    lineNumbers: 'off',
                    scrollbar: {
                        useShadows: false,
                        horizontalSliderSize: 33 + 46 /** Arbitrary Value */,
                    },
                    showFoldingControls: 'always',
                }}
            />
        </div>
    )
}