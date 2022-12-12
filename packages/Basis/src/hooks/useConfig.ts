import useAsyncEffect from 'use-async-effect';
import { fs, path } from '@tauri-apps/api';
import { useState } from 'react';

export interface Config {
    editorFontSize: number;
    editorMinimapScale: number;
    editorMinimapEnabled: boolean;
    editorWordWrapEnabled: boolean;
}

const defaultConfig: Config = {
    editorFontSize: 12,
    editorMinimapScale: 0.75,
    editorMinimapEnabled: false,
    editorWordWrapEnabled: false,
};

let _config: Config;

export default function useConfig() {
    const [isInitialized, setIsInitialized] = useState<boolean>(() => !!_config);

    useAsyncEffect(async (isActive) => {
        if (!_config) {
            const configRootDir = await path.appConfigDir();
            const configPath = await path.join(configRootDir, 'config.json');
            const existingConfigFile = await fs.exists(configPath);
            if (existingConfigFile) {
                _config = JSON.parse(await fs.readTextFile(configPath));
            } else {
                _config = defaultConfig;
                await fs.writeTextFile(configPath, JSON.stringify(defaultConfig));
            }
            setIsInitialized(true);
        }
    }, []);

    return {
        initialized: isInitialized,
    };
}
