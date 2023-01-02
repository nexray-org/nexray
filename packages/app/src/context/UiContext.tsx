import React, { createContext, useMemo, useState } from 'react';
import useConfig from '../hooks/useConfig';
import { ServerComponentRequest } from '@nexray/types';

interface IUiContext {
    selectedCategoryId: string;
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
    data: ServerComponentRequest[];
    setData: React.Dispatch<React.SetStateAction<ServerComponentRequest[]>>;
    config: ReturnType<typeof useConfig>;
    activeItem: ServerComponentRequest | undefined;
    isMainContentSettingsDialogOpen: boolean;
    setIsMainContentSettingsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isInsightFilterDialogOpen: boolean;
    setIsInsightFilterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isFilterGroupDialogOpen: boolean;
    setIsFilterGroupDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    itemContentStrings: Record<ServerComponentRequest['timeline'][number]['type'] | "combined", string> | undefined;
}

export const UiContext = createContext<IUiContext>({} as IUiContext);

export function UiProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const [isMainContentSettingsDialogOpen, setIsMainContentSettingsDialogOpen] = useState<boolean>(false);
    const [isInsightFilterDialogOpen, setIsInsightFilterDialogOpen] = useState<boolean>(false);
    const [isFilterGroupDialogOpen, setIsFilterGroupDialogOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

    // [...new Array(1000)].map((_) => ({
    //     durationMs: faker.datatype.number({ min: 19, max: 1000000 }),
    //     payloadSizeBytes: faker.datatype.number({ min: 19, max: 1000000 }),
    //     requestIp: faker.internet.ipv4(),
    //     status: {
    //         code: faker.internet.httpStatusCode(),
    //         // reason: getReasonPhrase(faker.internet.httpStatusCode())
    //         reason: 'OK',
    //     },
    //     timestamp: faker.date.recent(100).toISOString(),
    //     type: faker.internet.httpMethod(),
    //     url: faker.internet.url(),
    //     id: faker.datatype.uuid(),
    //     contents: faker.helpers.arrayElement([
    //         logfile,
    //         'a{"hello": "world"}sdf[123, { "mif": null }]asdf[123, { "mif": null }]',
    //         '12345{"hello": "world"}',
    //     ]),
    // })),

    const [data, setData] = useState<ServerComponentRequest[]>([]);

    const config = useConfig();
    const activeItem = useMemo(() => data.find((ele) => ele.id === selectedCategoryId), [data, selectedCategoryId]);
    const itemContentStrings = useMemo(() => {
        if (!activeItem) {
            return;
        }

        const _itemContentStrings: Record<ServerComponentRequest['timeline'][number]['type'] | "combined", string> = {
            log: "",
            event: "",
            combined: ""
        }

        for (const item of activeItem.timeline) {
            _itemContentStrings[item.type] += item.content + "\n";
            _itemContentStrings.combined += item.content + "\n";
        }

        return _itemContentStrings;
    }, [activeItem])

    return (
        <UiContext.Provider
            value={{
                selectedCategoryId,
                setSelectedCategoryId,
                data,
                setData,
                config,
                activeItem,
                isMainContentSettingsDialogOpen, 
                setIsMainContentSettingsDialogOpen,
                isInsightFilterDialogOpen,
                setIsInsightFilterDialogOpen,
                isFilterGroupDialogOpen,
                setIsFilterGroupDialogOpen,
                itemContentStrings
            }}
        >
            {children}
        </UiContext.Provider>
    );
}
