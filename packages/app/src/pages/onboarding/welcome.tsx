import { HeadlessRoot } from '../../components/Root';
import { Snippet, Divider, Loading } from '@geist-ui/core';
import { Disclosure } from '@headlessui/react'
import { BsChevronUp } from 'react-icons/bs';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useDeviceSize from '../../hooks/useDeviceSize';
import { thumbRenderer } from '../../components/QuickList';

export default function Welcome() {
    const [selectedDataSource, setSelectedDataSource] = useState<"local" | "remote">("local");
    const { height } = useDeviceSize();

    const steps = [
        {
            panel: "Step 1. Install package",
            children: (
                <div className='tracking-normal'>
                    <Snippet text="npm i @nexray/next" width="300px" toastType='default' />
                </div>
            ),
            defaultOpen: false
        },
        {
            panel: "Step 2. Wrap pages",
            children: <span>Hello WOrld</span>
        }
    ]


    return (
        <HeadlessRoot>
            <Scrollbars
                renderThumbVertical={thumbRenderer}
                renderThumbHorizontal={thumbRenderer}
            >
                <div className='flex-center py-[30px]'>
                    <div className='w-full max-w-[500px]'>
                        <h2 className='text-xl font-semibold text-g-primary-400 mb-8'>Observability for Next.js 13 server components</h2>
                        {steps.map((ele) => (
                            <Disclosure defaultOpen={!!ele.defaultOpen}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={clsx(
                                                "mt-6 rounded-md first-of-type:mt-0 flex w-full justify-between bg-g-primary-800 pl-3 pr-4 py-2 text-left text-sm font-medium hover:bg-g-primary-700",
                                                "ring-2 ring-offset-2 ring-offset-g-primary-900 ring-g-primary-600 focus:outline-none focus-visible:ring-g-primary-500 focus-visible:ring-opacity-75"
                                            )}
                                        >
                                            <span>{ele.panel}</span>
                                            <BsChevronUp
                                                className={clsx('transform h-4 w-4 my-auto', !open && 'rotate-180')}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-gray-500">
                                            {ele.children}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                        <div className='mt-10 mb-8'>
                            <Divider />
                        </div>
                        <div className='mb-3'>
                            <span className='font-semibold text-g-primary-400'>Data Storage</span>
                        </div>
                        <div className='flex space-x-6'>
                            <DataSourceButton
                                selected={selectedDataSource === "local"}
                                title='Local Server'
                                onSelect={() => setSelectedDataSource("local")}
                            >
                                <ul className='text-inherit ml-3'>
                                    <li>Good for local development</li>
                                    <li>No setup</li>
                                    <li>No setup</li>
                                </ul>
                            </DataSourceButton>
                            <DataSourceButton
                                selected={selectedDataSource === "remote"}
                                title='Hosted Server'
                                onSelect={() => setSelectedDataSource("remote")}
                            >
                                <ul className='text-inherit ml-3'>
                                    <li>Good for production</li>
                                    <li>No setup</li>
                                    <li>No setup</li>
                                </ul>
                            </DataSourceButton>
                        </div>
                        <div className='flex items-center mt-2'>
                            <span className='text-g-primary-300 font-semibold tracking-tight text-sm'>Waiting for logs</span>
                            <div className='h-[40px] w-[40px]'>
                                <Loading type="warning" />
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </HeadlessRoot>
    );
}

interface IDataSourceButton {
    selected: boolean;
    title: string;
    children?: React.ReactNode;
    onSelect: () => any;
    className?: string;
}

function DataSourceButton({ selected, title, children, onSelect, className }: IDataSourceButton) {
    const dataSourceClassName = [
        "w-full bg-g-primary-900 h-[200px] rounded-md",
        'px-4 py-3 text-left',
        "ring-offset-2 ring-offset-g-primary-900",
        "transition-all outline-none cursor-pointer",
        "hover:ring-4 hover:bg-g-primary-800",
        selected ? "ring-indigo-600 bg-g-primary-800 ring-4" : "ring-2 ring-g-primary-600",
        selected ? "text-g-primary-50" : "text-g-primary-400",
    ];

    return (
        <div className='flex basis-1/2'>
            <button className={clsx(...dataSourceClassName, className)} onClick={onSelect}>
                <div className='w-full flex items-center justify-between mb-4'>
                    <span
                        className={clsx(
                            "text-inherit tracking-tight font-bold"
                        )}
                    >
                        {title}
                    </span>

                    <div
                        className={clsx(
                            'h-[10px] w-[10px] rounded-full',
                            'ring-1 ring-offset-1 ring-offset-g-primary-900',
                            selected ? "bg-indigo-600 ring-indigo-600" : "ring-g-primary-600 bg-transparent"
                        )}
                    />
                </div>
                <div className='w-full h-full block text-sm'>
                    {children}
                </div>
            </button>
        </div>
    )
}