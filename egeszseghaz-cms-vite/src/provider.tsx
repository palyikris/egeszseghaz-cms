/* eslint-disable prettier/prettier */
import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditModeProvider } from "./context/edit/edit";
import { AnnouncementEditProvider } from "./context/edit/announcement";
import { NewServiceEditProvider } from "./context/edit/newService";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <QueryClientProvider client={queryClient}>
        <EditModeProvider>
          <AnnouncementEditProvider>
            <NewServiceEditProvider>{children}</NewServiceEditProvider>
          </AnnouncementEditProvider>
        </EditModeProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
