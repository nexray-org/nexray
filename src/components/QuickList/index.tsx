import React, { useRef } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface IQuickList extends Omit<FixedSizeListProps, 'children' | "width"> {
  rowRenderer: FixedSizeListProps['children'];
  height: number;
}

export default function QuickList({
  rowRenderer,
  height,
  ...props
}: IQuickList) {
  const listRef = useRef<FixedSizeList>(null);

  return (
    <Scrollbars 
      style={{ height, width: "100%" }} 
      onScrollFrame={({ scrollTop }) => {
        listRef.current?.scrollTo(scrollTop);
      }}
    >
      <FixedSizeList
        {...props}
        ref={listRef}
        height={height}
        width="100%"
        style={{ overflow: "visible" }}
      >
        {rowRenderer}
      </FixedSizeList>
    </Scrollbars>
  );
}