import { HeadlessRoot } from '../components/Root';
import QuickList from '../components/QuickList';
import useDeviceSize from '../hooks/useDeviceSize';
import SearchBar from '../components/SearchBar';
import * as listElements from '../components/CategoryListButton';

export default function Analyze() {
  const { height } = useDeviceSize();

  return (
    <HeadlessRoot>
      <div className='flex h-full w-full'>
        <div className='h-full w-[60px] bg-g-primary-800 border-r-1 border-g-primary-700'>

        </div>
        <div className='flex w-full'>
          <div className='flex flex-col basis-5/12 border-x border-x-g-primary-700'>
            <SearchBar />
            <QuickList
              height={height - 30 - 30}
              itemCount={1000}
              itemSize={listElements.itemSize}
              rowRenderer={listElements.CategoryListButton}
            />
          </div>
          <div className='flex basis-9/12'></div>
        </div>
      </div>
      {/* <ListWrapper
        hasNextPage={false}
        height={400}
        isNextPageLoading={false}
        itemSize={200}
        loadNextPage={() => {}}
        width="100%"
        items={data}
      /> */}
    </HeadlessRoot>
  );
}
