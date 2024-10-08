'use client'

import React, { PropsWithChildren, useContext, useState } from 'react';

import { createContext, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    StatusCode: number;
    setStatusCode: Dispatch<SetStateAction<number>>;
}
const GlobalContext = createContext<SidebarContextProps>({} as SidebarContextProps);


export function GlobalContextWrapper({
    children,
}: PropsWithChildren) {
    const [StatusCode, setStatusCode] = useState(200);

    return (
        <GlobalContext.Provider value={{ StatusCode, setStatusCode }}>
            {children}
        </GlobalContext.Provider>
    );
}


export function useGlobalContext() {
    return useContext(GlobalContext);
}