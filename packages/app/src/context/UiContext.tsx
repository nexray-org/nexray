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
    itemContentStrings: Record<ServerComponentRequest['timeline'][number]['type'] | 'combined', string> | undefined;
    dataSearchVal: string;
    setDataSearchVal: React.Dispatch<React.SetStateAction<string>>;
    filteredData: ServerComponentRequest[]
}

export const UiContext = createContext<IUiContext>({} as IUiContext);

export function UiProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const [isMainContentSettingsDialogOpen, setIsMainContentSettingsDialogOpen] = useState<boolean>(false);
    const [isInsightFilterDialogOpen, setIsInsightFilterDialogOpen] = useState<boolean>(false);
    const [isFilterGroupDialogOpen, setIsFilterGroupDialogOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [data, setData] = useState<ServerComponentRequest[]>([]);
    const [dataSearchVal, setDataSearchVal] = useState<string>("");
    const filteredData = useMemo(() => {
        if (!dataSearchVal) {
            return data;
        } else {
            return data.filter(ele => ele.url.toLowerCase().includes(dataSearchVal.toLowerCase()))
        }
    }, [dataSearchVal, data])

    const activeItem = useMemo(() => data.find((ele) => ele.id === selectedCategoryId), [data, selectedCategoryId]);
    const itemContentStrings = useMemo(() => {
        if (!activeItem) {
            return;
        }

        const _itemContentStrings: Record<ServerComponentRequest['timeline'][number]['type'] | 'combined', string> = {
            log: '',
            event: '',
            combined: '',
        };

        for (const item of activeItem.timeline) {
            _itemContentStrings[item.type] += item.content + '\n';
            _itemContentStrings.combined += item.content + '\n';
        }

        return _itemContentStrings;
    }, [activeItem]);

    const config = useConfig();

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
                itemContentStrings,
                dataSearchVal, 
                setDataSearchVal,
                filteredData
            }}
        >
            {children}
        </UiContext.Provider>
    );
}
