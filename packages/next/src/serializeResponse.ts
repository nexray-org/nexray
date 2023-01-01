import { SerializedResponse } from "@basis/types";

// https://stackoverflow.com/a/23329386
function byteLength(str: string) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
}

export default async function serializeResponse(response: Response): Promise<SerializedResponse> {
    const text = await response.text();
    // https://alexewerlof.medium.com/converting-fetchs-response-headers-to-a-plain-serializable-javascript-object-51fd3ee0e090
    const strHeaders = Object.fromEntries(response.headers.entries());
    return {
        headers: strHeaders,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        text,
        size: byteLength(text)
    }
}