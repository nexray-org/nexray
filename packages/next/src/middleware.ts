import { NextRequest, NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';
import { nanoid } from 'nanoid';
import { deriveConfig, IConfig } from './config';

function setHeaders(request: NextRequest) {
    // https://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
    // https://gist.github.com/jlong/2428561
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('nexray-mw-url', request.nextUrl.pathname + request.nextUrl.search);
    requestHeaders.set('nexray-mw-id', nanoid());
    return requestHeaders;
}

export const withMiddleware =
    (init?: Parameters<typeof NextResponse.next>[0], config?: IConfig): NextMiddleware =>
        (request, event) => {
            const safeConfig = deriveConfig(config);
            if (
                !safeConfig.enabled
                ||
                request.nextUrl.pathname.startsWith('/_next')
                ||
                request.nextUrl.pathname.includes('/api/')
            ) {
                return;
            }

            return NextResponse.next({
                ...init,
                request: {
                    headers: setHeaders(request),
                },
            });
        };

export const middleware = withMiddleware();
