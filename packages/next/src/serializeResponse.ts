import { SerializedResponse } from "@basis/types";

export default async function serializeResponse(response: Response): Promise<SerializedResponse> {
    const text = await response.text();
    return {
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        text
    }
}