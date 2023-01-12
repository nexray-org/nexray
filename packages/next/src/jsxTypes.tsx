export type NexrayComponentReturnTypeSync = JSX.Element | null | undefined;
export type NexrayComponentReturnTypePromise = Promise<NexrayComponentReturnTypeSync>;

export type NexrayComponentReturnType = NexrayComponentReturnTypeSync | NexrayComponentReturnTypePromise;
