import { ServerComponentRequest } from '@basis/types';
import { useContext } from 'react';
import type { RawEvent, DebouncedEvent } from 'tauri-plugin-fs-watch-api';
import useAsyncEffect from 'use-async-effect';
import { UiContext } from '../context/UiContext';

export default function useWatchLocalDb() {
    const { data, setData } = useContext(UiContext);

    useAsyncEffect(async isActive => {
        if (window['__TAURI__' as any]) {
            const [
                fs,
                path,
                { watch }
            ] = await Promise.all([
                import('@tauri-apps/api/fs'),
                import('@tauri-apps/api/path'),
                import('tauri-plugin-fs-watch-api'),
            ]);

            // const homeDirPath = (process && process.env.NODE_ENV === 'development') ? 
            //     await path.resolve('..', '..', 'next', 'test', 'test-next13-app')
            //     :
            //     "";
            const homeDirPath = await path.homeDir();
            const dbPath = await path.join(homeDirPath, '.basis', 'dev-logs');
            const localDbFolderExists = await fs.exists(dbPath);
            if (!localDbFolderExists) {
                await fs.createDir(dbPath, { recursive: true });
            }
            if (!isActive()) {
                return;
            }


            const existingFiles = await fs.readDir(dbPath);
            console.log("Finding local files")
            const sortedExistingFiles = existingFiles
                .filter(ele => ele.name?.endsWith(".json") && !ele.children)
                .map(ele => ele.path)
                .sort();

            const _data: ServerComponentRequest[] = [];
            for (const currentPath of sortedExistingFiles) {
                console.log("currentPath", currentPath)
                _data.push(JSON.parse(await fs.readTextFile(currentPath)))
            }
            setData(_data);

            const watchHandler = async (event: DebouncedEvent) => {
                if (event.type === "Create") {
                    const newData = JSON.parse(await fs.readTextFile(event.payload));
                    setData(prev => [newData, ...prev]);
                }
            }

            const stopWatching = await watch(dbPath, { delayMs: 1000, recursive: false }, watchHandler);
            return stopWatching;
        }
    }, (result) => { result && result(); }, [])
}