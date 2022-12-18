import { headers, cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import type { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';

const clocktime = Date.now;

export default function useBasis() {
    const requestId = nanoid();

    function captureFetch(fetchId: string, url: string, init: RequestInit | undefined) {
        const time = clocktime();
        console.log("CAPTURED FETCH AT", time, ` – REQUEST ${requestId}`);
        process.env.BASIS_KEY;
    }
    
    function captureFetchResponse(fetchId: string, response: any) {
        const time = clocktime();
        console.log("CAPTURED FETCH RESPONSE AT", time, ` – REQUEST ${requestId}`);
        process.env.BASIS_KEY;
    }
    
    function captureLogParams(level: string, params: any[]) {
        const time = clocktime();
        console.log(`CAPTURED ${level.toUpperCase()} AT`, time, ` – REQUEST ${requestId}`);
        process.env.BASIS_KEY;
    }
    
    function captureRequest(headers: [string, string][], cookies: RequestCookie[]) {
        const time = clocktime();
        console.log(`CAPTURED THIS REQUEST AT`, time, ` – REQUEST ${requestId}`);
        process.env.BASIS_KEY;
    }

    // Next fetch implementation: https://github.com/vercel/next.js/blob/canary/packages/next/server/node-polyfill-fetch.js
    const _fetch = fetch;
    global.fetch = async (...args) => {
        let url: string;
        if (typeof args[0] === "string") {
            url = args[0]
        } else {
            url = (args[0] as Request).url;
        }

        const fetchId = nanoid();
        captureFetch(
            fetchId,
            url,
            args[1]
        )

        const _rawRes = await _fetch(...args);
        captureFetchResponse(fetchId, _rawRes);
        return _rawRes;
    }

    const consoles = {
        log: console.log,
        error: console.error,
        info: console.info,
        warn: console.warn,
        debug: console.debug,
        dir: console.dir
    } as const;

    // for (const [name, proc] of Object.entries(consoles)) {
    //     global.console[name as keyof typeof consoles] = (...params) => {
    //         captureLogParams(name, params);
    //         proc(...params);
    //     }
    // }

    captureRequest(
        [...headers().entries()],
        cookies().getAll()
    )
}