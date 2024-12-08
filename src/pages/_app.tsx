
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";
import { GlobalContext } from "@/externals/contexts/GlobalContext";

import { Flowbite, ThemeModeScript } from "flowbite-react";
import { flowbiteTheme } from "@/externals/configs/flowbiteTheme";

import { Inter } from "next/font/google";
import Head from "next/head";
const font = Inter({ subsets: ["latin"] });

import "@/externals/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout; };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [UserAuthed, setUserAuthed] = useState({});
  const [StatusCode, setStatusCode] = useState(200);

  return getLayout(
    <main className={font.className}>
      <Flowbite theme={{ theme: flowbiteTheme }}>
        <Head>
          <ThemeModeScript />
        </Head>
        <GlobalContext.Provider value={{ UserAuthed, setUserAuthed, StatusCode, setStatusCode }}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </Flowbite>
    </main>
  );
}
