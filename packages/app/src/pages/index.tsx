import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UiContext } from '../context/UiContext';
import useApi from '../hooks/useApi';

export default function Index() {
    const router = useRouter();
    useApi(process.env['NEXRAY_ENDPOINT'] || 'http://localhost:4296', 1000);
    const { didDataFirstRun, data } = useContext(UiContext);

    useEffect(() => {
        if (didDataFirstRun) {
            if (data.length > 0) {
                router.push('/analyze')
            } else {
                router.push('/onboarding/welcome')
            }
        }
    }, [didDataFirstRun, data, router])

    return (
        <></>
    );
}
