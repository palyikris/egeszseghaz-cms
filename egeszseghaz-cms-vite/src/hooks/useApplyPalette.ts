/* eslint-disable prettier/prettier */

import { ThemePalette, hexToTriplet } from "@/palettes/palette";

export function applyPalette(palette: ThemePalette, isDark: boolean) {
  const root = document.documentElement;
  const p = isDark ? palette.dark : palette.light;

  // Helpers: write hex for direct usages, and RGB triplets for Tailwind's
  // alpha-aware runtime (`rgb(var(--color-*) / <alpha>)`).
  const setHex = (key: string, hex: string) => root.style.setProperty(key, hex);
  const setTriplet = (key: string, hex: string) =>
    root.style.setProperty(key, hexToTriplet(hex));

  // Primary (hex for direct css, triplet for `--color-*` used in rgb(...)).
  setHex("--primary", p.primary);
  setHex("--primary-light", p.primaryLight);
  setHex("--primary-dark", p.primaryDark);

  setTriplet("--color-primary", p.primary);
  setTriplet("--color-primary-light", p.primaryLight);
  setTriplet("--color-primary-dark", p.primaryDark);

  // Secondary
  setHex("--secondary", p.secondary);
  setHex("--secondary-light", p.secondaryLight);
  setHex("--secondary-dark", p.secondaryDark);

  setTriplet("--color-secondary", p.secondary);
  setTriplet("--color-secondary-light", p.secondaryLight);
  setTriplet("--color-secondary-dark", p.secondaryDark);

  // Accent
  setHex("--accent", p.accent);
  setTriplet("--color-accent", p.accent);

  // Background / foreground
  setHex("--background", p.background);
  setHex("--foreground", p.foreground);

  // Chart mappings (keep hex so gradients defined in CSS still work)
  setHex("--chart-4", p.primaryLight);
  setHex("--chart-5", p.secondaryLight);

  setHex("--text-primary", p.textPrimary);
  setHex("--text-secondary", p.textSecondary);

  // Ring color: provide both the CSS variable used in our theme (`--ring`)
  // and Tailwind's runtime ring color variable (`--tw-ring-color`) so
  // utilities like `ring-primary` and `outline-ring` reflect the palette
  // immediately without a reload.
  const ringAlpha = isDark ? 0.16 : 0.12;
  root.style.setProperty(
    "--ring",
    `rgba(${hexToTriplet(p.primary)}, ${ringAlpha})`
  );
  root.style.setProperty("--tw-ring-color", `rgb(${hexToTriplet(p.primary)})`);
}
