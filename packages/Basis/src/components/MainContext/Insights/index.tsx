import { Select, Button } from '@geist-ui/core';
import { BsChevronLeft } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import MonacoWrapper from '../MonacoWrapper';
import { UiContext } from '../../../context/UiContext';
import OutputSearch from '../Output/OutputSearch';
import ControlSnippet from './ControlSnippet';
import { MainContentContext } from '../../../context/MainContentContext';

interface IInsight {
    discoveredObjs: [number, number, Record<any, any> | any[]][];
    onBack: () => any;
}

export default function Insight({ discoveredObjs, onBack }: IInsight) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { config, insightFilter, setInsightFilter } = useContext(UiContext);
    const { jumpTo } = useContext(MainContentContext);

    useEffect(() => () => setInsightFilter(''), []);

    if (!discoveredObjs || discoveredObjs.length === 0) return <></>;
    return (
        <div className='relative group monaco-json-view'>
            <ControlSnippet />
            <div className='h-[43px] border-b border-b-gray-700 w-full flex items-center space-x-3 pl-3 pb-0.5'>
                <Button icon={<BsChevronLeft />} auto h='30px' type='default' pr={'7px'} pl={'6px'} className='!flex' onClick={onBack}>
                    <span className='text-[10px] tracking-tight'>BACK</span>
                </Button>
                <Select type='success' initialValue='1' h='30px' value={'' + selectedIndex} width='150px' onChange={(val) => setSelectedIndex(+val)}>
                    {discoveredObjs.map((ele, index) => (
                        <Select.Option value={'' + index}>
                            <span>
                                <span className='font-bold tracking-normal'>
                                    {index + 1}/{discoveredObjs.length}:&nbsp;
                                </span>
                                <span className='font-mono'>{JSON.stringify(ele[2]).slice(0, 100)}</span>
                            </span>
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    auto
                    h='30px'
                    className='!flex'
                    px={'10px'}
                    onClick={() => {
                        jumpTo(discoveredObjs[selectedIndex][0], discoveredObjs[selectedIndex][1]);
                    }}
                >
                    <span className='text-[12px] tracking-tight font-bold'>Jump to</span>
                </Button>
                <span className='font-mono text-xs'>Start index: {discoveredObjs[selectedIndex][0]}&nbsp;</span>
                <span className='font-mono text-xs'>End index: {discoveredObjs[selectedIndex][1]}</span>
            </div>
            <div className='relative group monaco-log-view'>
                {/* <ControlSnippet /> */}
                <MonacoWrapper
                    // Full screen - header - find bar - json path bar
                    height={`calc(100vh - 88px - 43px - 33px)`}
                    language='json'
                    value={insightFilter || JSON.stringify(discoveredObjs[selectedIndex][2], null, 2)}
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
                    }}
                />
            </div>
            <OutputSearch mode='json' searchingObject={discoveredObjs[selectedIndex][2]} />
        </div>
    );
}
