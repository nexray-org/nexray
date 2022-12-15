import { useTabs } from '@geist-ui/core';
import React, { createContext, useEffect, useState } from 'react';
import type { editor, IRange } from 'monaco-editor';

interface IMainContentContext {
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    tabsBindings: {
        value: string;
        onChange: (val: string) => void;
    };
    discoveredObjs: DiscoveredObject[] | false;
    setDiscoveredObjs: React.Dispatch<React.SetStateAction<DiscoveredObject[] | false>>;
    outputMonacoEditor: editor.IStandaloneCodeEditor | undefined;
    setOutputMonacoEditor: React.Dispatch<React.SetStateAction<editor.IStandaloneCodeEditor | undefined>>;
    jumpTo: (start: number, end: number) => void;
}

export type DiscoveredObject = [number, number, Record<any, any> | any[]];

export const MainContentContext = createContext<IMainContentContext>({} as IMainContentContext);

export function MainContentProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const { bindings: tabsBindings, setState: setActiveTab } = useTabs('output');
    const [discoveredObjs, setDiscoveredObjs] = useState<DiscoveredObject[] | false>(false);
    const [outputMonacoEditor, setOutputMonacoEditor] = useState<editor.IStandaloneCodeEditor>();
    const [scrollOutputToTuple, setScrollOutputToTuple] = useState<[number, number]>();

    function jumpTo(start: number, end: number) {
        if (outputMonacoEditor) {
            setActiveTab('output');
            setScrollOutputToTuple([start, end]);
            // output Monaco editor is now null. Need to wait until next hook
            // https://stackoverflow.com/a/55147134
        }
    }

    useEffect(() => {
        let existingDecorationIds: string[];
        if (outputMonacoEditor && scrollOutputToTuple) {
            const { lineNumber: firstLineNumber, column: firstColumn } = outputMonacoEditor.getModel()!.getPositionAt(scrollOutputToTuple[0]);
            const { lineNumber: secondLineNumber, column: secondColumn } = outputMonacoEditor.getModel()!.getPositionAt(scrollOutputToTuple[1]);

            outputMonacoEditor.revealPositionInCenter({ column: firstColumn, lineNumber: firstLineNumber });

            existingDecorationIds = outputMonacoEditor.deltaDecorations(
                [],
                [
                    {
                        range: { startColumn: firstColumn, endColumn: secondColumn, startLineNumber: firstLineNumber, endLineNumber: secondLineNumber },
                        options: {
                            inlineClassName: 'monaco-highlight-block-inline',
                            className: 'monaco-highlight-block-root',
                        },
                    },
                ],
            );
        }
        return () => {
            existingDecorationIds && outputMonacoEditor?.removeDecorations(existingDecorationIds);
            setScrollOutputToTuple(undefined);
        };
    }, [outputMonacoEditor]);

    return (
        <MainContentContext.Provider
            value={{
                setActiveTab,
                tabsBindings,
                discoveredObjs,
                setDiscoveredObjs,
                outputMonacoEditor,
                setOutputMonacoEditor,
                jumpTo,
            }}
        >
            {children}
        </MainContentContext.Provider>
    );
}
