#! /usr/bin/env node

import { execa } from '@esm2cjs/execa';
import path from 'path';
import startServer from '@nexray/server';

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];
const cwd = (process && process.cwd()) || __dirname;

if (+major < 14) {
    console.error(
        'You are running Node ' + currentNodeVersion + '.\n' + 'Nexray requires Node 14 or higher. Please update\n' + 'or switch installations to continue.',
    );
    process.exit(1);
}

// Boot up dev server
// Based on devtools: https://github.com/facebook/react/blob/main/packages/react-devtools/bin.js

async function main() {
    if (process.env['IS_DEV']) {
        console.log('Running nexray in dev mode');
        await import('./app/server')
        // require('./app/server')
        console.log('CWD:', cwd);
        startServer('local');
        execa('pnpm run dev', { cwd: path.join(cwd, '../', 'app'), shell: true });
    } else {
        console.log('IS PROD');
        // TODO: load to cross-platform app dir, exec from there
    }
}

main();
