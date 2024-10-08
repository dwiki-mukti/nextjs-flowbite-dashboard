'use client'

import PanelWrapper from '@/utilities/components/layouts/panel/PanelWrapper'
import React, { ReactNode } from 'react'
import {
    HiBookOpen,
    HiViewBoards,
} from "react-icons/hi";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
    return (
        <PanelWrapper
            sidebarItems={[{
                items: [
                    { icon: HiBookOpen, children: 'Buku', href: '/panel' },
                    { icon: HiViewBoards, children: 'Sample Flowbite', href: "/panel/sample" },
                    { icon: HiViewBoards, children: 'Sample Table', href: "/panel/table-example" },
                ]
            }]}
        >
            {children}
        </PanelWrapper>
    )
}
