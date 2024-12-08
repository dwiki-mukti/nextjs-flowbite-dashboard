'use client'

import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { createContext, Dispatch, SetStateAction } from 'react';
import { isSmallScreen } from '../utils/frontend';

interface SidebarContextProps {
    isSidebarCollapse: boolean;
    setIsSidebarCollapse: Dispatch<SetStateAction<boolean>>;
}
const PanelContext = createContext<SidebarContextProps>({} as SidebarContextProps);


export function PanelContextProvider({ children }: PropsWithChildren) {
    const [isSidebarCollapse, setIsSidebarCollapse] = useState(false);

    useEffect(() => {
        if (isSmallScreen()) {
            setIsSidebarCollapse(true)
        } else {
            setIsSidebarCollapse(localStorage.getItem("isSidebarCollapse") == "true");
        };
        function handleMobileTapInsideMain(event: MouseEvent) {
            const main = document.querySelector("#main-content");
            const isClickInsideMain = main?.contains(event.target as Node);
            if ((isSmallScreen()) && isClickInsideMain) {
                setIsSidebarCollapse(true);
            }
        }
        document.addEventListener("mousedown", handleMobileTapInsideMain);
        return () => {
            document.removeEventListener("mousedown", handleMobileTapInsideMain);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("isSidebarCollapse", String(Boolean(isSidebarCollapse)));
    }, [isSidebarCollapse]);

    return (
        <PanelContext.Provider value={{ isSidebarCollapse, setIsSidebarCollapse }}>
            {children}
        </PanelContext.Provider>
    );
}


export function usePanelContext() {
    return useContext(PanelContext);
}