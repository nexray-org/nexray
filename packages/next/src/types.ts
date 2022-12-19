export type ServerComponentRequest = {
    fetches: Record<string, CapturedFetchInitialized | CapturedFetchFinished>;
    timeline: string[];
    logs: [];
    durationMS: number;
    id: string;
    props: Record<string, any>;
    error?: any;
};

export type CapturedFetchInitialized = {
    time: number;
    url: string;
    id: string;
    requestInit: RequestInit | undefined;
}

export type CapturedFetchFinished = {
    duration: number;
    response: any;
} & CapturedFetchInitialized;

export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;