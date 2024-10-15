'use client'

import Confirm from '@/utilities/components/globals/Confirm';
import PanelWrapper from '@/utilities/components/layouts/panel/PanelWrapper'
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react'
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
import { HiPower } from "react-icons/hi2";

export default function DashboardLayout({ children }: { children?: ReactNode }) {
    const router = useRouter();
    const [ShowConfirmLogout, setShowConfirmLogout] = useState(false);

    return (
        <PanelWrapper
            rightItemNavbar={<>
                <Button
                    color='light'
                    theme={{ base: 'border-none h-10 w-10 [&:hover>*]:text-red-500 [&>*]:p-0 flex', inner: { base: 'm-auto' } }}
                    onClick={() => setShowConfirmLogout(true)}
                >
                    <HiPower className='h-5 w-5 m-auto' />
                </Button>
            </>}
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
            <Confirm
                show={ShowConfirmLogout}
                toHide={() => setShowConfirmLogout(false)}
                question="Anda ingin logout dari akun ini?"
                onApproved={() => {
                    router.push('/login')
                }}
            />
        </PanelWrapper>
    )
}
