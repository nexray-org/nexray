import Root from '../../components/Root';
import { Snippet, Button } from '@geist-ui/core';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

export default function One() {
    return (
        <Root>
        <div className='flex-center'>
            <div className='w-full max-w-[400px]'>
                <span className='text-sm text-g-primary-500'>Step 1 of 3</span>
                <h3 className='text-lg'>Install the Nexray package in your Next.js project</h3>
                <div className='tracking-normal'>
                    <Snippet text="npm i @nexray/next" width="300px" toastType='default' />
                </div>
                <Link href={"/onboarding/1"}>
                    <Button auto iconRight={<BsArrowRight />}>Continue</Button>
                </Link>
            </div>
        </div>
    </Root>
    )
}