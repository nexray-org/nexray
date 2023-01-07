import MonacoWrapper from '../MonacoWrapper';
import { UiContext } from '../../../context/UiContext';
import ControlSnippet from '../ControlSnippet';
import { useContext } from 'react';

export default function Headers() {
    const { activeItem, config } = useContext(UiContext);

    const formattedHeaders = activeItem?.headers ? JSON.stringify(Object.fromEntries(activeItem.headers), null, 2) : '';

    return (
        <div className='relative group monaco-log-view'>
            <ControlSnippet copyText={formattedHeaders} top={12} />
            <MonacoWrapper
                // Full screen - header - find bar - json path bar
                height={`calc(100vh - 58px)`}
                language='json'
                value={formattedHeaders}
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
    );
}
