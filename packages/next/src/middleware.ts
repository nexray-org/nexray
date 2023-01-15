import { NextRequest, NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import { nanoid } from 'nanoid';

function setHeaders(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    if (process.env.NODE_ENV === "development") { // TODO: optional prod
        requestHeaders.set("nexray-mw-url", request.url);
        requestHeaders.set("nexray-mw-id", nanoid());
    }
    return requestHeaders;
}

export const withMiddleware = (init?: Parameters<typeof NextResponse.next>[0]): NextMiddleware => (request, event) => {
    const response = NextResponse.next({
        ...init,
        request: {
            headers: setHeaders(request),
        },
    });

    return response;
}

export const middleware = withMiddleware();
