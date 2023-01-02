import { ServerComponentRequest } from '@nexray/types';

export default class NexrayAPIClient {
    isEndpointUp: boolean | undefined = undefined;
    constructor(
        private _fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
        private endpoint: string,
    ) {}

    async testEndpoint() {
        try {
            const endpointUp = await this._fetch(`${this.endpoint}/status`);
            if (await endpointUp.text()) {
                this.isEndpointUp = true;
                return true;
            }
        } catch (error) {
            this.isEndpointUp = false;
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

    async readRequests(afterTime?: number) {
        const _res = await this._fetch(`${this.endpoint}/requests${afterTime ? "?after=" + afterTime : ""}`);
        return _res.json() as Promise<ServerComponentRequest[]>;
    }
}
