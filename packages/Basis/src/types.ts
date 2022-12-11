export type SchemaCategory = 'log group' | 'request';

export interface SchemaData {
    'log group': {}[];
    request: {
        id: string;
        url: string;
        type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
        status: {
            code: number;
            reason: string;
        };
        timestamp: string;
        durationMs: number;
        payloadSizeBytes: number;
        requestIp: string;
        contents: string;
    }[];
}

export type ItemData = {
    id: string;
    [x: string]: any;
}[];
