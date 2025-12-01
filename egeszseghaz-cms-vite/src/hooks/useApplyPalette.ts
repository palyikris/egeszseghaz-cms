/* eslint-disable prettier/prettier */

import { hexToTriplet } from "@/palettes/palette";

export function applyPalette(palette, isDark: boolean) {
  const root = document.documentElement;
  const p = isDark ? palette.dark : palette.light;

  const set = (key: string, hex: string) => root.style.setProperty(key, hexToTriplet(hex));

  set("--primary", p.primary);
  set("--primary-light", p.primaryLight);
  set("--primary-dark", p.primaryDark);

  set("--secondary", p.secondary);
  set("--secondary-light", p.secondaryLight);
  set("--secondary-dark", p.secondaryDark);

  set("--accent", p.accent);

  set("--background", p.background);
  set("--foreground", p.foreground);

  set("--text-primary", p.textPrimary);
  set("--text-secondary", p.textSecondary);
}
