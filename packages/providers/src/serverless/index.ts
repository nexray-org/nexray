import { Provider } from '../types';
import { fdir, GroupOutput } from 'fdir';
import { readFile } from 'fs';
import Serverless from 'serverless';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import runServerless from '@serverless/test/run-serverless'

// AWS Credentials file locations:
// Linux, Unix, MacOS - ~/.aws/credentials
// Windows: C:\Users\USER_NAME\.aws\credentials

let _serverless: Serverless;
const getServerless = async () => {
    if (_serverless) {
        return _serverless;
    } 
    // serverless will mistakenly take mocha's --config option as its own during init
    process.argv = process.argv.slice(0, 2);
    const serverless = new Serverless({ commands: ["logs"], configuration: {}, options: {} });
    await serverless.init();
    await serverless.variables.populateService();
    serverless.service.mergeResourceArrays();
    _serverless = serverless;
    return serverless;
}

// https://github.com/nicolasdao/sls-config-parser/blob/master/src/index.js

async function exists() {
    const api = new fdir()
        .withFullPaths()
        .exclude((dirName, dirPath) => dirName.startsWith('.') || dirName.startsWith('node_modules'))
        .filter((path, isDirectory) => !isDirectory)
        .filter(
            (path, isDirectory) =>
                path.endsWith('serverless.ts') ||
                path.endsWith('serverless.json') ||
                path.endsWith('serverless.js') ||
                path.endsWith('serverless.yaml') ||
                path.endsWith('serverless.yml'),
        )
        .crawl('./');

    const files = (await api.withPromise()) as GroupOutput;
    return files.length > 0;
}

async function getCredentials() {
    // https://forum.serverless.com/t/npm-install-as-a-dependency/3744
    // https://github.com/serverless/serverless/issues/8628
    // https://stackoverflow.com/questions/58890867/how-to-parse-serverless-yml-file-in-script
    
    const serverless = await getServerless()
    console.log('Booting up serverless instance...');
    try {
        const provider = serverless.getProvider("aws");
        console.log("provider.getCredentials()", provider.getCredentials());
    } catch (error) {
        console.log("error", error)
    }
    console.log("SSDFSDF")
    return provider.getCredentials()
}

// async function init() {
//     // const credentials = new SharedIniFileCredentials();
//     return provider.getCredentials()

//     async function getLogStreams(logGroupName: string): Promise<string[]> {
//         const params = {
//             logGroupName: logGroupName,
//             descending: true,
//             limit: 50,
//             orderBy: 'LastEventTime',
//         };

//         const reply = await provider.request('CloudWatchLogs', 'describeLogStreams', params);
//         if (!reply || reply.logStreams.length === 0) {
//             throw new Error('No existing streams for the function');
//         }
//         return (reply as any).logStreams.map((logStream: any) => logStream.logStreamName);
//     }
// }

export const provider: Provider = {
    exists,
    getCredentials,
};
