'use client'

import PanelWrapper from '@/utilities/components/layouts/panel/PanelWrapper'
import React, { ReactNode } from 'react'
import {
    HiBookOpen,
    HiChartPie,
    HiClipboardList,
    HiCollection,
    HiDocumentText,
    HiInboxIn,
    HiLockClosed,
    HiShoppingBag,
} from "react-icons/hi";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
    return (
        <PanelWrapper
            sidebarItems={[
                {
                    items: [
                        { icon: HiChartPie, children: 'Overview', href: '/panel' },
                        {
                            icon: HiDocumentText, label: 'Pages',
                            items: [
                                { href: '#', children: 'Settings' },
                                { href: '#', children: 'Kanban' },
                                { href: '#', children: 'Calendar' },
                            ]
                        },
                        {
                            icon: HiShoppingBag, label: 'Sales',
                            items: [
                                { href: '#', children: 'Product' },
                                { href: '#', children: 'Billing' },
                                { href: '#', children: 'Invoice' },
                            ]
                        },
                        { icon: HiInboxIn, children: 'Messages' },
                        {
                            icon: HiLockClosed, label: 'Authentication',
                            items: [
                                { href: '#', children: 'Sign In' },
                                { href: '#', children: 'Sign Up' },
                                { href: '#', children: 'Forgot Password' },
                            ]
                        },
                        // { icon: HiViewBoards, children: 'Sample Flowbite', href: "/panel/sample" },
                    ]
                },
                {
                    items: [
                        { icon: HiClipboardList, children: 'Docs', href: '#' },
                        { icon: HiCollection, children: 'Component', href: '#' },
                    ]
                }
            ]}
        >
            {children}
        </PanelWrapper>
    )
}
