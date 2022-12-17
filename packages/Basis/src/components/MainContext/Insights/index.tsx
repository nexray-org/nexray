import { Select, Button } from '@geist-ui/core';
import { BsChevronLeft } from 'react-icons/bs';
import { useContext, useEffect } from 'react';
import MonacoWrapper from '../MonacoWrapper';
import { UiContext } from '../../../context/UiContext';
import OutputSearch from '../Output/OutputSearch';
import ControlSnippet from './ControlSnippet';
import { MainContentContext } from '../../../context/MainContentContext';
import numbro from 'numbro';

interface IInsight {
    discoveredObjs: [number, number, Record<any, any> | any[]][];
    onBack: () => any;
}

export default function Insight({ discoveredObjs, onBack }: IInsight) {
    const { config } = useContext(UiContext);
    const { jumpTo, insightFilter, setInsightFilter, selectedDiscoveredIndex, setSelectedDiscoveredIndex } = useContext(MainContentContext);

    useEffect(
        () => () => {
            setInsightFilter('');
            setSelectedDiscoveredIndex(0);
        },
        [],
    );

    if (!discoveredObjs || discoveredObjs.length === 0) return <></>;
    return (
        <div className='relative group monaco-json-view'>
            <ControlSnippet />
            <div className='h-[43px] border-b border-b-gray-700 w-full flex items-center space-x-3 pl-3 pb-0.5'>
                <Button icon={<BsChevronLeft />} auto h='30px' type='default' pr={'7px'} pl={'6px'} className='!flex' onClick={onBack}>
                    <span className='text-[10px] tracking-tight'>BACK</span>
                </Button>
                <Select
                    type='success'
                    initialValue='1'
                    h='30px'
                    value={'' + selectedDiscoveredIndex}
                    width='150px'
                    onChange={(val) => setSelectedDiscoveredIndex(+val)}
                >
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
                        jumpTo(discoveredObjs[selectedDiscoveredIndex][0], discoveredObjs[selectedDiscoveredIndex][1]);
                    }}
                >
                    <span className='text-[12px] tracking-tight font-bold'>Jump to</span>
                </Button>
                {config.get('insightsIndexesEnabled') && (
                    <>
                        <span className='font-mono text-[11px]'>
                            Start index: {numbro(discoveredObjs[selectedDiscoveredIndex][0]).format({ thousandSeparated: true })}
                        </span>
                        <span className='font-mono text-[11px]'>
                            End index: {numbro(discoveredObjs[selectedDiscoveredIndex][1]).format({ thousandSeparated: true })}
                        </span>
                    </>
                )}
            </div>
            <div className='relative group monaco-log-view'>
                {/* <ControlSnippet /> */}
                <MonacoWrapper
                    // Full screen - header - find bar - json path bar
                    height={`calc(100vh - 88px - 43px - 33px)`}
                    language='json'
                    value={insightFilter || JSON.stringify(discoveredObjs[selectedDiscoveredIndex][2], null, 2)}
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
            <OutputSearch mode='json' searchingObject={discoveredObjs[selectedDiscoveredIndex][2]} />
        </div>
    );
}
