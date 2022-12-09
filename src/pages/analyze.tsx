import { HeadlessRoot } from '../components/Root';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FixedSizeListProps } from 'react-window';
import QuickList from '../components/QuickList';
import useDeviceSize from '../hooks/useDeviceSize';
import { TextInput } from '../components/TextInput';
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function Analyze() {
  const [data, setData] = useState(() => [...new Array(1000)].map(_ => (
    <div className='max-h-[200px] min-h-[200px] border-y'>
      <div className='flex items-center'>
        <span className='text-gray-300 text-sm font-semibold'>POST</span>
        <div className='rounded leading-none px-2 py-1 text-xs bg-true-gray-800 text-true-gray-600'>200 OK</div>
      </div>
      <span className='text-xl text-gray-600 font-semibold'>{faker.image.imageUrl()}</span>
      <span className='text-xs text-gray-800'>{faker.random.words(700).slice(0, 200)}{String.fromCharCode(8230)}</span>
      <div className='flex items-center'>
        {dayjs(faker.date.recent()).format("MMMM D, YYYY h:mm:ss A")}
      </div>
    </div>
  )));

  const { height } = useDeviceSize();

  const Row: FixedSizeListProps['children'] = ({ index, style }) => (
    <div style={style}>Row {index}</div>
  );

  return (
    <HeadlessRoot>
      <div className='flex h-full w-full'>
        <div className='h-full w-[60px] bg-true-gray-800 border-r-1 border-true-gray-700'>

        </div>
        <div className='flex w-full'>
          <div className='flex flex-col basis-5/12'>
            <TextInput 
              placeholder='Search'
              rootProps={{
                className: "border-t-0 border-x-0"
              }}
              trailingVisual={<BsFillCaretDownFill fontSize={"0.8em"} />}
            />
            <QuickList
              height={height - 30 - 30}
              itemCount={1000}
              itemSize={35}
              rowRenderer={Row}
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
