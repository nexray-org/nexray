import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { UiContext } from '../context/UiContext';
import APIClient from '@nexray/api-client';

interface IApiContext {
    didDataFirstRun: boolean;
    apiClient: APIClient | undefined;
}

export const ApiContext = createContext<IApiContext>({} as IApiContext);

export function ApiProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const [didDataFirstRun, setDidDataFirstRun] = useState<boolean>(false);
    const { setData } = useContext(UiContext);
    const apiClientRef = useRef<APIClient>();
    const intervalRef = useRef<NodeJS.Timer>();

    useEffect(() => {
        safeBoot(process.env['NEXRAY_ENDPOINT'] || 'http://localhost:4296');
        return () => intervalRef.current && clearInterval(intervalRef.current);
    }, []);

    const fetchWrapper = (input: RequestInfo | URL, init?: RequestInit | undefined) => window.fetch(input, init);
    
    async function _start(endpoint: string, refreshInterval: number) {
        apiClientRef.current = new APIClient(fetchWrapper, endpoint);

        const apiUp = await apiClientRef.current.testEndpoint();
        if (!apiUp) {
            // TODO: alert user of dead api
        }

        let _lastTimeCache: number | undefined = undefined;
        const _data = await apiClientRef.current.readRequests();
        if (_data.length > 0) {
            _lastTimeCache = _data[0].time;
            setData(_data);
        }
        setDidDataFirstRun(true);

        // Clear the old interval if it exists
        intervalRef.current && clearInterval(intervalRef.current)
        let intervalLock = false;
        intervalRef.current = setInterval(() => {
            if (intervalLock) {
                return;
            }
            intervalLock = true;
            (async () => {
                try {
                    const _data = await apiClientRef.current!.readRequests(_lastTimeCache);
                    if (_data.length > 0) {
                        _lastTimeCache = _data[0].time;
                        setData((prev) => [..._data, ...prev]);
                    }
                } catch (error) {
                    null;
                } finally {
                    intervalLock = false;
                }
            })();
        }, refreshInterval);
    }

    const safeBoot = (endpoint: string) => !intervalRef.current && _start(endpoint, 1000)

    return (
        <ApiContext.Provider
            value={{
                didDataFirstRun,
                apiClient: apiClientRef.current
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}