import React, { useRef } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars-2';
import clsx from 'clsx';

interface IQuickList<T> extends Omit<FixedSizeListProps<T>, 'children' | 'width'> {
    rowRenderer: FixedSizeListProps<T>['children'];
    height: number;
}

export const thumbRenderer = ({ style, ...props }: any) => {
    return <div style={style} {...props} className={clsx(props.className, 'rounded-none bg-g-primary-600 active:bg-g-primary-500')} />;
};

export default function QuickList<T extends any>({ rowRenderer, height, ...props }: IQuickList<T>) {
    const listRef = useRef<FixedSizeList>(null);

    return (
        <Scrollbars
            style={{ height, width: '100%' }}
            onScrollFrame={({ scrollTop }) => {
                listRef.current?.scrollTo(scrollTop);
            }}
            renderThumbVertical={thumbRenderer}
            renderThumbHorizontal={thumbRenderer}
        >
            <FixedSizeList<T> {...props} ref={listRef} height={height} width='100%' style={{ overflow: "visible" }}>
                {rowRenderer}
            </FixedSizeList>
        </Scrollbars>
    );
}
