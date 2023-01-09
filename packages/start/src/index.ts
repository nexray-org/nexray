#! /usr/bin/env node

import startServer from '@nexray/server';
import open from 'open';

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

// Based on devtools: https://github.com/facebook/react/blob/main/packages/react-devtools/bin.js

async function main() {
    if (process.env['IS_DEV']) {
        console.log('Running nexray in dev mode');
    } else {
        await import('./app/server');
    }

    startServer('local');
    open(`http://localhost:${parseInt(process.env.PORT || "", 10) || 3000}`);
}

main();
