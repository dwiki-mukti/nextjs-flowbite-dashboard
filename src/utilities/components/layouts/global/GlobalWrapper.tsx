import React from 'react'

export default function GlobalWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>GlobalWrapper</div>
    )
}
