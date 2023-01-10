import Root from '../components/Root';
import QuickList from '../components/QuickList';
import useDeviceSize from '../hooks/useDeviceSize';
import SearchBar from '../components/SearchBar';
import * as listElements from '../components/CategoryListButton';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';
import Image from 'next/image';
import MainContent from '../components/MainContext';
import FilterGroups from '../modals/FilterGroups';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Sidebar from '../components/Sidebar';
import { ServerComponentRequest } from '@nexray/types';

export default function Analyze() {
    const { height } = useDeviceSize();
    const { selectedCategoryId, data } = useContext(UiContext);

    return (
        <Root>
            <div className='flex h-full w-full'>
                <div className='h-full w-[60px] bg-g-primary-800 border-r-1 border-g-primary-700'>
                    <Sidebar />
                </div>
                <div className='flex w-full'>
                    <Allotment>
                        <Allotment.Pane preferredSize={'35%'} minSize={250}>
                            <div className='flex flex-col border-l border-l-g-primary-700'>
                                <SearchBar />
                                <QuickList<ServerComponentRequest[]>
                                    height={height - 36}
                                    itemCount={data.length}
                                    itemSize={listElements.itemSize}
                                    rowRenderer={listElements.CategoryListButton}
                                    itemKey={(index) => data[index].id}
                                />
                            </div>
                        </Allotment.Pane>
                        <Allotment.Pane preferredSize={'65%'}>
                            <div className='overflow-hidden h-full'>
                                {!selectedCategoryId ? (
                                    <div className='flex-center flex-col text-center w-full h-full pb-[4vh] pointer-events-none select-none'>
                                        <div className='max-w-[200px] brightness-[0.25]'>
                                            <Image src={require('../assets/ring.png')} alt="Analyze placeholder" />
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
        </Root>
    );
}
