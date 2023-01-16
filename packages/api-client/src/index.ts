import { ServerComponentRequest } from '@nexray/types';

type FetchType = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export default class NexrayAPIClient {
    isEndpointUp: boolean | undefined = undefined;
    constructor(private _fetch: FetchType, private endpoint: string) {}

    fetchWithDetect: FetchType = async (...params) => {
        try {
            const res = await this._fetch(...params);
            this.isEndpointUp = true;
            return res;
        } catch (error) {
            this.isEndpointUp = false;
            throw error;
        }
    };

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
        await this.fetchWithDetect(`${this.endpoint}/capture-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
    }

    async readRequests(afterTime?: number) {
        const _res = await this.fetchWithDetect(`${this.endpoint}/requests${afterTime ? '?after=' + afterTime : ''}`);
        return _res.json() as Promise<ServerComponentRequest[]>;
    }

    async deleteAllLogs() {
        const deleteAllRes = await this.fetchWithDetect(`${this.endpoint}/delete-all-logs`, {
            method: 'POST',
        });
        if (await deleteAllRes.text()) {
            return true;
        } else {
            return false;
        }
    }
}
