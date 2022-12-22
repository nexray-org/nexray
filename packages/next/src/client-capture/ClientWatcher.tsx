"use client"

import React, { useContext } from "react"
import { NexrayNestedContext, NexrayNestedProvider } from './NestedContext';

interface IClientWatcher {
    children: React.ReactNode;
}

export default function ClientWatcher({ children }: IClientWatcher) {
    const { id: parentId } = useContext(NexrayNestedContext);
    return (
        <NexrayNestedProvider>
            {children}
        </NexrayNestedProvider>
    )
}