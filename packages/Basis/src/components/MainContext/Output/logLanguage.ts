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
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'info.basislog', foreground: '4b71ca' },
            { token: 'error.basislog', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'warning.basislog', foreground: 'FFA500' },
            { token: 'date.basislog', foreground: '008800' },
            { token: 'exceptiontype.basislog', foreground: '808080' },
            // {
            //     "background": "24292e",
            //     "token": ""
            // },
            // {
            //     "foreground": "959da5",
            //     "token": "comment"
            // },
            // {
            //     "foreground": "959da5",
            //     "token": "punctuation.definition.comment"
            // },
            // {
            //     "foreground": "959da5",
            //     "token": "string.comment"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "constant"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "entity.name.constant"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "variable.other.constant"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "variable.language"
            // },
            // {
            //     "foreground": "b392f0",
            //     "token": "entity"
            // },
            // {
            //     "foreground": "b392f0",
            //     "token": "entity.name"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "variable.parameter.function"
            // },
            // {
            //     "foreground": "7bcc72",
            //     "token": "entity.name.tag"
            // },
            // {
            //     "foreground": "ea4a5a",
            //     "token": "keyword"
            // },
            // {
            //     "foreground": "ea4a5a",
            //     "token": "storage"
            // },
            // {
            //     "foreground": "ea4a5a",
            //     "token": "storage.type"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "storage.modifier.package"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "storage.modifier.import"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "storage.type.java"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "punctuation.definition.string"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string punctuation.section.embedded source"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "support"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "meta.property-name"
            // },
            // {
            //     "foreground": "fb8532",
            //     "token": "variable"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "variable.other"
            // },
            // {
            //     "foreground": "d73a49",
            //     "fontStyle": "bold italic underline",
            //     "token": "invalid.broken"
            // },
            // {
            //     "foreground": "d73a49",
            //     "fontStyle": "bold italic underline",
            //     "token": "invalid.deprecated"
            // },
            // {
            //     "foreground": "fafbfc",
            //     "background": "d73a49",
            //     "fontStyle": "italic underline",
            //     "token": "invalid.illegal"
            // },
            // {
            //     "foreground": "fafbfc",
            //     "background": "d73a49",
            //     "fontStyle": "italic underline",
            //     "token": "carriage-return"
            // },
            // {
            //     "foreground": "d73a49",
            //     "fontStyle": "bold italic underline",
            //     "token": "invalid.unimplemented"
            // },
            // {
            //     "foreground": "d73a49",
            //     "token": "message.error"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "token": "string source"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "string variable"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "source.regexp"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string.regexp"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string.regexp.character-class"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string.regexp constant.character.escape"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string.regexp source.ruby.embedded"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "token": "string.regexp string.regexp.arbitrary-repitition"
            // },
            // {
            //     "foreground": "7bcc72",
            //     "fontStyle": "bold",
            //     "token": "string.regexp constant.character.escape"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "support.constant"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "support.variable"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "meta.module-reference"
            // },
            // {
            //     "foreground": "fb8532",
            //     "token": "markup.list"
            // },
            // {
            //     "foreground": "0366d6",
            //     "fontStyle": "bold",
            //     "token": "markup.heading"
            // },
            // {
            //     "foreground": "0366d6",
            //     "fontStyle": "bold",
            //     "token": "markup.heading entity.name"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "markup.quote"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "fontStyle": "italic",
            //     "token": "markup.italic"
            // },
            // {
            //     "foreground": "f6f8fa",
            //     "fontStyle": "bold",
            //     "token": "markup.bold"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "markup.raw"
            // },
            // {
            //     "foreground": "b31d28",
            //     "background": "ffeef0",
            //     "token": "markup.deleted"
            // },
            // {
            //     "foreground": "b31d28",
            //     "background": "ffeef0",
            //     "token": "meta.diff.header.from-file"
            // },
            // {
            //     "foreground": "b31d28",
            //     "background": "ffeef0",
            //     "token": "punctuation.definition.deleted"
            // },
            // {
            //     "foreground": "176f2c",
            //     "background": "f0fff4",
            //     "token": "markup.inserted"
            // },
            // {
            //     "foreground": "176f2c",
            //     "background": "f0fff4",
            //     "token": "meta.diff.header.to-file"
            // },
            // {
            //     "foreground": "176f2c",
            //     "background": "f0fff4",
            //     "token": "punctuation.definition.inserted"
            // },
            // {
            //     "foreground": "b08800",
            //     "background": "fffdef",
            //     "token": "markup.changed"
            // },
            // {
            //     "foreground": "b08800",
            //     "background": "fffdef",
            //     "token": "punctuation.definition.changed"
            // },
            // {
            //     "foreground": "2f363d",
            //     "background": "959da5",
            //     "token": "markup.ignored"
            // },
            // {
            //     "foreground": "2f363d",
            //     "background": "959da5",
            //     "token": "markup.untracked"
            // },
            // {
            //     "foreground": "b392f0",
            //     "fontStyle": "bold",
            //     "token": "meta.diff.range"
            // },
            // {
            //     "foreground": "c8e1ff",
            //     "token": "meta.diff.header"
            // },
            // {
            //     "foreground": "0366d6",
            //     "fontStyle": "bold",
            //     "token": "meta.separator"
            // },
            // {
            //     "foreground": "0366d6",
            //     "token": "meta.output"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.tag"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.curly"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.round"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.square"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.angle"
            // },
            // {
            //     "foreground": "ffeef0",
            //     "token": "brackethighlighter.quote"
            // },
            // {
            //     "foreground": "d73a49",
            //     "token": "brackethighlighter.unmatched"
            // },
            // {
            //     "foreground": "d73a49",
            //     "token": "sublimelinter.mark.error"
            // },
            // {
            //     "foreground": "fb8532",
            //     "token": "sublimelinter.mark.warning"
            // },
            // {
            //     "foreground": "6a737d",
            //     "token": "sublimelinter.gutter-mark"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "fontStyle": "underline",
            //     "token": "constant.other.reference.link"
            // },
            // {
            //     "foreground": "79b8ff",
            //     "fontStyle": "underline",
            //     "token": "string.other.link"
            // },
            ...themeRules,
        ],
        colors: {
            'editor.foreground': '#FAFAFA',
            'editor.background': '#000000',
            'editor.selectionBackground': '#F81CE5',
            'editor.lineHighlightBackground': '#2463B41F',
            'editorCursor.foreground': '#333',
            'editorWhitespace.foreground': '#4B4B7E80',
        },
    });
}
