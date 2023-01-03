import Root from '../components/Root';
import { useRouter } from 'next/router';
import { Snippet, Button } from '@geist-ui/core';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        router.push('/onboarding/welcome')
    }, [router])

    return (
        <></>
    );
}
