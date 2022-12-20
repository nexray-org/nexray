import path from 'path';
import fs from 'fs';
import { ServerComponentRequest } from '@basis/types';
import { homedir } from 'os';

const dbPath = path.join(homedir(), '.basis', 'dev-logs');

export function insertRequest(data: ServerComponentRequest) {
    fs.writeFile(
        path.join(dbPath, `${Date.now()}-basis.json`),
        JSON.stringify(data),
        'utf8',
        () => {}
    )
}