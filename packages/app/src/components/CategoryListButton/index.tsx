import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { FixedSizeListProps } from 'react-window';
import { UiContext } from '../../context/UiContext';
import numbro from 'numbro';

export const itemSize = 140;

export const CategoryListButton: FixedSizeListProps<undefined>['children'] = ({ index, style }) => {
    const { selectedCategoryId, setSelectedCategoryId, data } = useContext(UiContext);
    const item = data[index];

    if (!item) {
        return <></>;
    }

    return (
        <div
            style={style}
            onClick={() => setSelectedCategoryId(item.id)}
            className={clsx(
                'pl-2 pr-3.5 py-4 border-b border-b-g-primary-800 transition-colors hover:bg-g-primary-800 h-[140px]',
                'cursor-pointer',
                selectedCategoryId === item.id && 'bg-g-primary-800',
            )}
        >
            <div className='flex items-center justify-between tracking-tight'>
                <span className='text-g-primary-100 text-xs font-semibold capitalize'>{`${item.type} component`}</span>
                <div className={clsx(
                    'font-mono ml-2 rounded leading-none font-bold px-1.5 py-1 text-xs text-g-primary-50',
                    item.error ? "bg-red-500" : "bg-green-600"
                )}>
                    {item.error ? "ERROR" : "SUCCESS"}
                </div>
            </div>
            <span className='text-g-primary-50 font-semibold mt-1'>{item.url}</span>
            <div className='min-h-[45px] max-h-[45px] mt-1 overflow-hidden'>
                <span className='text-xs text-g-primary-400 tracking-normal leading-normal line-clamp-2'>&#8230;{item.timeline[item.timeline.length - 1].content}</span>
            </div>
            <div className='flex items-center justify-between tracking-tight'>
                <span className='text-xs font-semibold text-g-primary-200'>{dayjs(item.time).format('MM/DD/YYYY h:mm:ss A')}</span>
                <span className='flex items-center font-mono text-[10px]'>
                    {numbro(item.durationMs).format({ thousandSeparated: true })} MS
                </span>
            </div>
        </div>
    );
};
