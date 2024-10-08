'use client'

import { Sidebar } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { usePanelContext } from "./PanelContext";
import { IconType } from "react-icons";
import { ReactNode } from "react";

export interface typePanelSidebarProps {
  items: {
    icon?: IconType,
    href?: string,
    children?: ReactNode
  }[]
}
export default function PanelSidebar({ sidebarItems }: {
  sidebarItems?: typePanelSidebarProps[];
}) {
  const { isSidebarCollapse } = usePanelContext();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={isSidebarCollapse}
      id="sidebar"
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isSidebarCollapse && "hidden w-16",
      )}
    >

      <Sidebar.Items>

        {sidebarItems?.map((sidebarItem, indexSidebarItem) => (
          <Sidebar.ItemGroup key={indexSidebarItem}>
            {sidebarItem.items.map(({ children: itemChildren, ...itemProps }, indexItem) => (
              <Sidebar.Item key={indexItem} {...itemProps}>
                {itemChildren}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        ))}

      </Sidebar.Items>

    </Sidebar>
  );
};
