import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { FixedSizeListProps } from 'react-window';
import { UiContext } from '../../context/UiContext';
import numbro from 'numbro';
import { ServerComponentRequest } from '@nexray/types';
import styles from './selection.module.css';

export const itemSize = 140;

export const CategoryListButton: FixedSizeListProps<ServerComponentRequest[]>['children'] = ({ index, style }) => {
    const { selectedCategoryId, setSelectedCategoryId, data, filteredData, dataSearchVal } = useContext(UiContext);
    const item = dataSearchVal ? filteredData[index] : data[index];

    if (!item) {
        return <></>;
    }

    function separateUrlForHighlight(itemRoute: string): React.ReactNode {
        // https://stackoverflow.com/a/52747318
        const escapedSearchString = dataSearchVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const searchRegex = new RegExp(escapedSearchString, 'i'); // Cannot use g because global match doesn't return indexes

        const match = itemRoute.match(searchRegex);
        if (match && match[0]) {
            return [
                itemRoute.slice(0, match.index),
                // <mark>{itemRoute.slice(match.index, match[0].length)}</mark>,
                <span className={clsx(styles['with-selection'])}>{itemRoute.slice(match.index, match[0].length)}</span>,
                itemRoute.slice(match.index! + match[0].length),
            ];
        } else {
            return itemRoute;
        }
    }

    return (
        <div
            style={style}
            onClick={() => setSelectedCategoryId(item.id)}
            className={clsx(
                'pl-2 pr-3.5 py-4 border-b border-b-g-primary-800 transition-colors hover:bg-g-primary-800',
                'cursor-pointer max-h-[140px] overflow-hidden h-full',
                selectedCategoryId === item.id && 'bg-g-primary-700 hover:!bg-g-primary-700',
            )}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            <div className='flex items-center justify-between tracking-tight'>
                <span className='text-g-primary-100 text-xs font-semibold capitalize'>{`Server component`}</span>
                <div
                    className={clsx(
                        'font-mono ml-2 rounded leading-none font-bold px-1.5 py-1 text-xs text-g-primary-50',
                        item.error ? 'bg-red-500' : 'bg-green-600',
                    )}
                >
                    {item.error ? 'ERROR' : 'SUCCESS'}
                </div>
            </div>
            <span className='text-g-primary-50 font-semibold mt-1'>{dataSearchVal ? separateUrlForHighlight(item.url) : item.url}</span>
            <div className='min-h-[45px] max-h-[45px] mt-1 overflow-hidden'>
                <span className='text-xs text-g-primary-400 tracking-normal leading-normal line-clamp-2'>
                    &#8230;{item.timeline[item.timeline.length - 1].content}
                </span>
            </div>
            <div className='flex items-center justify-between tracking-tight'>
                <span className='text-xs font-semibold text-g-primary-200'>{dayjs(item.time).format('MM/DD/YYYY h:mm:ss A')}</span>
                <span className='flex items-center font-mono text-[10px]'>{numbro(item.durationMs).format({ thousandSeparated: true })} MS</span>
            </div>
        </div>
    );
};
