import useAsyncEffect from 'use-async-effect';
import type { fs as fsType, path as pathType } from '@tauri-apps/api';
import { useRef, useState } from 'react';

export interface Config {
    editorFontSize: number;
    editorMinimapEnabled: boolean;
    editorWordWrapEnabled: boolean;
    insightsWordWrapEnabled: boolean;
    insightsFontSize: number;
    insightsIndexesEnabled: boolean;
    parseFindJsonEnabled: boolean;
    parseCustomFindJsonRoute: string;
}

const defaultConfig: Config = {
    editorFontSize: 12,
    editorMinimapEnabled: false,
    editorWordWrapEnabled: true,
    insightsWordWrapEnabled: true,
    insightsFontSize: 12,
    insightsIndexesEnabled: false,
    parseFindJsonEnabled: true,
    parseCustomFindJsonRoute: '',
};

let _configCache: Config | Record<string, any> = {};

export default function useConfig() {
    const [config, setConfig] = useState<Config | Record<string, any>>({ ..._configCache });
    const libsRef = useRef<{ fs: typeof fsType; path: typeof pathType }>();
    const configFilePathRef = useRef<string>();

    async function writeCache() {
        await libsRef.current?.fs.writeTextFile(configFilePathRef.current!, JSON.stringify(_configCache, null, 2));
    }

    useAsyncEffect(async (isActive) => {
        // https://github.com/tauri-apps/tauri/issues/5518#issuecomment-1297586215
        const [fs, path] = await Promise.all([import('@tauri-apps/api/fs'), import('@tauri-apps/api/path')]);

        libsRef.current = {
            fs,
            path,
        };

        if (Object.keys(_configCache).length === 0) {
            const configRootDir = await path.appConfigDir();
            try {
                const existingConfigFileRoot = await fs.exists(configRootDir);
                if (!existingConfigFileRoot) {
                    throw new Error();
                }
            } catch (_) {
                await fs.createDir(configRootDir, { recursive: true });
            }

            configFilePathRef.current = await path.join(configRootDir, 'config.json');
            try {
                const existingConfigFilePath = await fs.exists(configFilePathRef.current);
                if (!existingConfigFilePath) {
                    throw new Error();
                }
                _configCache = {
                    ...defaultConfig,
                    ...JSON.parse(await fs.readTextFile(configFilePathRef.current)),
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
            await writeCache();
        },
    };
}
