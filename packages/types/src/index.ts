export type ChildProps = {
    [x: string | number | symbol]: any;
    className: string | undefined;
    children: string | number | boolean | null | undefined | (string | Child)[];
}

export type Child = {
    type: string;
    props: ChildProps;
}

export type ServerComponentRequest = {
    time: number;
    id: string;
    props: Record<string, any>;
    fetches: Record<string, CapturedFetchFinished | CapturedFetchErrored>;
    timeline: { type: "log" | "event", content: string, time: number; }[];
    durationMs: number;
    error?: any;
    headers: [string, string][];
    url: string;
    children: Child[];
    /** TODO */
    payloadSizeBytes?: number;
    requestIp?: string;
};

export type CapturedFetchInitialized = {
    time: number;
    url: string;
    id: string;
    requestInit: RequestInit | undefined;
};

export type SerializedResponse = {
    ok: boolean;
    status: number;
    redirected: boolean;
    headers: Record<string, string>;
    text: string;
    statusText: string;
    size: number;
}

export type CapturedFetchFinished = {
    duration: number;
    response: SerializedResponse;
    error: undefined;
} & CapturedFetchInitialized;

export type CapturedFetchErrored = {
    duration: number;
    response: undefined;
    error: NonNullable<any>;
} & CapturedFetchInitialized;

export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type ItemData = {
    id: string;
    [x: string]: any;
}[];

// type BaseNode = {
//     fetches: Record<string, CapturedFetchInitialized | CapturedFetchFinished>;
//     timeline: { type: "log" | "event", content: string, time: number; }[];
//     durationMs: number;
//     error?: any;
//     time: number;
//     props: Record<string, any>;
// }

// type ClientNode = {
//     fetches: Record<string, CapturedFetchInitialized | CapturedFetchFinished>;
//     timeline: { type: "log" | "event", content: string, time: number; }[];
// } & BaseNode;

// type ServerNode = {
//     fetches: Record<string, CapturedFetchInitialized | CapturedFetchFinished>;
//     timeline: { type: "log" | "event", content: string, time: number; }[];
// } & BaseNode;

// type NestableNode<T extends BaseNode> = {
//     children?: T;
// } & T;

// type RootCapture = {
//     headers: [string, string][];
//     url: string;
//     id: string;
//     children: NestableNode<ServerNode | ClientNode>;
// }

export type NextAppServerComponentProps = {
    params?: Record<any, any>;
    [x: string]: any;
};
