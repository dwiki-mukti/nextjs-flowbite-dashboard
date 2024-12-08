'use client'

import { useContext } from 'react';

import { createContext, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    UserAuthed: any;
    setUserAuthed: Dispatch<SetStateAction<any>>;
    StatusCode: number;
    setStatusCode: Dispatch<SetStateAction<number>>;
}
export const GlobalContext = createContext<SidebarContextProps>({} as SidebarContextProps);

export function useGlobalContext() {
    return useContext(GlobalContext);
}