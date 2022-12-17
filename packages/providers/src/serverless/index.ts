export function A() {null;}

// import { Provider } from '../types';
// import { fdir, GroupOutput } from 'fdir';
// import { readFile } from 'fs';

// // AWS Credentials file locations:
// // Linux, Unix, MacOS - ~/.aws/credentials
// // Windows: C:\Users\USER_NAME\.aws\credentials

// // https://github.com/nicolasdao/sls-config-parser/blob/master/src/index.js

// async function exists() {
//     const api = new fdir()
//         .withFullPaths()
//         .exclude((dirName, dirPath) => dirName.startsWith(".") || dirName.startsWith("node_modules"))
//         .filter((path, isDirectory) => !isDirectory)
//         .filter((path, isDirectory) => path.endsWith("serverless.ts") || path.endsWith("serverless.json") || path.endsWith("serverless.js") || path.endsWith("serverless.yaml") || path.endsWith("serverless.yml"))
//         .crawl('./')

//     const files = await api.withPromise() as GroupOutput;
//     return files.length > 0;
// }

// async function getCredentials() {
//     console.log("Booting up serverless instance...");
//     try {
//         readFile
//     } catch (error) {
//         console.log("error", error)
//     }

// }

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

// export const provider: Provider = {
//     exists,
//     getCredentials
// }