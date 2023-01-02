'use client';

import React, { createContext, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

interface INexrayNestedContext {
    id: string;
}

export const NexrayNestedContext = createContext<INexrayNestedContext>({} as INexrayNestedContext);

export function NexrayNestedProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const idRef = useRef(nanoid());

    useEffect(() => {
        // I'm running on the client
    }, []);

    return (
        <NexrayNestedContext.Provider
            value={{
                id: idRef.current,
            }}
        >
            {children}
        </NexrayNestedContext.Provider>
    );
}
