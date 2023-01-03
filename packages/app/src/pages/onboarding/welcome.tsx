import Root from '../../components/Root';
import { Snippet } from '@geist-ui/core';
import { Disclosure } from '@headlessui/react'
import { BsChevronUp } from 'react-icons/bs';
import clsx from 'clsx';

export default function Welcome() {

    const steps = [
        {
            panel: "Step 1. Install package",
            children: (
                <div className='tracking-normal'>
                    <Snippet text="npm i @nexray/next" width="300px" toastType='default' />
                </div>
            ),
            defaultOpen: true
        },
        {
            panel: "Step 2. Wrap pages",
            children: <span>Hello WOrld</span>
        }
    ]

    return (
        <Root>
            <div className='flex-center'>
                <div className='w-full max-w-[600px]'>
                    <h2 className='text-lg font-semibold'>Observability for Next.js 13 server components</h2>
                    {steps.map((ele) => (
                        <Disclosure defaultOpen={!!ele.defaultOpen}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button
                                        className={clsx(
                                            "mt-6 rounded-sm first-of-type:mt-0 flex w-full justify-between bg-g-primary-800 pl-3 pr-4 py-2 text-left text-sm font-medium hover:bg-g-primary-700",
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
                    <span className='text-sm text-g-primary-500'>Install</span>
                    <h3 className='text-lg'>Install the Nexray package in your Next.js project</h3>
                </div>
            </div>
        </Root>
    );
}