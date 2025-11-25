/* eslint-disable prettier/prettier */

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { items } from "./navItems";
import { useLocation } from "react-router-dom";

export function AppSidebar() {
  const { open, setOpen } = useSidebar();

  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="
        group relative h-screen
        transition-all duration-500 ease-in-out
        data-[state=open]:w-64
        data-[state=collapsed]:w-[72px]
      "
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      // add keyboard accessibility if you want open on focus
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Arrow Toggle Button
      <SidebarTrigger
        className="
          absolute -right-4 top-2 z-50 flex h-8 w-8 
          items-center justify-center rounded-full bg-primary
        text-white shadow
          hover:bg-primary-dark transition
          border border-primary-dark
          data-[state=open]:rotate-180
          cursor-pointer
        "
      /> */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={`
              transition-opacity duration-200
              ${open ? "opacity-100" : "opacity-0"}
            `}
          >
            Application
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="w-full">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${open ? "w-full" : "w-auto"}`}
                >
                  <SidebarMenuButton
                    asChild
                    className={`${open ? "w-full pr-16" : "w-auto"} hover:bg-primary/80 rounded-sm`}
                    isActive={location.pathname + location.hash === item.url}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span
                        className={`
                          transition-all duration-200
                          ${open ? "opacity-100 ml-1" : "opacity-0 ml-0 w-0 overflow-hidden"}
                        `}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
