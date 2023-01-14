import { headers } from 'next/headers';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import type { ServerComponentRequest, OptionalExcept, NextAppServerComponentProps, Child } from '@nexray/types';
import NexrayAPIClient from '@nexray/api-client';
import path from 'path'
import { _fetch, _consoles } from './globalCache';
import { deepMap } from 'react-children-utilities';
import * as reactIs from 'react-is';
import serializeResponse from './serializeResponse';
import { NexrayComponentReturnType, NexrayComponentReturnTypePromise } from './jsxTypes';
import { fileURLToPath } from 'url';

let inDevEnvironment = false;
let endpoint = process.env['NEXRAY_ENDPOINT'] || '';

if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
    if (!endpoint) {
        // check dev endpoint
        endpoint = 'http://localhost:4296';
    }
} else {
    // Check for remote db config with process.env.NEXRAY_KEY;
}

const ops = new NexrayAPIClient(_fetch, endpoint);
ops.testEndpoint().then((res) => _consoles.log(`Tested local endpoint with response: ${res}`));

export default function nexrayPage<T extends NextAppServerComponentProps | undefined>(componentGenerator: (props: T) => NexrayComponentReturnType) {
    return async (props: T) => {

        // .next/server/app/...
        const absoluteFsUrl = path.relative(process.cwd(), __dirname);
        const relativeFsUrl = absoluteFsUrl.includes(`${path.sep}app${path.sep}`) ?
            absoluteFsUrl.split(`${path.sep}app`).pop()!
            :
            path.sep;

        const fetchReadPromises: Promise<any>[] = [];
        const requestId = nanoid();
        const requestData: OptionalExcept<ServerComponentRequest, 'id' | 'timeline' | 'fetches' | 'url'> = {
            id: requestId,
            timeline: [],
            fetches: {},
            url: relativeFsUrl,
        };

        function captureFetch(fetchId: string, url: string, init: RequestInit | undefined) {
            const time = Date.now();
            requestData.fetches[fetchId] = {
                time,
                url,
                requestInit: init,
                id: fetchId,
            } as any;
            requestData.timeline.push({
                content: `${time} - Fetch ${requestId} initiated to ${url}${init ? '' + JSON.stringify(init) : ''}`,
                type: 'event',
                time,
            });
        }

        function captureFetchResponseSuccess(fetchId: string, response: Response) {
            const time = Date.now();
            const responseClone = response.clone();
            const serializeResponsePromise = async () => {
                const serializedResponse = await serializeResponse(responseClone);
                requestData.fetches[fetchId] = {
                    ...requestData.fetches[fetchId],
                    duration: time - requestData.fetches[fetchId].time,
                    response: serializedResponse,
                };
            };
            fetchReadPromises.push(serializeResponsePromise());
            requestData.timeline.push({
                content: `${time} - Fetch ${requestId} responded ${JSON.stringify(responseClone)}`,
                type: 'event',
                time,
            });
        }

        function captureFetchResponseError(fetchId: string, error: any) {
            const time = Date.now();
            requestData.fetches[fetchId] = {
                ...requestData.fetches[fetchId],
                duration: time - requestData.fetches[fetchId].time,
                error,
            };
            requestData.timeline.push({
                content: `${time} - Fetch ${requestId} errored ${JSON.stringify(error)}`,
                type: 'event',
                time,
            });
        }

        function captureLogParams(level: string, consoleParams: any[]) {
            const time = Date.now();
            requestData.timeline.push({
                content: `${time} - ${level.toUpperCase()} - ${consoleParams.join(' ')}`,
                type: 'log',
                time,
            });
        }

        let renderStartTime: number;
        function captureRenderRequest(headers: [string, string][], componentProps: NextAppServerComponentProps) {
            const time = Date.now();
            renderStartTime = time;
            requestData.headers = headers;
            requestData.props = componentProps;
            requestData.time = time;
            requestData.timeline.push({
                content: `${time} - Component request initiated`,
                type: 'event',
                time,
            });
        }

        function captureRenderEnd(children: Child[]) {
            const time = Date.now();
            const diff = time - renderStartTime!;
            requestData.durationMs = diff;
            requestData.children = children;
            requestData.timeline.push({
                content: `${time} - Transferring HTML to client. Render time: ${diff}`,
                type: 'event',
                time,
            });
            Promise.all(fetchReadPromises).then((_) => ops.captureRequest(requestData as ServerComponentRequest));
        }

        function captureRenderEmpty(children: null | undefined) {
            const time = Date.now();
            const diff = time - renderStartTime!;
            requestData.durationMs = diff;
            requestData.timeline.push({
                content: `${time} - Page returned ${children === null ? "null" : "undefined"}. No page to render to HTML and send to client Render time: ${diff}`,
                type: 'event',
                time,
            });
            Promise.all(fetchReadPromises).then((_) => ops.captureRequest(requestData as ServerComponentRequest));
        }

        function captureRenderError(error: any) {
            const time = Date.now();
            requestData.timeline.push({
                content: `${time} - ERROR - ${JSON.stringify(error)}`,
                type: 'event',
                time,
            });
            requestData.error = error || true;
            Promise.all(fetchReadPromises).then((_) => ops.captureRequest(requestData as ServerComponentRequest));
        }

        if (!(global as any).fetch['NEXRAY_ATTACHED']) {
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

                try {
                    const _rawRes = await _fetch(...args);
                    captureFetchResponseSuccess(fetchId, _rawRes);
                    return _rawRes;
                } catch (error) {
                    captureFetchResponseError(fetchId, error);
                    throw error;
                }
            };
            (global as any).fetch['NEXRAY_ATTACHED'] = true;
        }

        for (const [name, proc] of Object.entries(_consoles)) {
            global.console[name as keyof typeof _consoles] = function (...consoleParams) {
                captureLogParams(name, consoleParams);
                proc(...consoleParams);
            };
        }

        // Forgetting cookies for now
        captureRenderRequest([...headers().entries()], props || {});

        let component: Exclude<NexrayComponentReturnType, NexrayComponentReturnTypePromise>;
        try {
            const maybePromise = componentGenerator(props);
            component = await maybePromise;
            if (component === null || component === undefined) {
                captureRenderEmpty(component);
            } else {
                const childrenProps = deepMap(component, (child) => {
                    if (reactIs.isElement(child)) {
                        if (typeof child.type === 'function') {
                            return { type: (child as any)['nexrayName'] || 'Component', props: child.props } as ReactNode;
                        } else {
                            return { type: child.type, props: child.props } as ReactNode;
                        }
                    }
                }) as Child[];
                captureRenderEnd(childrenProps);
            }
        } catch (error) {
            captureRenderError(error);
            throw error;
        }

        return component;
    };
}
