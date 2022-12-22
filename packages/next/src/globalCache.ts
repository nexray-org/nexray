const _fetch = fetch;

// Must manually reference
const _trueLog = console.log;
const _trueError = console.error;
const _trueInfo = console.info;
const _trueWarn = console.warn;
const _trueDebug = console.debug;
const _trueDir = console.dir;

const _consoles = {
    log: _trueLog,
    error: _trueError,
    info: _trueInfo,
    warn: _trueWarn,
    debug: _trueDebug,
    dir: _trueDir,
} as const;

export {
    _fetch,
    _consoles
}