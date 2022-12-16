export interface Provider {
    exists(): Promise<boolean>;
}