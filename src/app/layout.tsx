'use client'

import { Inter } from "next/font/google";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import "@/utilities/styles/globals.css";
import { flowbiteTheme } from "@/utilities/configs/flowbiteTheme";
import { GlobalContextWrapper } from "@/utilities/components/layouts/global/_partials/GlobalContext";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useSearchParams();

  return (
    <html lang="en" className={inter.className}>
      <head suppressHydrationWarning>
        <ThemeModeScript />
      </head>
      <body>
        <Flowbite theme={{ theme: (params.get('defaultTheme') == undefined) ? flowbiteTheme : {} }}>
          <GlobalContextWrapper>
            {children}
          </GlobalContextWrapper>
        </Flowbite>
      </body>
    </html>
  );
}
