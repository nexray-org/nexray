import { ServerComponentRequest } from '@basis/types';

export default class BasisAPIClient {
    constructor(
        private _fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
        private endpoint: string,
    ) {}

    async testEndpoint() {
        try {
            const endpointUp = await this._fetch(`${this.endpoint}/status`);
            if (await endpointUp.text()) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async captureRequest(data: ServerComponentRequest) {
        await this._fetch(`${this.endpoint}/capture-request`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ data })
        });
    }
}
