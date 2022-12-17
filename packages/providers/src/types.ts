export interface Provider {
    exists(): Promise<boolean>;
    getCredentials(): Promise<any>;
}