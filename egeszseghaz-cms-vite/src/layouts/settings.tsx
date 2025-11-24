/* eslint-disable prettier/prettier */
import { AppSidebar } from "@/components/pages/settings/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main
          className="
            flex-1 p-6 transition-[margin] duration-300 ease-in-out
            data-[sidebar=open]:ml-64
            data-[sidebar=closed]:ml-[72px]
          "
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
