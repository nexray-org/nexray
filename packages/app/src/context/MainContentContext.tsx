import { useTabs } from '@geist-ui/core';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import type { editor } from 'monaco-editor';
import type { ServerComponentRequest } from '@nexray/types';

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
    insightFilter: string;
    setInsightFilter: React.Dispatch<React.SetStateAction<string>>;
    selectedDiscoveredIndex: number;
    setSelectedDiscoveredIndex: React.Dispatch<React.SetStateAction<number>>;
    enabledTimelineTypes: Record<ServerComponentRequest['timeline'][number]['type'], boolean>;
    setEnabledTimelineTypes: React.Dispatch<React.SetStateAction<Record<ServerComponentRequest['timeline'][number]['type'], boolean>>>;
    selectedContentString: ServerComponentRequest['timeline'][number]['type'] | 'combined' | undefined;
    selectedRequestsTab: 'table' | 'insights';
    setSelectedRequestsTab: React.Dispatch<React.SetStateAction<'table' | 'insights'>>;
    selectedRequestForInsightId: string;
    setSelectedRequestForInsightId: React.Dispatch<React.SetStateAction<string>>;
    requestInsightFilter: string;
    setRequestInsightFilter: React.Dispatch<React.SetStateAction<string>>;
}

export type DiscoveredObject = [number, number, Record<any, any> | any[]];

export const MainContentContext = createContext<IMainContentContext>({} as IMainContentContext);

export function MainContentProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const { bindings: tabsBindings, setState: setActiveTab } = useTabs('output');
    const [discoveredObjs, setDiscoveredObjs] = useState<DiscoveredObject[] | false>(false);
    const [selectedDiscoveredIndex, setSelectedDiscoveredIndex] = useState<number>(0);
    const [outputMonacoEditor, setOutputMonacoEditor] = useState<editor.IStandaloneCodeEditor>();
    const [scrollOutputToTuple, setScrollOutputToTuple] = useState<[number, number]>();
    const [insightFilter, setInsightFilter] = useState<string>('');
    const [selectedRequestsTab, setSelectedRequestsTab] = useState<'table' | 'insights'>('table');
    const [selectedRequestForInsightId, setSelectedRequestForInsightId] = useState<string>('');
    const [requestInsightFilter, setRequestInsightFilter] = useState<string>('');
    const [enabledTimelineTypes, setEnabledTimelineTypes] = useState<Record<ServerComponentRequest['timeline'][number]['type'], boolean>>({
        event: true,
        log: true,
    });

    const selectedContentString = useMemo<ServerComponentRequest['timeline'][number]['type'] | 'combined' | undefined>(() => {
        if (Object.values(enabledTimelineTypes).every((ele) => !!ele)) {
            return 'combined';
        } else if (Object.values(enabledTimelineTypes).every((ele) => !ele)) {
            return undefined;
        } else {
            return Object.entries(enabledTimelineTypes).find(([k, v]) => !!v)![0] as ServerComponentRequest['timeline'][number]['type'];
        }
    }, [enabledTimelineTypes]);

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
                insightFilter,
                setInsightFilter,
                selectedDiscoveredIndex,
                setSelectedDiscoveredIndex,
                enabledTimelineTypes,
                setEnabledTimelineTypes,
                selectedContentString,
                selectedRequestsTab,
                setSelectedRequestsTab,
                selectedRequestForInsightId,
                setSelectedRequestForInsightId,
                requestInsightFilter,
                setRequestInsightFilter,
            }}
        >
            {children}
        </MainContentContext.Provider>
    );
}
