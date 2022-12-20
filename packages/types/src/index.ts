export type ComponentRequest = {
    type: "server" | "client";
    time: number;
    id: string;
    props: Record<string, any>;
}

export type ServerComponentRequest = {
    fetches: Record<string, CapturedFetchInitialized | CapturedFetchFinished>;
    timeline: { type: "log" | "event", content: string, time: number; }[];
    durationMs: number;
    error?: any;
    headers: [string, string][];
    url: string;
    type: "server";
    /** TODO */
    payloadSizeBytes?: number;
    requestIp?: string;
} & ComponentRequest;

export type CapturedFetchInitialized = {
    time: number;
    url: string;
    id: string;
    requestInit: RequestInit | undefined;
};

export type CapturedFetchFinished = {
    duration: number;
    response: any;
} & CapturedFetchInitialized;

export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type ItemData = {
    id: string;
    [x: string]: any;
}[];
