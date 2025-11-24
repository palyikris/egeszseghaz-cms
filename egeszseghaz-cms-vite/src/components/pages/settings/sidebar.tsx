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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  ChevronsLeft,
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
} from "lucide-react";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="
        group relative h-screen
        transition-all duration-300 ease-in-out
        data-[state=open]:w-64
        data-[state=collapsed]:w-[72px]
      "
    >
      {/* Arrow Toggle Button */}
      <SidebarTrigger
        className="
          absolute -right-3 top-6 z-50 flex h-6 w-6 
          items-center justify-center rounded-full
          bg-primary text-white shadow
          hover:bg-primary-dark transition
          border border-primary-dark
          data-[state=open]:rotate-180
        "
      >
        <ChevronsLeft size={16} />
      </SidebarTrigger>

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
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
