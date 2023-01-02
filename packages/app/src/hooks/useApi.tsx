import { useContext, useRef } from 'react';
import useAsyncEffect from 'use-async-effect';
import { UiContext } from '../context/UiContext';
import APIClient from '@nexray/api-client';

export default function useApi(endpoint: string, refreshInterval: number) {
    // Can't directly pass fetch to api-client on safari
    const fetchWrapper = (input: RequestInfo | URL, init?: RequestInit | undefined) => window.fetch(input, init);
    const { setData } = useContext(UiContext);
    const apiClientRef = useRef(new APIClient(fetchWrapper, endpoint));

    useAsyncEffect(async isActive => {
        const apiUp = await apiClientRef.current.testEndpoint();
        if (!apiUp) {
            // TODO: alert user of dead api
        }
        
        let _lastTimeCache: number;
        const _data = await apiClientRef.current.readRequests();
        _lastTimeCache = _data[0].time;
        if (!isActive()) {
            return;
        }
        setData(_data)

        let intervalLock = false;
        const dataInterval = setInterval(() => {
            if (intervalLock) {
                return;
            }
            intervalLock = true;
            (async () => {
                try {
                    const _data = await apiClientRef.current.readRequests(_lastTimeCache);
                    _lastTimeCache = _data[0].time;
                    setData(prev => [..._data, ...prev]);
                } catch (error) {
                    null;
                } finally {
                    intervalLock = false;
                }
            })()
        }, refreshInterval);

        return dataInterval;
    }, (result) => { result && clearTimeout(result); }, [])
}
