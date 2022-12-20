import { headers } from 'next/headers';
import { nanoid } from 'nanoid';
import { Fragment } from 'react';
import type { ServerComponentRequest, OptionalExcept } from '@basis/types';
import * as ops from './db';
import path from 'path';

type NextAppServerComponentProps = Record<any, any>;

const clocktime = Date.now;

let inDevEnvironment = false;

if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
} else {
    // Check for remote db config with process.env.BASIS_KEY;
}

const _fetch = fetch;

// Must manually reference
const _trueLog = console.log;
const _trueError = console.error;
const _trueInfo = console.info;
const _trueWarn = console.warn;
const _trueDebug = console.debug;
const _trueDir = console.dir;

const consoles = {
    log: _trueLog,
    error: _trueError,
    info: _trueInfo,
    warn: _trueWarn,
    debug: _trueDebug,
    dir: _trueDir,
} as const;

export default function useBasis(componentGenerator: (props: NextAppServerComponentProps) => Promise<JSX.Element> | JSX.Element) {
    // .next/server/app/...
    const absoluteFsUrl = path.relative(process.cwd(), __dirname);
    const relativeFsUrl = absoluteFsUrl.includes("/app/") ? absoluteFsUrl.split("/app").pop()! : absoluteFsUrl;

    return async (props: NextAppServerComponentProps) => {
        const requestId = nanoid();
        const requestData: OptionalExcept<ServerComponentRequest, 'id' | 'timeline' | 'fetches' | 'url' | 'type'> = {
            id: requestId,
            timeline: [],
            fetches: {},
            url: relativeFsUrl,
            type: "server"
        };

        function captureFetch(fetchId: string, url: string, init: RequestInit | undefined) {
            const time = clocktime();
            requestData.fetches[fetchId] = {
                time,
                url,
                requestInit: init,
                id: fetchId,
            };
            requestData.timeline.push({
                content: `${time} - Fetch ${requestId} initiated to ${url}${init ? '' + JSON.stringify(init) : ''}`,
                type: "event",
                time
            });
        }

        function captureFetchResponse(fetchId: string, response: any) {
            const time = clocktime();
            requestData.fetches[fetchId] = {
                ...requestData.fetches[fetchId],
                duration: time - requestData.fetches[fetchId].time,
                response,
            };
            requestData.timeline.push({
                content: `${time} - Fetch ${requestId} responded ${JSON.stringify(response)}`,
                type: "event",
                time
            });
        }

        function captureLogParams(level: string, params: any[]) {
            const time = clocktime();
            requestData.timeline.push({
                content: `${time} - ${level.toUpperCase()} - ${params.join(' ')}`,
                type: "log",
                time
            });
        }

        let renderStartTime: number;
        function captureRequest(headers: [string, string][]) {
            const time = clocktime();
            renderStartTime = time;
            requestData.headers = headers;
            requestData.time = time;
            requestData.timeline.push({
                content: `${time} - Component request initiated with headers: ${JSON.stringify(headers)}`,
                type: "event",
                time
            });
        }

        function captureRenderEnd() {
            const time = clocktime();
            const diff = time - renderStartTime!;
            requestData.durationMs = diff;
            requestData.timeline.push({
                content: `${time} - Transferring HTML to client. Render time: ${diff}`,
                type: "event",
                time
            });
            ops.insertRequest(requestData as ServerComponentRequest);
        }

        function captureRenderError(error: any) {
            const time = clocktime();
            requestData.timeline.push({
                content: `${time} - ERROR - ${JSON.stringify(error)}`,
                type: "event",
                time
            });
            requestData.error = error || true;
            ops.insertRequest(requestData as ServerComponentRequest);
        }

        // Next fetch implementation: https://github.com/vercel/next.js/blob/canary/packages/next/server/node-polyfill-fetch.js
        global.fetch = async (...args) => {
            let url: string;
            if (typeof args[0] === 'string') {
                url = args[0];
            } else {
                url = (args[0] as Request).url;
            }

            const fetchId = nanoid();
            captureFetch(fetchId, url, args[1]);

            const _rawRes = await _fetch(...args);
            captureFetchResponse(fetchId, _rawRes);
            return _rawRes;
        };

        for (const [name, proc] of Object.entries(consoles)) {
            global.console[name as keyof typeof consoles] = function (...params) {
                captureLogParams(name, params);
                proc(...params);
            };
        }

        // Forgetting cookies for now
        captureRequest([...headers().entries()]);

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

        return <Fragment>{component}</Fragment>;
    };
}
