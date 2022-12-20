import { useContext } from 'react';
import type { RawEvent, DebouncedEvent } from 'tauri-plugin-fs-watch-api';
import useAsyncEffect from 'use-async-effect';
import { UiContext } from '../context/UiContext';

export default function useWatchLocalDb() {
    const { data } = useContext(UiContext);

    useAsyncEffect(async isActive => {
        if (window['__TAURI__' as any]) {
            const [
                fs,
                path,
                { watch, watchImmediate }
            ] = await Promise.all([
                import('@tauri-apps/api/fs'),
                import('@tauri-apps/api/path'),
                import('tauri-plugin-fs-watch-api'),
            ]);

            const homeDirPath = (process && process.env.NODE_ENV === 'development') ? 
                await path.resolve('..', '..', 'next', 'test', 'test-next13-app')
                :
                "";
            // const homeDirPath = await path.homeDir();
            const dbPath = await path.join(homeDirPath, '.basis');
            const localDbFolderExists = await fs.exists(await path.dirname(dbPath));
            if (!localDbFolderExists) {
                await fs.createDir(dbPath, { recursive: true });
            }
            if (!isActive()) {
                return;
            }

            console.log("dbPath", dbPath)

            let initialUnlistener: undefined | (() => Promise<void>);
            const watchHandler = (event: DebouncedEvent) => {
                console.log(event)
                if (initialUnlistener) {
                    initialUnlistener();
                    initialUnlistener = undefined;
                }
            }

            // Just runs on mount
            initialUnlistener = await watch(dbPath, { delayMs: 0, recursive: false }, watchHandler);

            const stopWatching = await watch(dbPath,  { delayMs: 1000, recursive: false }, watchHandler);
            return stopWatching;
        }
    }, (result) => { result && result(); }, [])
}