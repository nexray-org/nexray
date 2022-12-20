import { useContext } from 'react';
import useAsyncEffect from 'use-async-effect';
import { UiContext } from '../context/UiContext';

export default function useWatchLocalDb() {
    const { data } = useContext(UiContext);
    useAsyncEffect(async isActive => {
        const [
            fs, 
            path,
            { watch }
        ] = await Promise.all([
            import('@tauri-apps/api/fs'), 
            import('@tauri-apps/api/path'),
            import('tauri-plugin-fs-watch-api'),
        ]);

        const homeDirPath = await path.homeDir();
        const dbPath = await path.join(homeDirPath, '.basis');
        const localDbFolderExists = await fs.exists(await path.dirname(dbPath));
        if (!localDbFolderExists) {
            await fs.createDir(dbPath, { recursive: true });
        }
        if (!isActive()) {
            return;
        }
        
        // TODO: Get files on mount
        const stopWatching = await watch(dbPath, {}, event => {
            // const { type, payload } = event;
            console.log(event);
        });
        return stopWatching;
    }, (result) => { result && result(); }, [])
}