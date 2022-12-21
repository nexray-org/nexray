#! /usr/bin/env node

import { execa } from "@esm2cjs/execa";
import path from 'path';
import startServer from '@basis/server';

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];
const cwd = (process && process.cwd()) || __dirname;

if (+major < 14) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Basis requires Node 14 or higher. Please update\n' +
      'or switch installations to continue.'
  );
  process.exit(1);
}

// Boot up dev server

async function main() {
    if (process.env['IS_DEV']) {
        console.log("Running basis in dev mode");
        console.log("CWD:", cwd);
        startServer("local")
        execa("pnpm tauri dev", { cwd: path.join(cwd, "packages", "app"), shell: true })
    } else {
        console.log("IS PROD");
        // TODO: load to cross-platform app dir, exec from there
    }
}

main();