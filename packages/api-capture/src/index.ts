import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { Handler as ExpressHandler } from 'express';
import type { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import type { Entry } from './har';
import type { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import url from 'url';
import { getReasonPhrase } from 'http-status-codes';

const middleware = (_req: NextApiRequest, res: NextApiResponse) => {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        console.log("%s : %fms", elapsedTimeInMs);
    })
}

const joinStringArrayValues = (value: string | string[] | number) => {
    if (typeof value === "string" || typeof value === "number") {
        return "" + value;
    } else {
        return value.join(",")
    }
}

function convertHeadersToHar(headers: IncomingHttpHeaders | OutgoingHttpHeaders) {
    return Object.entries(headers).map(([name, value]) => ({
        name,
        value: joinStringArrayValues(value || "")
    }));
}

const expressResInterceptor = (res: Parameters<ExpressHandler>[1], send: () => any) => (content: any) => {
    (res as any).contentBody = content;
    res.send = send;
    res.send(content);
}

export const express: ExpressHandler = (req, res, next) => {
    // https://github.com/watson/request-stats/blob/master/lib/request.js
    // https://github.com/idoco/node-express-har-capture/blob/master/index.js
    // https://medium.com/@jonathan.turnock/logging-express-request-response-content-ead42620d4e5
    const harEntry: Partial<Entry> = {
        startedDateTime: new Date().toISOString(),
        request: {
            bodySize: req.headers['content-length'] ? +req.headers['content-length'] : -1,
            cookies: req.cookies,
            headers: convertHeadersToHar(req.headers),
            headersSize: Buffer.byteLength(req.rawHeaders.join("\n"), 'utf-8'),
            httpVersion: req.httpVersion,
            method: req.method,
            url: `${req.protocol}://${req.hostname}${req.originalUrl}`,
            queryString: Object.entries(url.parse(req.url, true).query).map(([name, value]) => ({
                name,
                value: joinStringArrayValues(value || "")
            })),
        },
        serverIPAddress: req.headers['x-forwarded-for'] ? joinStringArrayValues(req.headers['x-forwarded-for']) : req.connection.remoteAddress
    };
    const startHrTime = process.hrtime();
    // Listen in on body parsing
    // NOTE: We do not resume the stream, as it would make actual parsers
    // miss out on the data. On the down-side, it doesn't capture a body
    // when the body isn't used later.
    let requestBodySize = 0;
    const requestBodyParts: Uint8Array[] = [];
    let isRequestBodyParsed = false;
    let finalRequestBodyParsed = "";

    req.on('data', (chunk) => {
        isRequestBodyParsed = true;
        requestBodySize += chunk.length;
        requestBodyParts.push(chunk);
    })

    req.on('end', (chunk: any) => {
        if (chunk) {
            isRequestBodyParsed = true;
            requestBodySize += chunk.length;
            requestBodyParts.push(chunk);
        }

        if (requestBodyParts.length <= 0) {
            return;
        }

        if (Buffer.isBuffer(requestBodyParts[0])) {
            finalRequestBodyParsed = Buffer.concat(requestBodyParts).toString('utf8');
        }
        else {
            finalRequestBodyParsed = requestBodyParts.join("");
        }
    });

    const interceptors = {
        send: res.send,
        // sendStatus: res.sendStatus,
        // json: res.json
        // TODO: Do other functions need to be intercepted?
    };

    (res as any).send = expressResInterceptor(res, res.send);

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        if (harEntry.request && isRequestBodyParsed) {
            harEntry.request.bodySize = requestBodySize;
            harEntry.request.postData = {
                mimeType: req.headers['content-type'] || "",
                text: finalRequestBodyParsed,
            }
        }
        harEntry.response = { 
            status: res.statusCode,
            redirectURL: req.originalUrl,
            httpVersion: req.httpVersion,
            cookies: req.cookies,
            content: (res as any).contentBody,
            headers: convertHeadersToHar(res.getHeaders()),
            bodySize: (res as any).contentBody.length,
            headersSize: Buffer.byteLength(convertHeadersToHar(res.getHeaders()).map(({ name, value }) => `${name}: ${value}\n`).join("\n"), 'utf-8'),
            statusText: getReasonPhrase(res.statusCode),
        };
        harEntry.time = elapsedTimeInMs;
        console.log("%s : %fms", elapsedTimeInMs);
    });
    
    next();
};

const _fastifyHandler: FastifyPluginCallback = (fastify, options, next) => { null; }

export const fastify = fp(_fastifyHandler, { name: "basis-capture" })

export function nextCapture(handler: NextApiHandler): NextApiHandler {
    return (_req: NextApiRequest, res: NextApiResponse) => {
        middleware(_req, res);
        return handler(_req, res);
    }
}