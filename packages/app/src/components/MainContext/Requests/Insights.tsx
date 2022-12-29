import { Button, Select } from '@geist-ui/core';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { MainContentContext } from '../../../context/MainContentContext';
import { UiContext } from '../../../context/UiContext';
import { formatBytes } from './utils';

export default function Insights() {
    const { activeItem } = useContext(UiContext);
    const { setSelectedRequestForInsightId, selectedRequestForInsightId, setSelectedRequestsTab } = useContext(MainContentContext);
 
    const activeRequest = useMemo(() => activeItem!.fetches[selectedRequestForInsightId], [selectedRequestForInsightId, activeItem]);
    const statBadgeClassName = 'flex-center px-2 h-[30px] font-mono bg-g-primary-700 text-xs rounded-md';
    return (
        <div className='relative group monaco-json-view'>
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
                <span className={clsx(statBadgeClassName, "!ml-auto")}>{activeRequest.response?.status} {activeRequest.response?.statusText}</span>
                <span className={clsx(statBadgeClassName)}>{activeRequest.response?.size ? formatBytes(activeRequest.response?.size) : ""}</span>
                <span className={clsx(statBadgeClassName)}>{activeRequest.duration} ms</span>
            </div>
        </div>
    )
}