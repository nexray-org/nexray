import { ServerComponentRequest } from '@nexray/types';
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

            const homeDirPath = await path.homeDir();
            const dbPath = await path.join(homeDirPath, '.nexray', 'dev-logs', 'nedb');
            const dbDirname = await path.dirname(dbPath);
            const localDbFolderExists = await fs.exists(dbDirname);

            if (!localDbFolderExists) {
                await fs.createDir(dbDirname, { recursive: true });
            }

            if (!isActive()) {
                return;
            }


            let readLock = false;
            const readWholeLocalDb = async () => {
                if (readLock) {
                    return;
                }
                try {
                    readLock = true;
                    /**
                     * Maybe only read new? Can be done by splitting raw string by last id of 
                     * existing records of IDs
                     */
                    const rawStrDb = await fs.readTextFile(dbPath);
                    if (rawStrDb.length) {
                        const newData = treatRawData(rawStrDb);
                        setData(newData.reverse());
                    }
                } catch (error) {
                    null;
                } finally {
                    readLock = false;
                }
            }

            const stopWatching = await watch(dbPath, { delayMs: 1000, recursive: false }, event => {
                if (event.type === "Create" || event.type === "Write") {
                    readWholeLocalDb();
                }
            });
            return stopWatching;
        }
    }, (result) => { result && result(); }, [])
}

/**
 * From a database's raw data, return the corresponding machine understandable collection.
 * Modified version of nedb initialization parsing method, browser-side
 * https://github.com/seald/nedb/blob/1d5c3faec9e836cd93900368467c9eb6960a3646/lib/persistence.js#L180
 */

const deserialize = (rawData: string) => JSON.parse(rawData, function (k, v) {
    if (k === '$$date') return new Date(v)
    if (
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'boolean' ||
        v === null
    ) return v
    if (v && v.$$date) return v.$$date

    return v
})

function treatRawData(rawData: string): ServerComponentRequest[] {
    const data = rawData.split('\n');
    const indexes: Record<any, any> = {};
    const dataById: Record<string, any> = {}
    let dataLength = data.length;

    // Last line of every data file is usually blank so not really corrupt
    let corruptItems = 0

    for (const datum of data) {
        if (datum === '') { dataLength--; continue }
        try {
            const doc = deserialize(datum);
            if (doc._id) {
                if (doc.$$deleted === true) delete dataById[doc._id]
                else dataById[doc._id] = doc
            } else if (doc.$$indexCreated && doc.$$indexCreated.fieldName != null) indexes[doc.$$indexCreated.fieldName] = doc.$$indexCreated
            else if (typeof doc.$$indexRemoved === 'string') delete indexes[doc.$$indexRemoved]
        } catch (e) {
            corruptItems += 1
        }
    }

    // A bit lenient on corruption
    // if (dataLength > 0) {
    //     const corruptionRate = corruptItems / dataLength
    //     if (corruptionRate > this.corruptAlertThreshold) {
    //         const error = new Error(`${Math.floor(100 * corruptionRate)}% of the data file is corrupt, more than given corruptAlertThreshold (${Math.floor(100 * this.corruptAlertThreshold)}%). Cautiously refusing to start NeDB to prevent dataloss.`)
    //         error.corruptionRate = corruptionRate
    //         error.corruptItems = corruptItems
    //         error.dataLength = dataLength
    //         throw error
    //     }
    // }

    const tdata = Object.values(dataById)
    return tdata;
}