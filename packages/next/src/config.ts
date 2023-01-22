export interface IConfig {
    enabled: boolean;
}

const defaultConfig: IConfig = {
    enabled: process.env.NODE_ENV === "development"
}

export const deriveConfig = (inConfig: Partial<IConfig> | undefined) => ({ ...defaultConfig, ...inConfig })
