import { faker } from '@faker-js/faker';
import React, { createContext, useState } from 'react';
import { SchemaData } from '../types';
import { getReasonPhrase } from 'http-status-codes';

interface IUiContext {
    selectedCategoryId: string;
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
    data: SchemaData['request'];
}

export const UiContext = createContext<IUiContext>({} as IUiContext);

export function UiProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [data, setData] = useState<SchemaData['request']>(() => [...new Array(1000)].map(_ => ({
        durationMs: faker.datatype.number({ min: 19, max: 1000000 }),
        payloadSizeBytes: faker.datatype.number({ min: 19, max: 1000000 }),
        requestIp: faker.internet.ipv4(),
        status: {
            code: faker.internet.httpStatusCode(),
            // reason: getReasonPhrase(faker.internet.httpStatusCode())
            reason: "OK"
        },
        timestamp: faker.date.recent(100).toISOString(),
        type: faker.internet.httpMethod(),
        url: faker.internet.url(),
        id: faker.datatype.uuid(),
        contents: faker.lorem.words(30)
    })))

    return (
        <UiContext.Provider 
            value={{
                selectedCategoryId, 
                setSelectedCategoryId,
                data
            }}
        >
            {children}
        </UiContext.Provider>
    )
}