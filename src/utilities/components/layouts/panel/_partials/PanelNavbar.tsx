'use client'
import { isSmallScreen } from "@/utilities/utils/frontend";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import Image from "next/image";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { usePanelContext } from "./PanelContext";
import { ReactNode } from "react";

export default function PanelNavbar({
  leftItemNavbar,
  rightItemNavbar
}: {
  leftItemNavbar?: ReactNode,
  rightItemNavbar?: ReactNode,
}) {
  const { isSidebarCollapse, setIsSidebarCollapse } = usePanelContext();

  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
      >
        <div className="w-full p-3 pr-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                aria-controls="sidebar"
                aria-expanded
                className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setIsSidebarCollapse(!isSidebarCollapse)}
              >
                {!isSidebarCollapse && isSmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
              <Navbar.Brand href="/">
                <Image
                  alt="Flowbite logo"
                  height="24"
                  src="/favicon.ico"
                  width="24"
                />
                <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                  Flowbite
                </span>
              </Navbar.Brand>
            </div>
            <div>
              {rightItemNavbar}
              <DarkThemeToggle />
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};
