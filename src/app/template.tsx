'use client'

import { useGlobalContext } from '@/utilities/components/layouts/global/_partials/GlobalContext';
import Error from 'next/error';
import React from 'react'

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { StatusCode } = useGlobalContext();
    return (
        <>
            {![200, 202, 422].includes(StatusCode) ? (<Error statusCode={StatusCode} />) : (children)}
        </>
    )
}
