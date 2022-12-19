/* eslint-disable no-irregular-whitespace */
import { headers, cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import type { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';
import { Fragment } from 'react';
import { 
    ServerComponentRequest, 
    OptionalExcept
} from './types';

type NextAppServerComponentProps = Record<any, any>;

const clocktime = Date.now;

let inDevEnvironment = false;

if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
}

export default function useBasis(
    componentGenerator: (props: NextAppServerComponentProps) => Promise<JSX.Element> | JSX.Element
) {
    const requestId = nanoid();
    const requestData: OptionalExcept<ServerComponentRequest, "id" | "logs" | "timeline" | "fetches"> = {
        id: requestId,
        logs: [],
        timeline: [],
        fetches: {}
    }

    // Must manually reference
    const _trueLog = console.log;
    const _trueError = console.error;
    const _trueInfo = console.info;
    const _trueWarn = console.warn;
    const _trueDebug = console.debug;
    const _trueDir = console.dir;


    function captureFetch(fetchId: string, url: string, init: RequestInit | undefined) {
        const time = clocktime();
        requestData.fetches[fetchId] = { 
            time, 
            url, 
            requestInit: init ,
            id: fetchId
        }
        requestData.timeline.push(`${time} – Fetch ${requestId} initiated to ${url}${init ? "" + JSON.stringify(init) : ""}`);
        process.env.BASIS_KEY;
    }

    function captureFetchResponse(fetchId: string, response: any) {
        const time = clocktime();
        requestData.fetches[fetchId] = { 
            ...requestData.fetches[fetchId],
            duration: time - requestData.fetches[fetchId].time,
            response
        }
        requestData.timeline.push(`${time} – Fetch ${requestId} responded ${JSON.stringify(response)}`);
        process.env.BASIS_KEY;
    }

    function captureLogParams(level: string, params: any[]) {
        const time = clocktime();
        requestData.timeline.push(`${time} – ${level.toUpperCase()} – ${params.join(" ")}`);
        process.env.BASIS_KEY;
    }

    let renderStartTime: number;
    function captureRequest(headers: [string, string][], cookies: RequestCookie[]) {
        const time = clocktime();
        renderStartTime = time;
        requestData.timeline.push(`${time} – Component request initiated with headers: ${JSON.stringify(headers)} and cookies ${JSON.stringify(cookies)}`);
        process.env.BASIS_KEY;
    }

    function captureRenderEnd() {
        const time = clocktime();
        const diff = time - renderStartTime!;
        requestData.durationMS = diff;
        requestData.timeline.push(`${time} – Transferring HTML to client. Render time: ${diff}`);
    }

    function captureRenderError(error: any) {
        const time = clocktime();
        requestData.timeline.push(`${time} – ERROR – ${JSON.stringify(error)}`);
        requestData.error = error || true;
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
        log: _trueLog,
        error: _trueError,
        info: _trueInfo,
        warn: _trueWarn,
        debug: _trueDebug,
        dir: _trueDir
    } as const;

    for (const [name, proc] of Object.entries(consoles)) {
        global.console[name as keyof typeof consoles] = function (...params) {
            captureLogParams(name, params);
            proc(...params);
        }
    }

    return async (props: NextAppServerComponentProps) => {
        captureRequest(
            [...headers().entries()],
            cookies().getAll()
        )

        const { params, ...restProps } = props;
        let component: undefined | JSX.Element;
        try {
            const maybePromise = componentGenerator(props);
            component = await maybePromise;
            captureRenderEnd();
        } catch (error) {
            captureRenderError(error);
            throw error;
        }

        return (
            <Fragment>
                {component}
            </Fragment>
        );
    };
}