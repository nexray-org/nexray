import { HeadlessRoot } from '../components/Root';
import QuickList from '../components/QuickList';
import useDeviceSize from '../hooks/useDeviceSize';
import SearchBar from '../components/SearchBar';
import * as listElements from '../components/CategoryListButton';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';
import Image from 'next/image';
import MainContent from '../components/MainContext';
import InsightSettings from '../modals/InsightSettings';
import JsonFilterHelp from '../modals/JsonFilterHelp';
import OutputSettings from '../modals/OutputSettings';
import FilterGroups from '../modals/FilterGroups';

export default function Analyze() {
    const { height } = useDeviceSize();
    const { selectedCategoryId } = useContext(UiContext);

    return (
        <HeadlessRoot>
            <div className='flex h-full w-full'>
                <div className='h-full w-[60px] bg-g-primary-800 border-r-1 border-g-primary-700'></div>
                <div className='flex w-full'>
                    <div className='flex flex-col basis-5/12 border-x border-x-g-primary-700'>
                        <SearchBar />
                        <QuickList height={height - 30 - 30} itemCount={1000} itemSize={listElements.itemSize} rowRenderer={listElements.CategoryListButton} />
                    </div>
                    <div className='flex basis-9/12 overflow-hidden'>
                        {!selectedCategoryId ? (
                            <div className='flex-center flex-col text-center w-full pointer-events-none select-none'>
                                <div className='max-w-[200px] brightness-[0.25]'>
                                    <Image src={require('../assets/ring.png')} />
                                </div>
                                <span className='text-g-primary-600 font-semibold text-sm mt-6'>Select a request log group on the left to begin</span>
                            </div>
                        ) : (
                            <MainContent />
                        )}
                    </div>
                </div>
            </div>
            <InsightSettings />
            <JsonFilterHelp />
            <OutputSettings />
            <FilterGroups />
        </HeadlessRoot>
    );
}
