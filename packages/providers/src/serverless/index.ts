import { Provider } from '../types';
import { fdir, GroupOutput } from 'fdir';

async function exists() {
    const api = new fdir()
        .withFullPaths()
        .exclude((dirName, dirPath) => dirName.startsWith(".") || dirName.startsWith("node_modules"))
        .filter((path, isDirectory) => !isDirectory)
        .filter((path, isDirectory) => path.endsWith("serverless.ts") || path.endsWith("serverless.json") || path.endsWith("serverless.js"))
        .crawl('./')

    const files = await api.withPromise() as GroupOutput;
    console.log(JSON.stringify(files));
    return true;
}

export const provider: Provider = {
    exists
}