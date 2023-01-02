import { Button, Select } from '@geist-ui/core';
import clsx from 'clsx';
import { useContext, useMemo, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { MainContentContext } from '../../../context/MainContentContext';
import { UiContext } from '../../../context/UiContext';
import MonacoWrapper from '../MonacoWrapper';
import OutputSearch from './OutputSearch';
import { formatBytes } from './utils';
import Headers from './Headers';
import ControlSnippet from '../ControlSnippet';

export default function Insights() {
    const { activeItem, config } = useContext(UiContext);
    const { setSelectedRequestForInsightId, selectedRequestForInsightId, setSelectedRequestsTab, requestInsightFilter } = useContext(MainContentContext);
    const [isShowingHeaders, setIsShowingHeaders] = useState<boolean>(false);

    const activeRequest = useMemo(() => activeItem!.fetches[selectedRequestForInsightId], [selectedRequestForInsightId, activeItem]);

    const responseJSON = useMemo<false | Record<any, any> | any[]>(() => {
        if (!activeRequest.response) {
            return false;
        }

        try {
            const ob = JSON.parse(activeRequest.response.text)
            return ob;
        } catch (error) {
            return false;
        }
    }, [activeRequest])

    const statBadgeClassName = 'flex-center px-2 h-[30px] font-mono text-xs rounded-md';
    const statBadgeSuccessClassName = "bg-g-primary-700";
    const statBadgeErrorClassName = "bg-g-error-300";

    return (
        <div
            className={clsx(
                'relative group',
                (responseJSON && !isShowingHeaders) && "monaco-json-view",
                (!responseJSON && !isShowingHeaders) && "monaco-request-log-view"
            )}
        >
            <div className='h-[43px] border-b border-b-gray-700 w-full flex items-center space-x-3 px-3 pb-0.5'>
                <Button icon={<BsChevronLeft />} auto h='30px' type='default' pr={'7px'} pl={'6px'} className='!flex' onClick={() => setSelectedRequestsTab('table')}>
                    <span className='text-[10px] tracking-tight'>BACK</span>
                </Button>
                <Select
                    type='success'
                    initialValue='1'
                    h='30px'
                    value={selectedRequestForInsightId}
                    width='150px'
                    onChange={(val) => setSelectedRequestForInsightId(val as string)}
                >
                    {Object.values(activeItem!.fetches).map((ele, index, arr) => (
                        <Select.Option value={ele.id} key={ele.id}>
                            <span>
                                <span className='font-bold tracking-normal'>
                                    {index + 1}/{arr.length}:&nbsp;
                                </span>
                                <span className='font-mono'>{ele.url.slice(0, 100)}</span>
                            </span>
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    h='30px'
                    className={clsx("!mr-auto")}
                    width={"68px"}
                    px="0"
                    scale={0.4}
                    type={isShowingHeaders ? "warning" : "default"}
                    ghost
                    onClick={() => setIsShowingHeaders(prev => !prev)}
                >
                    <span className='font-semibold'>HEADERS</span>
                </Button>
                {activeRequest.response ? (
                    <>
                        {activeRequest.response.redirected && <span className={clsx(statBadgeClassName, "bg-g-warning-300")}>Redirected</span>}
                        <span className={clsx(statBadgeClassName, activeRequest.response.status <= 299 && activeRequest.response.status >= 200 ? statBadgeSuccessClassName : statBadgeErrorClassName)}>{activeRequest.response.status} {activeRequest.response.statusText}</span>
                        <span className={clsx(statBadgeClassName, statBadgeSuccessClassName)}>{activeRequest.response.size ? formatBytes(activeRequest.response?.size) : ""}</span>
                        <span className={clsx(statBadgeClassName, statBadgeSuccessClassName)}>{activeRequest.duration} ms</span>
                    </>
                ) : (
                    <span className={clsx(statBadgeClassName, statBadgeErrorClassName)}>Request Failed</span>
                )}
            </div>
            {isShowingHeaders ? (
                <Headers
                    request={activeRequest.requestInit?.headers ? Object.fromEntries((activeRequest.requestInit.headers.entries as () => IterableIterator<[string, string]>)()) : undefined}
                    response={activeRequest.response?.headers}
                />
            ) : (
                <>
                    {activeRequest.response && (
                        <>
                            {responseJSON ? (
                                <>
                                    <ControlSnippet
                                        copyText={requestInsightFilter || JSON.stringify(responseJSON, null, 2)}
                                        top={56}
                                    />
                                    <MonacoWrapper
                                        // Full screen - header - find bar - json path bar
                                        height={`calc(100vh - 88px - 43px - 33px)`}
                                        language='json'
                                        value={requestInsightFilter || JSON.stringify(responseJSON, null, 2)}
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
                                    <OutputSearch mode='json' searchingObject={responseJSON} />
                                </>
                            ) : (
                                <>
                                    <ControlSnippet
                                        copyText={activeRequest.response?.text}
                                        top={56}
                                    />
                                    <MonacoWrapper
                                        height={`calc(100vh - 88px - 43px)`}
                                        language='basislog'
                                        value={activeRequest.response?.text}
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
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}