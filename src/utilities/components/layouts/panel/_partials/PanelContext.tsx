'use client'

import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { isSmallScreen } from '@/utilities/utils/frontend';

import { createContext, Dispatch, SetStateAction } from 'react';

interface SidebarContextProps {
    isSidebarCollapse: boolean;
    setIsSidebarCollapse: Dispatch<SetStateAction<boolean>>;
}
const PanelContext = createContext<SidebarContextProps>({} as SidebarContextProps);


export function PanelContextWrapper({
    children,
    isSidebarCollapse,
    setIsSidebarCollapse
}: PropsWithChildren & {
    isSidebarCollapse: boolean;
    setIsSidebarCollapse: React.Dispatch<React.SetStateAction<boolean>>
}) {
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