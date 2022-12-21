import { HeadlessRoot } from '../components/Root';
import QuickList from '../components/QuickList';
import useDeviceSize from '../hooks/useDeviceSize';
import SearchBar from '../components/SearchBar';
import * as listElements from '../components/CategoryListButton';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';
import Image from 'next/image';
import MainContent from '../components/MainContext';
import FilterGroups from '../modals/FilterGroups';
import useWatchLocalDb from '../hooks/useWatchLocalDb';
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function Analyze() {
    const { height } = useDeviceSize();
    const { selectedCategoryId, data } = useContext(UiContext);
    useWatchLocalDb();

    return (
        <HeadlessRoot>
            <div className='flex h-full w-full'>
                <div className='h-full w-[60px] bg-g-primary-800 border-r-1 border-g-primary-700'></div>
                <div className='flex w-full'>
                    <Allotment>
                        <Allotment.Pane preferredSize={"35%"} minSize={250}>
                            <div className='flex flex-col border-l border-l-g-primary-700'>
                                <SearchBar />
                                <QuickList height={height - 30 - 36} itemCount={data.length} itemSize={listElements.itemSize} rowRenderer={listElements.CategoryListButton} />
                            </div>
                        </Allotment.Pane>
                        <Allotment.Pane preferredSize={"65%"}>
                            <div className='overflow-hidden'>
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
                        </Allotment.Pane>
                    </Allotment>
                </div>
            </div>
            <FilterGroups />
        </HeadlessRoot>
    );
}
