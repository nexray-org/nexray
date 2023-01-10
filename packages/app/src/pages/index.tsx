import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import { UiContext } from '../context/UiContext';

export default function Index() {
    const router = useRouter();
    const { data } = useContext(UiContext);
    const { didDataFirstRun } = useContext(ApiContext);

    useEffect(() => {
        if (didDataFirstRun) {
            if (data.length > 0) {
                router.push('/inspect')
            } else {
                router.push('/onboarding/welcome')
            }
        }
    }, [didDataFirstRun, data, router])

    return (
        <></>
    );
}
