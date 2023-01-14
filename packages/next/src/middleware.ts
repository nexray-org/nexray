import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from 'nanoid';

export function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers);
    if (process.env.NODE_ENV === "development") { // TODO: optional prod
        requestHeaders.set("nexray-mw-url", request.url);
        requestHeaders.set("nexray-mw-id", nanoid());
    }

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return response;
}