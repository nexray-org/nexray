import React from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

interface IListWrapper extends Pick<FixedSizeListProps, "itemSize" | "width" | "height"> {
    // Are there more items to load?
    // (This information comes from the most recent API request.)
    hasNextPage: boolean;
  
    // Are we currently loading a page of items?
    // (This may be an in-flight flag in your Redux store for example.)
    isNextPageLoading: boolean;
  
    // Array of items loaded so far.
    items: React.ReactElement[];
  
    // Callback function responsible for loading the next page of items.
    loadNextPage: (startIndex: number, stopIndex: number) => void | Promise<void>;
}

export default function ListWrapper({
    hasNextPage,
    isNextPageLoading,
    items,
    loadNextPage,
    ...props
  }: IListWrapper) {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = hasNextPage ? items.length + 1 : items.length;
  
    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  
    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index: number) => !hasNextPage || index < items.length;
  
    // Render an item or a loading indicator.
    const Item: FixedSizeListProps['children'] = ({ index, style }) => {
      let content: React.ReactElement;
      if (!isItemLoaded(index)) {
        content = <div style={style}>(Spinner)</div>;
      } else {
        content = items[index];
      }
  
      return content;
    };
  
    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
            {...props}
          >
            {Item}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    );
  }