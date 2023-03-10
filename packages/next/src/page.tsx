import { headers } from 'next/headers';
import { ReactNode } from 'react';
import type { ServerComponentRequest, OptionalExcept, NextAppServerComponentProps, Child } from '@nexray/types';
import NexrayAPIClient from '@nexray/api-client';
import { _fetch, _consoles } from './globalCache';
import { deepMap } from 'react-children-utilities';
import * as reactIs from 'react-is';
import serializeResponse from './serializeResponse';
import { NexrayComponentReturnType, NexrayComponentReturnTypePromise } from './jsxTypes';
import { nanoid } from 'nanoid';
import { IConfig, deriveConfig } from './config';

const endpoint = process.env['NEXRAY_ENDPOINT'] || 'http://localhost:4296';
const ops = new NexrayAPIClient(_fetch, endpoint);

export default function page<T extends NextAppServerComponentProps | undefined>(
    componentGenerator: (props: T) => NexrayComponentReturnType,
    config?: Partial<IConfig>
) {
    const safeConfig = deriveConfig(config);
    if (!safeConfig.enabled) {
        return componentGenerator;
    }

    return async (props: T) => {
        const fetchReadPromises: Promise<any>[] = [];
        const requestId = headers().get('nexray-mw-id');
        const requestUrl = headers().get('nexray-mw-url');
        if (requestId === null || requestUrl === null) {
            throw new Error(
                'Nexray could not find the required headers to process this request. ' +
                    'Please make sure created file called `middleware.(j|t)s` in your project ' +
                    "and add the line `export { middleware } from '@nexray/next'`.",
            );
        }
        const requestData: OptionalExcept<ServerComponentRequest, 'id' | 'timeline' | 'fetches' | 'url'> = {
            id: requestId,
            timeline: [],
            fetches: {},
            url: requestUrl,
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
                content: `${time} - Page returned ${
                    children === null ? 'null' : 'undefined'
                }. No page to render to HTML and send to client Render time: ${diff}`,
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
            // Next fetch implementation: https://github.com/vercel/next.js/blob/canary/packages/next/src/server/node-polyfill-fetch.ts
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
