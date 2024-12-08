import Confirm from '@/externals/components/Confirm';
import { PanelContextProvider } from '@/externals/contexts/PanelContext';
import PanelLayout from '@/externals/layouts/PanelLayout'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react'
import {
    HiChartPie,
    HiClipboardList,
    HiCollection,
    HiDocumentText,
    HiInboxIn,
    HiLockClosed,
    HiShoppingBag,
} from "react-icons/hi";
import { HiPower } from "react-icons/hi2";

export default function EOfficePanelLayout({ children }: {
    children?: ReactNode;
    sidebarActive?: string;
}) {
    const router = useRouter();
    const [ShowConfirmLogout, setShowConfirmLogout] = useState(false);

    return (
        <PanelContextProvider>
            <PanelLayout
                rightItemNavbar={<>
                    <Button
                        color='light'
                        theme={{
                            base: 'border-none h-10 w-10 [&:hover>*]:text-red-500 [&>*]:p-0 flex',
                            inner: { base: 'm-auto' }
                        }}
                        onClick={() => setShowConfirmLogout(true)}
                    >
                        <HiPower className='h-5 w-5 m-auto' />
                    </Button>
                </>}
                sidebarItems={[
                    {
                        items: [
                            { icon: HiChartPie, children: 'Overview', href: '/' },
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
            </PanelLayout>
        </PanelContextProvider>
    )
}
