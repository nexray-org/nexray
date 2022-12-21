/* eslint-disable no-useless-escape */
import type { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

export default function logLanguage(monaco: Monaco) {
    function extendDefaults(...args: Record<string, any>[]): editor.ITokenThemeRule {
        for (let i = 1; i < args.length; i++) {
            if (!args[i]) {
                continue;
            }
            for (const key in args[i]) {
                // eslint-disable-next-line no-prototype-builtins
                if (args[i].hasOwnProperty(key)) {
                    args[0][key] = args[i][key];
                }
            }
        }
        return args[0] as editor.ITokenThemeRule;
    }

    const typeCustomTokenizer: { name: string; regex: string; style: Partial<editor.ITokenThemeRule> }[] = [
        // {name: 'orange-alert', regex: '', style: {foreground: '#FFA500', fontStyle: 'bold'}},
        // {name: 'red-alert', regex: '', style: {foreground: '#FF0000', fontStyle: 'bold'}}
    ];

    monaco.languages.register({ id: 'basislog' });

    const logCustomRules: [RegExp, string][] = [];
    const themeRules: editor.ITokenThemeRule[] = [];
    for (let i = 0; i < typeCustomTokenizer.length; i++) {
        try {
            logCustomRules.push([new RegExp(typeCustomTokenizer[i].regex), typeCustomTokenizer[i].name]);
            themeRules.push(extendDefaults({ token: typeCustomTokenizer[i].name + '.basislog' }, typeCustomTokenizer[i].style));
        } catch (e) {
            console.error('error', e);
        }
    }

    monaco.languages.setMonarchTokensProvider('basislog', {
        defaultToken: '',
        tokenPostfix: '.basislog',
        tokenizer: {
            root: [
                // Custom rules
                ...logCustomRules,
                // Trace/Verbose
                [/\b(Trace)\b:/, 'verbose'],
                // Serilog VERBOSE
                [/\[(verbose|verb|vrb|vb|v)\]/i, 'verbose'],
                // Android logcat Verboce
                [/\bV\//, 'verbose'],
                // DEBUG
                [/\b(DEBUG|Debug)\b|\b([dD][eE][bB][uU][gG])\:/, 'debug'],
                // Serilog DEBUG
                [/\[(debug|dbug|dbg|de|d)\]/i, 'debug'],
                // Android logcat Debug
                [/\bD\//, 'debug'],
                // INFO
                [/\b(HINT|INFO|INFORMATION|Info|NOTICE|II)\b|\b([iI][nN][fF][oO]|[iI][nN][fF][oO][rR][mM][aA][tT][iI][oO][nN])\:/, 'info'],
                // serilog INFO
                [/\[(information|info|inf|in|i)\]/i, 'info'],
                // Android logcat Info
                [/\bI\//, 'info'],
                // WARN
                [/\b(WARNING|WARN|Warn|WW)\b|\b([wW][aA][rR][nN][iI][nN][gG])\:/, 'warning'],
                // Serilog WARN
                [/\[(warning|warn|wrn|wn|w)\]/i, 'warning'],
                // Android logcat Warning
                [/\bW\//, 'warning'],
                // ERROR
                [/\b(ALERT|CRITICAL|EMERGENCY|ERROR|FAILURE|FAIL|Fatal|FATAL|Error|EE)\b|\b([eE][rR][rR][oO][rR])\:/, 'error'],
                // Serilog ERROR
                [/\[(error|eror|err|er|e|fatal|fatl|ftl|fa|f)\]/i, 'error'],
                // Android logcat Error
                [/\bE\//, 'error'],
                // ISO dates ("2020-01-01")
                [/\b\d{4}-\d{2}-\d{2}(T|\b)/, 'date'],
                // Culture specific dates ("01/01/2020", "01.01.2020")
                [/\b\d{2}[^\w\s]\d{2}[^\w\s]\d{4}\b/, 'date'],
                // Clock times with optional timezone ("01:01:01", "01:01:01.001", "01:01:01+01:01")
                [/\d{1,2}:\d{2}(:\d{2}([.,]\d{1,})?)?(Z| ?[+-]\d{1,2}:\d{2})?\b/, 'date'],
                // Git commit hashes of length 40, 10, or 7
                [/\b([0-9a-fA-F]{40}|[0-9a-fA-F]{10}|[0-9a-fA-F]{7})\b/, 'constant'],
                // Guids
                [/[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}/, 'constant'],
                // Constants
                [/\b([0-9]+|true|false|null)\b/, 'constant'],
                // String constants
                [/"[^"]*"/, 'string'],
                // [/(?<![\w])'[^']*'/, "string"], // THIS CAUSES A THROWN ERROR
                // Exception type names
                [/\b([a-zA-Z.]*Exception)\b/, 'exceptiontype'],
                // Colorize rows of exception call stacks
                [/^[\t ]*at.*$/, 'exception'],
                // Match Urls
                [/\b(http|https|ftp|file):\/\/\S+\b\/?/, 'constant'],
                // Match character and . sequences (such as namespaces) as well as file names and extensions (e.g. bar.txt)
                // [/(?<![\w/\\])([\w-]+\.)+([\w-])+(?![\w/\\])/, "constant"], // THIS CAUSES A THROWN ERROR
            ],
        },
    });

    // https://github.com/brijeshb42/monaco-themes/blob/master/themes/GitHub%20Dark.json
    monaco.editor.defineTheme('basistheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'info.basislog', foreground: '4b71ca' },
            { token: 'error.basislog', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'warning.basislog', foreground: 'FFA500' },
            { token: 'date.basislog', foreground: '008800' },
            { token: 'exceptiontype.basislog', foreground: '808080' },
            ...themeRules,
        ],
        colors: {
            'editor.foreground': '#FAFAFA',
            'editor.background': '#000000',
            'editor.selectionBackground': '#F81CE5',
            'editor.lineHighlightBackground': '#2463B41F',
            'editorCursor.foreground': '#333',
            'editorWhitespace.foreground': '#4B4B7E80',

            'scrollbarSlider.shadow': '#00000000',
            'scrollbarSlider.hoverBackground': '#9999997A',
            'scrollbarSlider.background': '#8888887A',
            'scrollbarSlider.activeBackground': '#999999',
        },
    });
}
