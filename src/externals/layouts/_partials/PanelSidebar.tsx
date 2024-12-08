'use client'

import { Sidebar } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { usePanelContext } from "../../contexts/PanelContext";
import { IconType } from "react-icons";
import { ReactNode } from "react";
// import { HiArchive, HiHome } from "react-icons/hi";
import { useRouter } from "next/navigation";


interface typeItemSidebar {
  icon?: IconType,
  href?: string,
  children?: ReactNode,
  label?: string
  // items: this[]
}
export interface typePanelSidebarProps {
  items: (typeItemSidebar & { items?: typeItemSidebar[] })[]
}
export default function PanelSidebar({ sidebarItems }: {
  sidebarItems?: typePanelSidebarProps[];
}) {
  const router = useRouter()
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
      theme={{ items: { base: 'cursor-pointer' } }}
    >

      <Sidebar.Items>
        {sidebarItems?.map((sidebarItem, indexSidebarItem) => (
          <Sidebar.ItemGroup key={indexSidebarItem}>

            {/* <Sidebar.Item
              icon={HiHome}
              // href={'/panel'}
              onClick={() => {
                router.push('/panel')
              }}
            >{'home'}</Sidebar.Item>
            <Sidebar.Item
              icon={HiArchive}
              // href={'/panel/sample'}
              onClick={() => {
                router.push('/panel/sample')
              }}
            >{'sample'}</Sidebar.Item> */}

            {sidebarItem.items.map((itemProp, indexItem) => {
              if (itemProp.items?.length) {
                return (
                  <Sidebar.Collapse
                    key={indexItem}
                    icon={itemProp.icon}
                    label={itemProp.label}
                  >
                    {itemProp.items.map((subItemProp, indexSubItemProp) => (
                      <Sidebar.Item
                        key={indexSubItemProp}
                        icon={subItemProp.icon}
                        // href={subItemProp.href}
                        onClick={() => {
                          // event.prefentDefault()
                          if (subItemProp.href) router.push(subItemProp.href)
                        }}
                      >{subItemProp.children}</Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                )
              } else {
                return (
                  <Sidebar.Item
                    key={indexItem}
                    icon={itemProp.icon}
                    // href={itemProp.href}
                    onClick={() => {
                      // event.prefentDefault()
                      if (itemProp.href) router.push(itemProp.href)
                    }}
                  >{itemProp.children}</Sidebar.Item>
                )
              }
            })}
          </Sidebar.ItemGroup>
        ))}

        {/* {sidebarItems?.map((sidebarItem, indexSidebarItem) => (
              <Sidebar.ItemGroup key={indexSidebarItem}>
                {sidebarItem.items.map(({ children: itemChildren, ...itemProps }, indexItem) => (
                  <Sidebar.Item key={indexItem} {...itemProps}>
                    {itemChildren}
                  </Sidebar.Item>
                ))}
              </Sidebar.ItemGroup>
            ))} */}

      </Sidebar.Items>

    </Sidebar>
  );
};
