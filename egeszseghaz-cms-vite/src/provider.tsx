/* eslint-disable prettier/prettier */
import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditModeProvider } from "./context/edit/edit";
import { useEffect } from "react";
import { useTheme } from "@heroui/use-theme";
import { usePalette } from "@/hooks/usePalette";
import { applyPalette } from "@/hooks/useApplyPalette";
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
        {/* Ensure app starts in light theme (overrides system/localStorage) */}
        <ForceLightTheme />

        {/* Apply active palette whenever it or the UI theme changes */}
        <PaletteApplier />

        <EditModeProvider>
          <AnnouncementEditProvider>
            <NewServiceEditProvider>{children}</NewServiceEditProvider>
          </AnnouncementEditProvider>
        </EditModeProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}

function PaletteApplier() {
  const { theme } = useTheme();
  const { data: palette } = usePalette();

  useEffect(() => {
    if (!palette) return;

    const isDark = theme === "dark";
    try {
      applyPalette(palette, isDark);
    } catch (e) {
      // swallow errors to avoid breaking app; developer can inspect console
      // eslint-disable-next-line no-console
      console.error("Failed to apply palette", e);
    }
  }, [palette, theme]);

  return null;
}

function ForceLightTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    try {
      setTheme("light");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to set light theme", e);
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
