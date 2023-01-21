import useAsyncEffect from 'use-async-effect';
import { useState } from 'react';

export interface Config {
    editorFontSize: number;
    editorMinimapEnabled: boolean;
    editorWordWrapEnabled: boolean;
    insightsWordWrapEnabled: boolean;
    insightsFontSize: number;
    insightsIndexesEnabled: boolean;
    parseFindJsonEnabled: boolean;
    groupShowMS: boolean;
}

const defaultConfig: Config = {
    editorFontSize: 12,
    editorMinimapEnabled: false,
    editorWordWrapEnabled: true,
    insightsWordWrapEnabled: true,
    insightsFontSize: 12,
    insightsIndexesEnabled: false,
    parseFindJsonEnabled: true,
    groupShowMS: false,
};

let _configCache: Config | Record<string, any> = {};

export default function useConfig() {
    const [config, setConfig] = useState<Config | Record<string, any>>({ ..._configCache });

    function writeCache() {
        localStorage.setItem('nexray-options', JSON.stringify(_configCache));
    }

    useAsyncEffect(async (isActive) => {
        if (Object.keys(_configCache).length === 0) {
            try {
                _configCache = {
                    ...defaultConfig,
                    ...JSON.parse(localStorage.getItem('nexray-options') || '{}'),
                };
            } catch (error) {
                _configCache = defaultConfig;
                await writeCache();
            }

            setConfig({ ..._configCache });
        }
    }, []);

    return {
        initialized: !!config,
        get: <T extends keyof Config>(key: T): Config[T] | undefined => config[key],
        set: async <T extends keyof Config>(key: T, value: Config[T]) => {
            _configCache[key] = value;
            setConfig({ ..._configCache });
            writeCache();
        },
    };
}
