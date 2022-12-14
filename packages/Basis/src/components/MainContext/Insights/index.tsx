import { Select, Button } from '@geist-ui/core';
import { BsChevronLeft } from 'react-icons/bs';
import { useContext, useState } from 'react';
import UseMonaco from '../MonacoWrapper';
import { UiContext } from '../../../context/UiContext';

interface IInsight {
    discoveredObjs: ([number, number, Record<any, any> | any[]][]);
    onBack: () => any;
}

export default function Insight({ discoveredObjs, onBack }: IInsight) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { config } = useContext(UiContext);
    if (!discoveredObjs) return undefined;
    return (
        <div className='relative'>
            <div className='h-[43px] border-b border-b-gray-700 w-full flex items-center space-x-3 pl-3 pb-0.5'>
                <Button
                    icon={<BsChevronLeft />}
                    auto
                    h="30px"
                    type='default'
                    pr={"7px"}
                    pl={"6px"}
                    py={0}
                    className='!flex'
                    onClick={onBack}
                >
                    <span className='text-[10px] tracking-tight'>BACK</span>
                </Button>
                <Select
                    type="success"
                    initialValue="1"
                    h="30px"
                    value={"" + selectedIndex}
                    width="150px"
                    onChange={val => setSelectedIndex(+val)}
                >
                    {discoveredObjs.map((ele, index) => (
                        <Select.Option value={"" + index}>
                            <span>
                                <span className="font-bold tracking-normal">{index + 1}/{discoveredObjs.length}:&nbsp;</span>
                                <span className="font-mono">{JSON.stringify(ele[2]).slice(0, 100)}</span>
                            </span>
                        </Select.Option>
                    ))}
                </Select>
                <span className='font-mono text-xs'>Start index: {discoveredObjs[selectedIndex][0]}&nbsp;</span>
                <span className='font-mono text-xs'>End index: {discoveredObjs[selectedIndex][1]}</span>
            </div>
            <div className='relative group monaco-log-view'>
                {/* <ControlSnippet /> */}
                <UseMonaco
                    height={`calc(100vh - 88px)`}
                    language='json'
                    value={JSON.stringify(discoveredObjs[selectedIndex][2], null, 2)}
                    options={{
                        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                        readOnly: true,
                        minimap: {
                            enabled: false,
                        },
                        padding: { top: 0, bottom: 33 },
                        domReadOnly: true,
                        // wordWrap: editorWordWrap ? "on" : "off",
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
        </div>
    )
}