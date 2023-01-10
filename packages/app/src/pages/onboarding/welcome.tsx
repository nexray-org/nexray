import Root from '../../components/Root';
import { Snippet, Divider, Loading, Code } from '@geist-ui/core';
import { Disclosure } from '@headlessui/react'
import { BsChevronUp } from 'react-icons/bs';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { thumbRenderer } from '../../components/QuickList';
import WrapPages from '../../snippets/WrapPages';

export default function Welcome() {
    const [selectedDataSource, setSelectedDataSource] = useState<"local" | "remote">("local");

    const steps = [
        {
            panel: "Step 1. Install package",
            children: (
                <>
                    <div className='mb-3'><span>In your Next.js 13 project, install the Nexray library with your preferred package manager. The provided snippets use <Code>npm</Code>.</span></div>
                    <div className='tracking-normal'>
                        <Snippet text="npm i @nexray/next" width="300px" toastType='default' />
                    </div>
                </>
            ),
            defaultOpen: true
        },
        {
            panel: "Step 2. Wrap pages",
            children: (
                <>
                    <div className='mb-3'><span>For each <em>page</em> file in your <Code>app/</Code> directory, wrap the default export with <Code>nexray</Code>.</span></div>
                    <WrapPages />
                </>
            )
        },
        {
            panel: "Step 3. (Optional) Configure methods",
            children: <span>Hello WOrld</span>
        }
    ]


    return (
        <Root>
            <Scrollbars
                renderThumbVertical={thumbRenderer}
                renderThumbHorizontal={thumbRenderer}
                universal
            >
                <div className='flex-center py-[30px]'>
                    <div className='w-full max-w-[500px]'>
                        <h2 className='text-xl font-semibold text-g-primary-400 mb-6'>Observability for Next.js 13 server components</h2>
                        <div className='flex space-x-6'>
                            <DataSourceButton
                                selected={selectedDataSource === "local"}
                                title='Local Server'
                                onSelect={() => setSelectedDataSource("local")}
                            >
                                <ul className='text-inherit ml-3'>
                                    <li>Ideal for development</li>
                                    <li>Works with local instance</li>
                                    <li>Built-in support</li>
                                </ul>
                            </DataSourceButton>
                            <DataSourceButton
                                selected={selectedDataSource === "remote"}
                                title='Hosted Server'
                                onSelect={() => setSelectedDataSource("remote")}
                                disabled
                            >
                                <ul className='text-inherit ml-3'>
                                    <li>Ideal for production</li>
                                    <li>Works the Vercel & Netlify</li>
                                    <li>Self-deployed Docker</li>
                                </ul>
                            </DataSourceButton>
                        </div>
                        <div className='mt-10 mb-8'>
                            <Divider />
                        </div>
                        {steps.map((ele, i) => (
                            <Disclosure defaultOpen={!!ele.defaultOpen} key={i}>
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
                                        <Disclosure.Panel className="px-1 pt-4 text-sm text-g-primary-200 tracking-tight">
                                            {ele.children}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                        <div className='mt-4'>
                            <span className='text-g-primary-300 font-semibold tracking-tight text-sm'><span className='text-g-primary-50'>You're all set.</span> Start the development server on this machine and navigate to a page. Traces will automatically appear here.</span>
                        </div>
                        <div className='flex items-center mt-4'>
                            <span className='text-g-primary-300 font-semibold tracking-tight text-sm'>Waiting for logs</span>
                            <div className='h-[40px] w-[40px]'>
                                <Loading type="warning" />
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </Root>
    );
}

interface IDataSourceButton {
    selected: boolean;
    title: string;
    children?: React.ReactNode;
    onSelect: () => any;
    className?: string;
    disabled?: boolean;
}

function DataSourceButton({ selected, title, children, onSelect, className, disabled }: IDataSourceButton) {
    const dataSourceClassName = [
        "w-full bg-g-primary-900 h-[200px] rounded-md",
        'relative px-4 py-3 text-left',
        "ring-offset-2 ring-offset-g-primary-900",
        "transition-all outline-none cursor-pointer",
        "hover:ring-4 hover:bg-g-primary-800",
        selected ? "ring-indigo-600 bg-g-primary-800 ring-4" : "ring-2 ring-g-primary-600",
        selected ? "text-g-primary-50" : "text-g-primary-400",
    ];

    return (
        <div className='flex basis-1/2'>
            <button
                className={clsx(...dataSourceClassName, className, disabled && "pointer-events-none")}
                onClick={onSelect}
            >
                {disabled && (
                    <>
                        <div
                            className='absolute top-0 left-0 bottom-0 right-0 flex-center z-20'
                        >
                            <span className='text-g-primary-50 tracking-tight font-semibold text-sm'>Coming Soon</span>
                            <div
                                className='absolute bottom-0 left-0 h-[40%] w-[40%]'
                                style={{
                                    background: `linear-gradient(
                                        to top left,
                                        rgba(0,0,0,0) 0%,
                                        rgba(0,0,0,0) calc(50% - 1.8px),
                                        rgba(175,175,175,0.5) calc(50% - 1.3px),
                                        rgba(175,175,175,1) 50%,
                                        rgba(175,175,175,0.5) calc(50% + 1.3px),
                                        rgba(0,0,0,0) calc(50% + 1.8px),
                                        rgba(0,0,0,0) 100%
                                    )`
                                }}
                            />
                            <div
                                className='absolute top-0 right-0 h-[40%] w-[40%]'
                                style={{
                                    background: `linear-gradient(
                                        to top left,
                                        rgba(0,0,0,0) 0%,
                                        rgba(0,0,0,0) calc(50% - 1.8px),
                                        rgba(175,175,175,0.5) calc(50% - 1.3px),
                                        rgba(175,175,175,1) 50%,
                                        rgba(175,175,175,0.5) calc(50% + 1.3px),
                                        rgba(0,0,0,0) calc(50% + 1.8px),
                                        rgba(0,0,0,0) 100%
                                    )`
                                }}
                            />
                        </div>
                    </>
                )}
                <div className={clsx('w-full flex items-center justify-between mb-4', disabled && "brightness-50")}>
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
                            'ring-2 ring-offset-2 ring-offset-g-primary-900',
                            selected ? "bg-indigo-600 ring-indigo-600" : "ring-g-primary-600 bg-transparent"
                        )}
                    />
                </div>
                <div className={clsx('w-full h-full block text-sm', disabled && "brightness-50")}>
                    {children}
                </div>
            </button>
        </div>
    )
}