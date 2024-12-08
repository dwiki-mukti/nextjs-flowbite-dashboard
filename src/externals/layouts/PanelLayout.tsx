'use client'

import React, { ReactNode } from 'react';
import { twMerge } from "tailwind-merge";
import PanelNavbar from './_partials/PanelNavbar';
import PanelSidebar, { typePanelSidebarProps } from './_partials/PanelSidebar';
import { usePanelContext } from '../contexts/PanelContext';



export default function PanelLayout({
    children,
    sidebarItems,
    leftItemNavbar,
    rightItemNavbar
}: {
    children?: ReactNode,
    sidebarItems?: typePanelSidebarProps[],
    leftItemNavbar?: ReactNode,
    rightItemNavbar?: ReactNode,
}) {
    const { isSidebarCollapse } = usePanelContext()

    return (
        <div>
            <PanelNavbar leftItemNavbar={leftItemNavbar} rightItemNavbar={rightItemNavbar} />
            <div className="mt-16 flex items-start">
                <PanelSidebar sidebarItems={sidebarItems} />
                <div
                    id="main-content"
                    className={twMerge(
                        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
                        isSidebarCollapse ? "lg:ml-[4.5rem]" : "lg:ml-64",
                    )}
                >
                    <div className="px-4 pt-6 min-h-screen">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
