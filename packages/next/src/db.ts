import { homedir } from 'os';
import path from 'path';
import fs from 'fs';
import { ServerComponentRequest } from '@basis/types';
import type { Low } from 'lowdb';
import type { JSONFile as JSONFileType } from 'lowdb/lib/node';
import appRoot from 'app-root-path';

const CACHE_LENGTH = 30;
const dbPath = path.join(appRoot.toString(), '.basis');
let db: Low<ServerComponentRequest[]>;

const _safeRotate = async () => {
    if (!db || !db.data || db.data.length > CACHE_LENGTH) {
        const [
            { Low },
            { JSONFile: _JSONFile }
        ] = await Promise.all([
            import('lowdb'),
            import('lowdb/node' as string)
        ]);

        const JSONFileClass = (new _JSONFile(path.join(dbPath, `${new Date().getTime()}-basis.json`))) as JSONFileType<ServerComponentRequest[]>;

        db = new Low(JSONFileClass);
        await db.read();
        db.data ||= [];
    }
}

export async function init() {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
    }

    return await _safeRotate();
}

export async function insertRequest(data: ServerComponentRequest) {
    await _safeRotate();
    db.data?.push(data);
    await db.write();
}