import React, { useRef } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars-2';
import clsx from 'clsx';

interface IQuickList extends Omit<FixedSizeListProps, 'children' | 'width'> {
    rowRenderer: FixedSizeListProps['children'];
    height: number;
}

export const thumbRenderer = ({ style, ...props }: any) => {
    return <div style={style} {...props} className={clsx(props.className, 'rounded-md bg-g-primary-600 active:bg-g-primary-500')} />;
};

export default function QuickList({ rowRenderer, height, ...props }: IQuickList) {
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
            <FixedSizeList {...props} ref={listRef} height={height} width='100%' style={{ overflow: 'visible' }}>
                {rowRenderer}
            </FixedSizeList>
        </Scrollbars>
    );
}